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
  var CountChecker, Observer, Replacer, ReplacerSearch,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = 'emojidexReplace';
    defaults = {
      onComplete: void 0,
      useLoadingImg: true,
      ignore: 'script, noscript, canvas, img, style, iframe, input, textarea, pre, code',
      autoUpdate: true,
      updateLimit: 10
    };
    Plugin = (function() {
      function Plugin(element, options) {
        var _this = this;
        this.element = element;
        if (!window.emojidexReplacerOnce) {
          window.emojidexReplacerOnce = true;
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
          this.observer = new Observer(this);
          return this.observer.reloadEmoji();
        } else {
          this.replacer = new ReplacerSearch(this);
          return this.replacer.loadEmoji().then(function() {
            var _base;
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

  CountChecker = (function() {
    function CountChecker(limit, callback) {
      this.limit = limit;
      this.callback = callback;
      this.count = 0;
    }

    CountChecker.prototype.check = function() {
      if (++this.count === this.limit) {
        return this.callback();
      }
    };

    return CountChecker;

  })();

  Observer = (function() {
    function Observer(plugin) {
      this.plugin = plugin;
      this.dom_observer = void 0;
      this.queues = [];
      this.replacer = new ReplacerSearch(this.plugin);
      this.flagReEntry = true;
    }

    Observer.prototype.doQueue = function() {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var body, checkComplete, queue_limit, timeout;
        timeout = setTimeout(function() {
          return reject(new Error('emojidex: doQueue - Timeout'));
        }, _this.replacer.promiseWaitTime);
        body = $('body')[0];
        if (_this.queues.indexOf(body) !== -1) {
          _this.queues = [];
          return _this.replacer.loadEmoji($(body)).then(function() {
            return resolve();
          });
        } else {
          queue_limit = 300;
          checkComplete = function() {
            var queue;
            if (_this.queues.length > 0 && queue_limit-- > 0) {
              queue = _this.queues.pop();
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
      config = {
        childList: true,
        subtree: true,
        characterData: true
      };
      return this.dom_observer.observe(this.plugin.element[0], config);
    };

    Observer.prototype.disconnect = function() {
      return this.dom_observer.disconnect();
    };

    Observer.prototype.reloadEmoji = function() {
      var _this = this;
      return this.replacer.loadEmoji().then(function() {
        var _base;
        if (typeof (_base = _this.plugin.options).onComplete === "function") {
          _base.onComplete(_this.plugin.element);
        }
        _this.dom_observer = new MutationObserver(function(mutations) {
          var addedNode, mutation, _i, _j, _len, _len1, _ref;
          if (_this.flagReEntry) {
            _this.disconnect();
            _this.flagReEntry = false;
            for (_i = 0, _len = mutations.length; _i < _len; _i++) {
              mutation = mutations[_i];
              if (mutation.type === 'childList') {
                if (mutation.addedNodes) {
                  _ref = mutation.addedNodes;
                  for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                    addedNode = _ref[_j];
                    if (_this.queues.indexOf(addedNode) === -1) {
                      _this.queues.push(addedNode);
                    }
                  }
                }
              }
            }
            _this.doQueue().then(function() {
              return _this.domObserve();
            });
            return _this.flagReEntry = true;
          }
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
      this.targets = [];
      this.complete_num = 0;
    }

    Replacer.prototype.setTargets = function(node) {
      var child, _results;
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.match(/\S/)) {
          return this.targets.push(node);
        }
      }
      child = node.firstChild;
      _results = [];
      while (child) {
        switch (child.nodeType) {
          case Node.ELEMENT_NODE:
            if ($(child).is(this.plugin.options.ignore)) {
              break;
            }
            if (child.isContentEditable) {
              break;
            }
            this.setTargets(child);
            break;
          case Node.TEXT_NODE:
            if (child.textContent.match(/\S/)) {
              this.targets.push(child);
            }
            break;
        }
        _results.push(child = child.nextSibling);
      }
      return _results;
    };

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return "<img class='emojidex-emoji' src='" + this.plugin.EC.cdn_url + this.plugin.EC.size_code + "/" + emoji_code + ".png' title='" + (this.replaceUnderToSpace(emoji_code)) + "'></img>";
    };

    Replacer.prototype.getLoadingTag = function(emoji_data, type) {
      return "<span class='emojidex-loading-icon' data-emoji='" + emoji_data + "' data-type='" + type + "'></span>";
    };

    Replacer.prototype.getLoadingElement = function(element) {
      return $(element.find('.emojidex-loading-icon'));
    };

    Replacer.prototype.setLoadingTag = function(element) {
      var _this = this;
      return new Promise(function(resolve, reject) {
        var checker, target, timeout, _i, _len, _ref, _results;
        timeout = setTimeout(function() {
          return reject(new Error('emojidex: setLoadingTag - Timeout'));
        }, _this.promiseWaitTime);
        _this.targets = [];
        _this.setTargets(element[0]);
        if (_this.targets.length) {
          checker = new CountChecker(_this.targets.length, function() {
            return resolve();
          });
          _ref = _this.targets;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            target = _ref[_i];
            $(target).replaceWith("<span'>" + (_this.getAddedLoadingTagText(target)) + "</span>");
            _results.push(checker.check());
          }
          return _results;
        } else {
          return resolve();
        }
      });
    };

    Replacer.prototype.getAddedLoadingTagText = function(target_element) {
      var replaced_text,
        _this = this;
      replaced_text = target_element.data;
      replaced_text = replaced_text.replace(this.plugin.options.regexpUtf, function(matched_string) {
        return _this.getLoadingTag(matched_string, 'utf');
      });
      replaced_text = replaced_text.replace(this.regexpCode, function(matched_string) {
        return _this.getLoadingTag(matched_string.replace(/:/g, ''), 'code');
      });
      return replaced_text;
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
        emoji_tag = ":" + emoji_code + ":";
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
        var replaceToEmojiIconOrRollback;
        replaceToEmojiIconOrRollback = function(loading_element) {
          return new Promise(function(resolve, reject) {
            var emoji_image, timeout;
            timeout = setTimeout(function() {
              return reject(new Error('emojidex: replaceToEmojiIconOrRollback - Timeout'));
            }, _this.promiseWaitTime);
            emoji_image = $("<img src='" + _this.plugin.EC.cdn_url + "px8/" + loading_element.dataset.emoji + ".png'></img>");
            emoji_image.load(function(e) {
              return _this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), loading_element.dataset.emoji).then(function() {
                return resolve();
              });
            });
            return emoji_image.error(function(e) {
              return _this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), loading_element.dataset.emoji, false).then(function() {
                return resolve();
              });
            });
          });
        };
        return new Promise(function(resolve, reject) {
          var checker, emoji, loading_element, loading_elements, timeout, _i, _len, _results;
          timeout = setTimeout(function() {
            return reject(new Error('emojidex: searchEmoji_setEmojiTag - Timeout'));
          }, _this.promiseWaitTime);
          loading_elements = $('.emojidex-loading-icon');
          if (loading_elements.length) {
            checker = new CountChecker(loading_elements.length, function() {
              return resolve();
            });
            _results = [];
            for (_i = 0, _len = loading_elements.length; _i < _len; _i++) {
              loading_element = loading_elements[_i];
              switch (loading_element.dataset.type) {
                case 'code':
                  replaceToEmojiIconOrRollback(loading_element).then(function() {
                    return checker.check();
                  });
                  break;
                case 'utf':
                  _results.push((function() {
                    var _results1;
                    _results1 = [];
                    for (emoji in this.plugin.options.utfEmojiData) {
                      if (emoji === loading_element.dataset.emoji) {
                        this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), this.plugin.options.utfEmojiData[emoji]).then(function() {
                          return checker.check();
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
        var matched_codes, replaced_promise, replaced_text;
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
        matched_codes = replaced_text.match(_this.regexpCode);
        replaced_promise = new Promise(function(resolve, reject) {
          var checker, code, code_only, emoji_image, timeout, _i, _len, _results;
          if (matched_codes != null ? matched_codes.length : void 0) {
            timeout = setTimeout(function() {
              return reject(new Error('emojidex: setEomojiTag - Timeout'));
            }, _this.promiseWaitTime);
            checker = new CountChecker(matched_codes.length, function() {
              return resolve();
            });
            _results = [];
            for (_i = 0, _len = matched_codes.length; _i < _len; _i++) {
              code = matched_codes[_i];
              code_only = code.replace(/\:/g, '');
              emoji_image = $("<img src='" + _this.plugin.EC.cdn_url + "px8/" + (_this.replaceSpaceToUnder(code_only)) + ".png' data-code='" + code_only + "'></img>");
              emoji_image.load(function(e) {
                replaced_text = replaced_text.replace(":" + e.currentTarget.dataset.code + ":", _this.getEmojiTag(e.currentTarget.dataset.code));
                return checker.check();
              });
              _results.push(emoji_image.error(function(e) {
                return checker.check();
              }));
            }
            return _results;
          } else {
            return resolve();
          }
        });
        return replaced_promise.then(function() {
          return $(element).replaceWith("<span'>" + replaced_text + "</span>");
        });
      };
      element = target_element || this.plugin.element;
      if (this.plugin.options.useLoadingImg) {
        return this.setLoadingTag(element).then(function() {
          return searchEmoji_setEmojiTag(element);
        });
      } else {
        return new Promise(function(resolve, reject) {
          var checker, target, timeout, _i, _len, _ref, _results;
          timeout = setTimeout(function() {
            return reject(new Error('emojidex: loadEmoji useLoadingImg: false - Timeout'));
          }, _this.promiseWaitTime);
          _this.targets = [];
          _this.setTargets(element[0]);
          if (_this.targets.length) {
            checker = new CountChecker(_this.targets.length, function() {
              return resolve();
            });
            _ref = _this.targets;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              target = _ref[_i];
              _results.push(setEomojiTag(target).then(function(e) {
                return checker.check();
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
