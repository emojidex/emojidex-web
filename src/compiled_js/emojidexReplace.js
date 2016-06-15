/*
* emojidexReplace
*
* require: emojidex-client
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 Genshin Souzou Kabushiki Kaisha
*/


(function() {
  var Observer, Replacer, ReplacerSearch,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = 'emojidexReplace';
    defaults = {
      onComplete: void 0,
      useLoadingImg: true,
      ignore: 'script, noscript, canvas, style, iframe, input, textarea, pre, code',
      autoUpdate: false,
      updateLimit: 10
    };
    Plugin = (function() {
      function Plugin(element, options) {
        var _this = this;
        this.element = element;
        this.element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.EC = new EmojidexClient({
          onReady: function(EC) {
            if (_this.checkUpdate()) {
              return $.ajax({
                url: _this.EC.api_url + 'moji_codes',
                dataType: 'json',
                success: function(response) {
                  var regexp;
                  regexp = response.moji_array.join('|');
                  _this.options.regexpUtf = RegExp(regexp, 'g');
                  _this.options.utfEmojiData = response.moji_index;
                  return _this.EC.Data.storage.update('emojidex.utfInfoUpdated', new Date().toString()).then(function() {
                    return _this.EC.Data.storage.update('emojidex.regexpUtf', regexp);
                  }).then(function() {
                    return _this.EC.Data.storage.update('emojidex.utfEmojiData', response.moji_index);
                  }).then(function() {
                    return _this.replace();
                  });
                }
              });
            } else {
              _this.options.regexpUtf = RegExp(_this.EC.Data.storage.get('emojidex.regexpUtf'), 'g');
              _this.options.utfEmojiData = _this.EC.Data.storage.get('emojidex.utfEmojiData');
              return _this.replace();
            }
          }
        });
      }

      Plugin.prototype.checkUpdate = function() {
        var current, updated;
        if (this.EC.Data.storage.isSet('emojidex.utfInfoUpdated')) {
          current = new Date;
          updated = new Date(this.EC.Data.storage.get('emojidex.utfInfoUpdated'));
          if (current - updated >= 3600000 * 48) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      };

      Plugin.prototype.replace = function() {
        this.replacer = new ReplacerSearch(this);
        return this.replacer.loadEmoji();
      };

      return Plugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

  Observer = (function() {
    function Observer() {
      console.log('I am Observer...');
    }

    return Observer;

  })();

  Replacer = (function() {
    function Replacer() {
      var ignore;
      this.loadingNum = 0;
      ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\';
      this.regexpCode = RegExp(":([^\\s" + ignore + "][^" + ignore + "]*[^\\s" + ignore + "]):|:([^\\s" + ignore + "]):", 'g');
    }

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return "<img class='emojidex-emoji' src='" + this.plugin.EC.cdn_url + this.plugin.EC.size_code + "/" + emoji_code + ".png' title='" + (this.replaceUnderToSpace(emoji_code)) + "'></img>";
    };

    Replacer.prototype.getLoadingTag = function(emoji_data, type) {
      return "<div class='emojidex-loading-icon' data-emoji='" + emoji_data + "' data-type='" + type + "'></div>";
    };

    Replacer.prototype.getLoadingElement = function(element) {
      return $(element.find('.emojidex-loading-icon'));
    };

    Replacer.prototype.setLoadingTag = function(plugin) {
      var _this = this;
      return plugin.element.find(":not(" + plugin.options.ignore + ")").andSelf().contents().filter(function(index, element) {
        var replaced_text;
        if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
          replaced_text = _this.getTextWithLoadingTag(element.textContent);
          if (replaced_text !== element.textContent) {
            return $(element).replaceWith(replaced_text);
          }
        }
      });
    };

    Replacer.prototype.getTextWithLoadingTag = function(text) {
      var _this = this;
      text = text.replace(this.plugin.options.regexpUtf, function(matched_string) {
        return _this.getLoadingTag(matched_string, 'utf');
      });
      text = text.replace(this.regexpCode, function(matched_string) {
        return _this.getLoadingTag(matched_string, 'code');
      });
      return text;
    };

    Replacer.prototype.reloadEmoji = function() {
      var DomObserve, disconnect, doQueue, dom_observer, queueTimer, queues,
        _this = this;
      queues = [];
      dom_observer = new MutationObserver(function(mutations) {
        var mutation, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = mutations.length; _i < _len; _i++) {
          mutation = mutations[_i];
          if (queues.indexOf(mutation.target) === -1) {
            _results.push(queues.push(mutation.target));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
      doQueue = function(DO) {
        var body, queue, queue_limit, _results;
        disconnect(DO);
        body = $('body')[0];
        if (queues.indexOf(body) !== -1) {
          console.log(queues);
          console.log('reset queues');
          _this.plugin.replacer.loadEmoji();
          return queues = [];
        } else {
          queue_limit = _this.plugin.options.updateLimit;
          _results = [];
          while (queues.length > 0 && queue_limit > 0) {
            console.count('replace');
            queue = queues.pop();
            _this.plugin.replacer.loadEmoji();
            _results.push(queue_limit--);
          }
          return _results;
        }
      };
      DomObserve = function(DO) {
        var config;
        config = {
          childList: true,
          subtree: true,
          characterData: true
        };
        return DO.observe(_this.plugin.element[0], config);
      };
      disconnect = function(DO) {
        return DO.disconnect();
      };
      DomObserve(dom_observer);
      queueTimer = function() {
        return setTimeout(function() {
          if (queues.length > 0) {
            console.log('queues.length:', queues.length);
            doQueue(dom_observer);
            return queueTimer();
          }
        }, 1000);
      };
      return queueTimer();
    };

    Replacer.prototype.fadeOutLoadingTag_fadeInEmojiTag = function(element, emoji_code, match) {
      var emoji_tag,
        _this = this;
      if (match == null) {
        match = true;
      }
      emoji_tag = void 0;
      if (match) {
        emoji_tag = $(this.getEmojiTag(emoji_code)).hide();
      } else {
        emoji_tag = emoji_code;
      }
      return element.fadeOut("normal", function() {
        element.after(emoji_tag);
        element.remove();
        if (match) {
          return emoji_tag.fadeIn("fast", function() {
            if (--_this.loadingNum === 0) {
              if (_this.plugin.options.onComplete != null) {
                _this.plugin.options.onComplete(_this.plugin.element);
              }
              if (_this.plugin.options.autoUpdate) {
                return _this.reloadEmoji();
              }
            }
          });
        } else {
          return _this.loadingNum--;
        }
      });
    };

    Replacer.prototype.replaceSpaceToUnder = function(string) {
      return string.replace(/\s/g, '_');
    };

    Replacer.prototype.replaceUnderToSpace = function(string) {
      return string.replace(/_/g, ' ');
    };

    return Replacer;

  })();

  ReplacerSearch = (function(_super) {
    __extends(ReplacerSearch, _super);

    function ReplacerSearch(plugin) {
      this.plugin = plugin;
      ReplacerSearch.__super__.constructor.apply(this, arguments);
    }

    ReplacerSearch.prototype.loadEmoji = function() {
      var checkComplete, checkSearchEnd, replaceCodeToEmojTag_replaceElement, searchEmoji_setEmojiTag, setEomojiTag,
        _this = this;
      searchEmoji_setEmojiTag = function(element) {
        var emoji, loading_element, loading_elements, replaceToEmojiIcon, _i, _len, _results;
        replaceToEmojiIcon = function(type, loading_element, emoji_code) {
          var emoji_image;
          emoji_image = $("<img src='" + _this.plugin.EC.cdn_url + _this.plugin.EC.size_code + "/" + emoji_code + ".png'></img>");
          emoji_image.load(function(e) {
            return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, emoji_code);
          });
          return emoji_image.error(function(e) {
            return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, "" + loading_element[0].dataset.emoji, false);
          });
        };
        loading_elements = _this.getLoadingElement(element);
        _this.loadingNum = loading_elements.length;
        _results = [];
        for (_i = 0, _len = loading_elements.length; _i < _len; _i++) {
          loading_element = loading_elements[_i];
          switch (loading_element.dataset.type) {
            case 'code':
              replaceToEmojiIcon(loading_element.dataset.type, $(loading_element), _this.replaceSpaceToUnder(loading_element.dataset.emoji.replace(/:/g, '')));
              break;
            case 'utf':
              _results.push((function() {
                var _results1;
                _results1 = [];
                for (emoji in this.plugin.options.utfEmojiData) {
                  if (emoji === loading_element.dataset.emoji) {
                    this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), this.plugin.options.utfEmojiData[emoji]);
                    break;
                  } else {
                    _results1.push(void 0);
                  }
                }
                return _results1;
              }).call(_this));
              break;
            default:
              _results.push(void 0);
          }
        }
        return _results;
      };
      checkComplete = function() {
        if (_this.replaced_text === _this.targetNum) {
          if (_this.plugin.options.onComplete != null) {
            _this.plugin.options.onComplete(_this.plugin.element);
          }
          if (_this.plugin.options.autoUpdate) {
            _this.reloadEmoji();
          }
        }
      };
      checkSearchEnd = function(searches, element, text, code_emoji) {
        if (searches === 0) {
          return replaceCodeToEmojTag_replaceElement(element, text, code_emoji);
        }
      };
      replaceCodeToEmojTag_replaceElement = function(element, text, code_emoji) {
        var code, replaced_text, _i, _len;
        replaced_text = text;
        for (_i = 0, _len = code_emoji.length; _i < _len; _i++) {
          code = code_emoji[_i];
          replaced_text = replaced_text.replace(code.matched, function() {
            var emoji_tag;
            _this.emoji_tags++;
            emoji_tag = _this.getEmojiTag(_this.replaceSpaceToUnder(code.code));
            return emoji_tag;
          });
        }
        $(element).replaceWith(replaced_text);
        _this.replaced_text++;
        return checkComplete();
      };
      setEomojiTag = function(element) {
        var code_emoji, searches, text;
        code_emoji = [];
        text = element.textContent.replace(_this.plugin.options.regexpUtf, function(matched_string) {
          var emoji, emoji_tag;
          for (emoji in _this.plugin.options.utfEmojiData) {
            if (emoji === matched_string) {
              _this.emoji_tags++;
              emoji_tag = _this.getEmojiTag(_this.plugin.options.utfEmojiData[emoji]);
              return emoji_tag;
            }
          }
        });
        if (text.match(_this.regexpCode)) {
          searches = 0;
          text.replace(_this.regexpCode, function() {
            return searches++;
          });
          return text.replace(_this.regexpCode, function(matched_string) {
            var emoji_image, matched_code;
            matched_code = matched_string.replace(/\:/g, '');
            emoji_image = $("<img src='" + _this.plugin.EC.cdn_url + _this.plugin.EC.size_code + "/" + (_this.replaceSpaceToUnder(matched_code)) + ".png'></img>");
            emoji_image.load(function(e) {
              searches--;
              code_emoji.push({
                matched: matched_string,
                code: matched_code
              });
              return checkSearchEnd(searches, element, text, code_emoji);
            });
            return emoji_image.error(function(e) {
              searches--;
              return checkSearchEnd(searches, element, text, code_emoji);
            });
          });
        } else {
          $(element).replaceWith(text);
          _this.replaced_text++;
          return checkComplete();
        }
      };
      if (this.plugin.options.useLoadingImg) {
        this.setLoadingTag(this.plugin);
        return searchEmoji_setEmojiTag(this.plugin.element);
      } else {
        this.targetNum = 0;
        this.replaced_text = 0;
        this.emoji_tags = 0;
        this.plugin.element.find(":not(" + this.plugin.options.ignore + ")").andSelf().contents().filter(function(index, element) {
          if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
            return _this.targetNum++;
          }
        });
        return this.plugin.element.find(":not(" + this.plugin.options.ignore + ")").andSelf().contents().filter(function(index, element) {
          if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
            return setEomojiTag(element);
          }
        });
      }
    };

    return ReplacerSearch;

  })(Replacer);

}).call(this);
