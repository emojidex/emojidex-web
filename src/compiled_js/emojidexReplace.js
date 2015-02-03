/*
* emojidexReplace
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 Genshin Souzou Kabushiki Kaisha
*/


(function() {
  var Replacer, ReplacerService,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexReplace";
    defaults = {
      userNames: ['emoji', 'emojidex']
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.api_emoji_replacer = new ReplacerService(this.element, this.options);
        this.api_emoji_replacer.replace();
      }

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

  Replacer = (function() {
    function Replacer() {}

    Replacer.prototype.emoji_data = null;

    Replacer.prototype.element = null;

    Replacer.prototype.options = null;

    Replacer.prototype.emoji_regexps = null;

    Replacer.prototype.getCategorizedData = function(emoji_data) {
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

    Replacer.prototype.setEmojiCSS_getEmojiRegexps = function(emoji_data) {
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

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return '<i class="emojidex-' + emoji_code + '"></i>';
    };

    Replacer.prototype.replaceForUTF = function(options) {
      var replaced_string,
        _this = this;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.moji === matched_string) {
              return _this.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    Replacer.prototype.replaceForCode = function(options) {
      var replaced_string,
        _this = this;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        matched_string = matched_string.replace(/:/g, "");
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.code === matched_string) {
              return _this.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    Replacer.prototype.setEmojiIcon = function(loader) {
      var replaced_string, text_node, text_nodes, _i, _len, _results;
      text_nodes = $(this.element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      });
      _results = [];
      for (_i = 0, _len = text_nodes.length; _i < _len; _i++) {
        text_node = text_nodes[_i];
        replaced_string = text_node.textContent;
        if (loader.emoji_regexps.utf != null) {
          replaced_string = this.replaceForUTF({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.utf,
            emoji_data: loader.emoji_data
          });
        }
        if (loader.emoji_regexps.code != null) {
          replaced_string = this.replaceForCode({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.code,
            emoji_data: loader.emoji_data
          });
        }
        _results.push($(text_node).replaceWith(replaced_string));
      }
      return _results;
    };

    return Replacer;

  })();

  ReplacerService = (function(_super) {
    __extends(ReplacerService, _super);

    function ReplacerService(element, options) {
      this.element = element;
      this.options = options;
      ReplacerService.__super__.constructor.apply(this, arguments);
    }

    ReplacerService.prototype.replace = function(callback) {
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
        if (callback) {
          return callback(_this);
        }
      };
      this.getEmojiDataFromAPI(onLoadEmojiData);
      return this;
    };

    ReplacerService.prototype.getEmojiDataFromAPI = function(callback) {
      var emoji_data, loaded_num, user_name, user_names, _i, _len, _results;
      loaded_num = 0;
      user_names = this.options.userNames;
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

    return ReplacerService;

  })(Replacer);

}).call(this);
