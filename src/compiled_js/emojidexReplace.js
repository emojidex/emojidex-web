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
      ignore: 'script, noscript, canvas, img, style, iframe, input, textarea, pre, code, .emojidex-ignore-element',
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
        var _this = this;
        if (this.options.autoUpdate) {
          console.log('autoUpdate START ---');
          this.options.useLoadingImg = false;
          this.observer = new Observer(this);
          return this.observer.reloadEmoji();
        } else {
          console.log('replace START ---');
          this.replacer = new ReplacerSearch(this);
          return this.replacer.loadEmoji().then(function() {
            var _base;
            console.log('replace END ---');
            return typeof (_base = _this.options).onComplete === "function" ? _base.onComplete(_this.element) : void 0;
          });
        }
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
    function Observer(plugin) {
      this.plugin = plugin;
      this.dom_observer = void 0;
      this.queues = [];
      this.replacer = new ReplacerSearch(this.plugin);
    }

    Observer.prototype.doQueue = function() {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var body, checkComplete, queue_limit, timeout;
        console.log('@promiseWaitTime', _this.replacer.promiseWaitTime);
        timeout = setTimeout(function() {
          return reject(new Error('emojidex: doQueue - Timeout'));
        }, _this.replacer.promiseWaitTime);
        body = $('body')[0];
        if (_this.queues.indexOf(body) !== -1) {
          console.log('@queues.indexOf(body) isnt -1: true ---');
          _this.queues = [];
          return _this.replacer.loadEmoji($(body)).then(function() {
            return resolve();
          });
        } else {
          console.log('@queues.indexOf(body) isnt -1: false ---');
          queue_limit = 3;
          checkComplete = function() {
            var queue;
            if (_this.queues.length > 0 && queue_limit-- > 0) {
              queue = _this.queues.pop();
              console.log('checkComplete---', queue);
              return _this.replacer.loadEmoji($(queue)).then(function() {
                return checkComplete();
              });
            } else {
              return resolve();
            }
          };
          return checkComplete();
        }
      });
    };

    Observer.prototype.domObserve = function() {
      var config;
      console.count('DomObserve:');
      config = {
        childList: true,
        subtree: true,
        characterData: true
      };
      return this.dom_observer.observe(this.plugin.element[0], config);
    };

    Observer.prototype.disconnect = function() {
      console.count('disconnect:');
      return this.dom_observer.disconnect();
    };

    Observer.prototype.startQueueTimer = function() {
      var _this = this;
      return setTimeout(function() {
        console.count('start timer:');
        _this.queues.length;
        if (_this.queues.length > 0) {
          console.log('@queues.length:', _this.queues.length, _this.queues);
          _this.disconnect();
          return _this.doQueue().then(function() {
            _this.domObserve();
            return _this.startQueueTimer();
          });
        } else {
          return _this.startQueueTimer();
        }
      }, 1000);
    };

    Observer.prototype.reloadEmoji = function() {
      var _this = this;
      return this.replacer.loadEmoji().then(function() {
        console.log('first replace END ---');
        _this.startQueueTimer();
        _this.dom_observer = new MutationObserver(function(mutations) {
          var mutation, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = mutations.length; _i < _len; _i++) {
            mutation = mutations[_i];
            if (_this.queues.indexOf(mutation.target) === -1 && _this.queues.length - 1 < 10) {
              _results.push(_this.queues.push(mutation.target));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
        return _this.domObserve();
      });
    };

    return Observer;

  })();

  Replacer = (function() {
    function Replacer() {
      var ignore;
      this.promiseWaitTime = 5000;
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

    Replacer.prototype.setLoadingTag = function() {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var checkReplaceComplete, complete_num, target, targets, timeout, _i, _len, _results;
        timeout = setTimeout(function() {
          return reject(new Error('emojidex: setLoadingTag - Timeout'));
        }, _this.promiseWaitTime);
        checkReplaceComplete = function() {
          if (targets.length === ++complete_num) {
            return resolve();
          }
        };
        complete_num = 0;
        targets = [];
        _this.plugin.element.find(":not(" + _this.plugin.options.ignore + ")").andSelf().contents().filter(function(index, element) {
          if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
            return targets.push(element);
          }
        });
        _results = [];
        for (_i = 0, _len = targets.length; _i < _len; _i++) {
          target = targets[_i];
          _results.push(_this.getAddedLoadingTagText(target).then(function(data) {
            $(data.element).replaceWith(data.text);
            return checkReplaceComplete();
          }));
        }
        return _results;
      });
    };

    Replacer.prototype.getAddedLoadingTagText = function(target_element) {
      var replaced_text,
        _this = this;
      replaced_text = target_element.textContent.replace(this.plugin.options.regexpUtf, function(matched_string) {
        return _this.getLoadingTag(matched_string, 'utf');
      });
      return new Promise(function(resolve, reject) {
        var checkReplaceEnd, code, code_only, emoji_image, matched_codes, replaced_num, timeout, _i, _len, _results;
        timeout = setTimeout(function() {
          return reject(new Error('emojidex: getAddedLoadingTagText - Timeout'));
        }, _this.promiseWaitTime);
        checkReplaceEnd = function() {
          if (matched_codes.length === ++replaced_num) {
            return resolve({
              element: target_element,
              text: replaced_text
            });
          }
        };
        replaced_num = 0;
        matched_codes = replaced_text.match(_this.regexpCode);
        if (matched_codes != null ? matched_codes.length : void 0) {
          _results = [];
          for (_i = 0, _len = matched_codes.length; _i < _len; _i++) {
            code = matched_codes[_i];
            code_only = code.replace(/\:/g, '');
            emoji_image = $("<img src='" + _this.plugin.EC.cdn_url + _this.plugin.EC.size_code + "/" + (_this.replaceSpaceToUnder(code_only)) + ".png' data-code='" + code_only + "'></img>");
            emoji_image.load(function(e) {
              replaced_text = replaced_text.replace(":" + e.currentTarget.dataset.code + ":", _this.getLoadingTag(e.currentTarget.dataset.code, 'code'));
              return checkReplaceEnd();
            });
            _results.push(emoji_image.error(function(e) {
              return checkReplaceEnd();
            }));
          }
          return _results;
        } else {
          return resolve({
            element: target_element,
            text: replaced_text
          });
        }
      });
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
      return new Promise(function(resolve, reject) {
        var timeout;
        timeout = setTimeout(function() {
          return reject(new Error('emojidex: fadeOutLoadingTag_fadeInEmojiTag - Timeout'));
        }, _this.promiseWaitTime);
        return element.fadeOut({
          duration: 'normal',
          done: function() {
            element.after(emoji_tag);
            element.remove();
            if (match) {
              return emoji_tag.fadeIn({
                duration: "fast",
                done: function() {
                  return resolve();
                }
              });
            } else {
              return resolve();
            }
          }
        });
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

    ReplacerSearch.prototype.loadEmoji = function(target_element) {
      var element, searchEmoji_setEmojiTag, setEomojiTag,
        _this = this;
      searchEmoji_setEmojiTag = function(element) {
        var replaceToEmojiIcon;
        replaceToEmojiIcon = function(type, loading_element, emoji_code) {
          return new Promise(function(resolve, reject) {
            var timeout;
            timeout = setTimeout(function() {
              return reject(new Error('emojidex: replaceToEmojiIcon - Timeout'));
            }, _this.promiseWaitTime);
            return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, emoji_code).then(function() {
              return resolve();
            });
          });
        };
        return new Promise(function(resolve, reject) {
          var checkReplaceComplete, complete_num, emoji, loading_element, loading_elements, timeout, _i, _len, _results;
          timeout = setTimeout(function() {
            return reject(new Error('emojidex: searchEmoji_setEmojiTag - Timeout'));
          }, _this.promiseWaitTime);
          checkReplaceComplete = function() {
            if (loading_elements.length === ++complete_num) {
              return resolve();
            }
          };
          complete_num = 0;
          loading_elements = _this.getLoadingElement(element);
          if (loading_elements.length) {
            _results = [];
            for (_i = 0, _len = loading_elements.length; _i < _len; _i++) {
              loading_element = loading_elements[_i];
              switch (loading_element.dataset.type) {
                case 'code':
                  replaceToEmojiIcon(loading_element.dataset.type, $(loading_element), _this.replaceSpaceToUnder(loading_element.dataset.emoji.replace(/:/g, ''))).then(function() {
                    return checkReplaceComplete();
                  });
                  break;
                case 'utf':
                  _results.push((function() {
                    var _results1;
                    _results1 = [];
                    for (emoji in this.plugin.options.utfEmojiData) {
                      if (emoji === loading_element.dataset.emoji) {
                        this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), this.plugin.options.utfEmojiData[emoji]).then(function() {
                          return checkReplaceComplete();
                        });
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
          } else {
            return resolve();
          }
        });
      };
      setEomojiTag = function(element) {
        var replaced_promise, replaced_text;
        replaced_text = element.textContent.replace(_this.plugin.options.regexpUtf, function(matched_string) {
          var emoji, emoji_tag;
          for (emoji in _this.plugin.options.utfEmojiData) {
            if (emoji === matched_string) {
              _this.emoji_tags++;
              emoji_tag = _this.getEmojiTag(_this.plugin.options.utfEmojiData[emoji]);
              return emoji_tag;
            }
          }
        });
        replaced_promise = new Promise(function(resolve, reject) {
          var checkReplaceEnd, code, code_only, emoji_image, matched_codes, replaced_num, timeout, _i, _len, _results;
          timeout = setTimeout(function() {
            return reject(new Error('emojidex: setEomojiTag - Timeout'));
          }, _this.promiseWaitTime);
          checkReplaceEnd = function() {
            if (matched_codes.length === ++replaced_num) {
              return resolve();
            }
          };
          replaced_num = 0;
          matched_codes = replaced_text.match(_this.regexpCode);
          if (matched_codes != null ? matched_codes.length : void 0) {
            _results = [];
            for (_i = 0, _len = matched_codes.length; _i < _len; _i++) {
              code = matched_codes[_i];
              code_only = code.replace(/\:/g, '');
              emoji_image = $("<img src='" + _this.plugin.EC.cdn_url + _this.plugin.EC.size_code + "/" + (_this.replaceSpaceToUnder(code_only)) + ".png' data-code='" + code_only + "'></img>");
              emoji_image.load(function(e) {
                replaced_text = replaced_text.replace(":" + e.currentTarget.dataset.code + ":", _this.getEmojiTag(e.currentTarget.dataset.code));
                return checkReplaceEnd();
              });
              _results.push(emoji_image.error(function(e) {
                return checkReplaceEnd();
              }));
            }
            return _results;
          } else {
            return resolve();
          }
        });
        return replaced_promise.then(function() {
          return $(element).replaceWith("<span class='emojidex-ignore-element'>" + replaced_text + "</span>");
        });
      };
      element = target_element || this.plugin.element;
      if (this.plugin.options.useLoadingImg) {
        return this.setLoadingTag().then(function() {
          return searchEmoji_setEmojiTag(element);
        });
      } else {
        return new Promise(function(resolve, reject) {
          var checkReplaceComplete, complete_num, target, targets, timeout, _i, _len, _results;
          timeout = setTimeout(function() {
            return reject(new Error('emojidex: loadEmoji useLoadingImg: false - Timeout'));
          }, _this.promiseWaitTime);
          checkReplaceComplete = function() {
            if (targets.length === ++complete_num) {
              return resolve();
            }
          };
          complete_num = 0;
          targets = [];
          element.find(":not(" + _this.plugin.options.ignore + ")").andSelf().contents().filter(function(index, element) {
            if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
              return targets.push(element);
            }
          });
          console.log('targets node length:', targets.length, targets);
          if (targets.length) {
            _results = [];
            for (_i = 0, _len = targets.length; _i < _len; _i++) {
              target = targets[_i];
              _results.push(setEomojiTag(target).then(function(e) {
                return checkReplaceComplete();
              }));
            }
            return _results;
          } else {
            return resolve();
          }
        });
      }
    };

    return ReplacerSearch;

  })(Replacer);

}).call(this);
