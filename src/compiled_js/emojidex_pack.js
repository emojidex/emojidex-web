(function() {
  var EmojiAutoComplete, EmojiLoader, EmojiLoaderService, EmojiPallet,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EmojiAutoComplete = (function() {
    function EmojiAutoComplete(plugin) {
      this.plugin = plugin;
    }

    EmojiAutoComplete.prototype.setAutoComplete = function() {
      var at_init, ec, getMatchString, getRegexp, searching_num, setAtwho, setSearchedEmojiData,
        _this = this;
      setAtwho = function(at_options) {
        var target, targets, _i, _len, _results;
        targets = [_this.plugin.options.emojiarea["plain_text"], _this.plugin.options.emojiarea["content_editable"]];
        _results = [];
        for (_i = 0, _len = targets.length; _i < _len; _i++) {
          target = targets[_i];
          _results.push(target.atwho(at_options).on('reposition.atwho', function(e) {
            return $(e.currentTarget).atwho(at_options);
          }).on('hidden.atwho', function(e) {
            return $(e.currentTarget).atwho(at_options);
          }));
        }
        return _results;
      };
      setSearchedEmojiData = function(at_obj, match_string) {
        var num, updateAtwho;
        updateAtwho = function(searched_data) {
          var at_options;
          at_options = {
            data: searched_data,
            callbacks: {
              matcher: function(flag, subtext, should_startWithSpace) {
                return getMatchString(subtext, getRegexp(flag, should_startWithSpace));
              }
            }
          };
          return at_obj.$inputor.atwho('destroy').atwho($.extend({}, at_obj.setting, at_options)).atwho('run');
        };
        num = ++searching_num;
        ec.search(match_string, function(response) {
          var searched_data;
          searched_data = ec.simplify();
          if (searching_num === num) {
            if (searched_data.length) {
              return updateAtwho(searched_data);
            }
          }
        });
        return match_string;
      };
      getRegexp = function(flag, should_startWithSpace) {
        var regexp, _a, _y;
        _a = decodeURI("%C3%80");
        _y = decodeURI("%C3%BF");
        flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        if (should_startWithSpace) {
          flag = '(?:^|\\s)' + flag;
        }
        return regexp = new RegExp("" + flag + "([A-Za-z" + _a + "-" + _y + "0-9_\+\-]*)$|" + flag + "([^\\x00-\\xff]*)$", 'gi');
      };
      getMatchString = function(subtext, regexp) {
        var match;
        match = regexp.exec(subtext);
        return match = match ? match[2] || match[1] : null;
      };
      searching_num = 0;
      ec = new EmojidexClient;
      at_init = {
        at: ":",
        limit: 10,
        search_key: "code",
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>",
        insert_tpl: "<img src='${img_url}' height='20' width='20' />",
        callbacks: {
          matcher: function(flag, subtext, should_startWithSpace) {
            var match;
            match = getMatchString(subtext, getRegexp(flag, should_startWithSpace));
            if (match) {
              return setSearchedEmojiData(this, match);
            }
          }
        }
      };
      return setAtwho(at_init);
    };

    return EmojiAutoComplete;

  })();

  EmojiLoader = (function() {
    function EmojiLoader() {}

    EmojiLoader.prototype.emoji_data = null;

    EmojiLoader.prototype.element = null;

    EmojiLoader.prototype.options = null;

    EmojiLoader.prototype.emoji_regexps = null;

    EmojiLoader.prototype.getCategorizedData = function(emoji_data) {
      var emoji, new_emoji_data, _i, _len;
      new_emoji_data = {};
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        if (emoji.category === null) {
          if (new_emoji_data.uncategorized == null) {
            new_emoji_data.uncategorized = [emoji];
          } else {
            new_emoji_data.uncategorized.push(emoji);
          }
        } else {
          if (new_emoji_data[emoji.category] == null) {
            new_emoji_data[emoji.category] = [emoji];
          } else {
            new_emoji_data[emoji.category].push(emoji);
          }
        }
      }
      return new_emoji_data;
    };

    EmojiLoader.prototype.setEmojiCSS_getEmojiRegexps = function(emoji_data) {
      var category, emoji, emoji_css, emoji_in_category, regexp_for_code, regexp_for_utf, _i, _len;
      regexp_for_utf = "";
      regexp_for_code = ":(";
      emoji_css = $('<style type="text/css" />');
      for (category in emoji_data) {
        emoji_in_category = emoji_data[category];
        for (_i = 0, _len = emoji_in_category.length; _i < _len; _i++) {
          emoji = emoji_in_category[_i];
          regexp_for_utf += emoji.moji + "|";
          regexp_for_code += emoji.code + "|";
          emoji_css.append("i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}");
        }
      }
      $("head").append(emoji_css);
      return {
        utf: regexp_for_utf.slice(0, -1),
        code: regexp_for_code.slice(0, -1) + "):"
      };
    };

    EmojiLoader.prototype.getEmojiTag = function(emoji_code) {
      return '<i class="emojidex-' + emoji_code + '"></i>';
    };

    EmojiLoader.prototype.replaceForUTF = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.moji === matched_string) {
              return EmojiLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojiLoader.prototype.replaceForCode = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        matched_string = matched_string.replace(/:/g, "");
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.code === matched_string) {
              return EmojiLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojiLoader.prototype.setEmojiIcon = function(loader) {
      return $(this.element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      }).each(function() {
        var replaced_string;
        replaced_string = this.textContent;
        if (loader.emoji_regexps.utf != null) {
          replaced_string = EmojiLoader.prototype.replaceForUTF({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.utf,
            emoji_data: loader.emoji_data
          });
        }
        if (loader.emoji_regexps.code != null) {
          replaced_string = EmojiLoader.prototype.replaceForCode({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.code,
            emoji_data: loader.emoji_data
          });
        }
        return $(this).replaceWith(replaced_string);
      });
    };

    return EmojiLoader;

  })();

  EmojiLoaderService = (function(_super) {
    __extends(EmojiLoaderService, _super);

    function EmojiLoaderService(element, options) {
      this.element = element;
      this.options = options;
      EmojiLoaderService.__super__.constructor.apply(this, arguments);
    }

    EmojiLoaderService.prototype.load = function(callback) {
      var onLoadEmojiData,
        _this = this;
      onLoadEmojiData = function(emoji_data) {
        var emoji, _i, _len;
        for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
          emoji = emoji_data[_i];
          emoji.code = emoji.code.replace(RegExp(" ", "g"), "_");
          emoji.img_url = "http://cdn.emojidex.com/emoji/px32/" + emoji.code + ".png";
        }
        _this.emoji_data = _this.getCategorizedData(emoji_data);
        _this.emoji_regexps = _this.setEmojiCSS_getEmojiRegexps(_this.emoji_data);
        _this.setEmojiIcon(_this);
        return callback(_this);
      };
      this.getEmojiDataFromAPI(onLoadEmojiData);
      return this;
    };

    EmojiLoaderService.prototype.getEmojiDataFromAPI = function(callback) {
      var emoji_data, loaded_num, user_name, user_names, _i, _len, _results;
      loaded_num = 0;
      user_names = ["emojidex", "emoji"];
      emoji_data = [];
      _results = [];
      for (_i = 0, _len = user_names.length; _i < _len; _i++) {
        user_name = user_names[_i];
        _results.push($.ajax({
          url: "https://www.emojidex.com/api/v1/users/" + user_name + "/emoji",
          dataType: "json",
          type: "get",
          success: function(user_emoji_json, status, xhr) {
            emoji_data = emoji_data.concat(user_emoji_json.emoji);
            if (++loaded_num === user_names.length) {
              return callback(emoji_data);
            }
          },
          error: function(data) {
            console.log("error: load json");
            return console.log(data);
          }
        }));
      }
      return _results;
    };

    return EmojiLoaderService;

  })(EmojiLoader);

  EmojiPallet = (function() {
    function EmojiPallet(emoji_data_array, element, options) {
      this.emoji_data_array = emoji_data_array;
      this.element = element;
      this.options = options;
      this.KEY_ESC = 27;
      this.KEY_TAB = 9;
    }

    EmojiPallet.prototype.setPallet = function() {};

    return EmojiPallet;

  })();

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidex";
    defaults = {
      emojiarea: {
        plain_text: ".emojidex-plain_text",
        content_editable: ".emojidex-content_editable"
      }
    };
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
    return Plugin = (function() {
      function Plugin(element, options) {
        var _this = this;
        this.element = element;
        this.emoji_data_array = [];
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.api_emoji = new EmojiLoaderService(this.element, this.options);
        this.api_emoji.load(function() {
          _this.emoji_data_array.push(_this.api_emoji.emoji_data);
          return _this.checkLoadedEmojiData();
        });
      }

      Plugin.prototype.checkLoadedEmojiData = function() {
        var ac;
        if (this.emoji_data_array) {
          ac = new EmojiAutoComplete(this);
          return ac.setAutoComplete();
        }
      };

      return Plugin;

    })();
  })(jQuery, window, document);

}).call(this);
