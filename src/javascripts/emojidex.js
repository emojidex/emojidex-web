/*
emojidex coffee plugin for jQuery/Zepto and compatible

=LICENSE=
When used with the emojidex service enabled this library is
  licensed under:
  * LGPL[https://www.gnu.org/licenses/lgpl.html].
When modified to not use the emojidex service this library is
  dual licensed under:
  * GPL v3[https://www.gnu.org/licenses/gpl.html]
  * AGPL v3[https://www.gnu.org/licenses/agpl.html]

The
Copyright 2013 Genshin Souzou Kabushiki Kaisha
*/


(function() {
  var EmojisLoader, EmojisLoaderAPI, EmojisLoaderPOE,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  EmojisLoader = (function() {
    function EmojisLoader() {}

    EmojisLoader.prototype.emojis_data = null;

    EmojisLoader.prototype.element = null;

    EmojisLoader.prototype.options = null;

    return EmojisLoader;

  })();

  EmojisLoaderPOE = (function(_super) {
    __extends(EmojisLoaderPOE, _super);

    function EmojisLoaderPOE(element, options) {
      this.element = element;
      this.options = options;
      EmojisLoaderPOE.__super__.constructor.apply(this, arguments);
    }

    EmojisLoaderPOE.prototype.load = function() {
      var onLoadEmojisData,
        _this = this;
      onLoadEmojisData = function(emojis_data) {
        _this.emojis_data = _this.getCategorizedData(emojis_data);
        _this.emoji_regexps = _this.setEmojiCSS_getEmojiRegexps(_this.emojis_data);
        return _this.setEmojiIcon(_this.emojis_data);
      };
      return $.getJSON(this.options.path_json, onLoadEmojisData);
    };

    EmojisLoaderPOE.prototype.getCategorizedData = function(emojis_data) {
      var emoji, new_emojis_data, _i, _len;
      new_emojis_data = {};
      for (_i = 0, _len = emojis_data.length; _i < _len; _i++) {
        emoji = emojis_data[_i];
        if (new_emojis_data[emoji.category] == null) {
          new_emojis_data[emoji.category] = [emoji];
        } else {
          new_emojis_data[emoji.category].push(emoji);
        }
      }
      return new_emojis_data;
    };

    EmojisLoaderPOE.prototype.setEmojiCSS_getEmojiRegexps = function(emojis_data) {
      var category, emoji, emojis_css, emojis_in_category, regexp_for_code, regexp_for_utf, _i, _len;
      regexp_for_utf = "";
      regexp_for_code = ":(";
      emojis_css = $('<style type="text/css" />');
      for (category in emojis_data) {
        emojis_in_category = emojis_data[category];
        for (_i = 0, _len = emojis_in_category.length; _i < _len; _i++) {
          emoji = emojis_in_category[_i];
          regexp_for_utf += emoji.moji + "|";
          regexp_for_code += emoji.code + "|";
          emojis_css.append("i.emojidex-" + emoji.moji + " {background-image: url('" + $.emojiarea.path + emoji.code + ".svg')}");
        }
      }
      $("head").append(emojis_css);
      return [regexp_for_utf.slice(0, -1), regexp_for_code.slice(0, -1) + "):"];
    };

    EmojisLoaderPOE.prototype.setEmojiIcon = function(emojis_data) {
      var getEmojiTag, replaceForCode, replaceForUTF,
        _this = this;
      getEmojiTag = function(emoji_utf) {
        return '<i class="emojidex-' + emoji_utf + '"></i>';
      };
      replaceForUTF = function(replaced_string) {
        return replaced_string = replaced_string.replace(new RegExp(_this.emoji_regexps[0], "g"), function(matched_string) {
          return getEmojiTag(matched_string);
        });
      };
      replaceForCode = function(replaced_string, emojis_data) {
        return replaced_string = replaced_string.replace(new RegExp(_this.emoji_regexps[1], "g"), function(matched_string) {
          var category, emoji, _i, _len, _ref;
          matched_string = matched_string.replace(/:/g, "");
          for (category in emojis_data) {
            _ref = emojis_data[category];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              emoji = _ref[_i];
              if (emoji.code === matched_string) {
                return getEmojiTag(emoji.moji);
              }
            }
          }
        });
      };
      return $(this.element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      }).each(function() {
        var replaced_string;
        replaced_string = this.textContent;
        replaced_string = replaceForUTF(replaced_string);
        replaced_string = replaceForCode(replaced_string, emojis_data);
        return $(this).replaceWith(replaced_string);
      });
    };

    return EmojisLoaderPOE;

  })(EmojisLoader);

  EmojisLoaderAPI = (function(_super) {
    __extends(EmojisLoaderAPI, _super);

    function EmojisLoaderAPI(json_url) {
      this.json_url = json_url;
      EmojisLoaderAPI.__super__.constructor.apply(this, arguments);
      console.log(222);
    }

    return EmojisLoaderAPI;

  })(EmojisLoader);

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidex";
    defaults = {
      emojiarea: {
        plaintext: "emojidex-plaintext",
        wysiwyg: "emojidex-wysiwyg",
        value_output: "emojidex-rawtext"
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
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.setEmojiarea(this.options);
        $.emojiarea.path = options.path_img;
        this.poe_emojis = new EmojisLoaderPOE(this.element, this.options);
        this.poe_emojis.load();
        this.api_emojis = new EmojisLoaderAPI;
      }

      Plugin.prototype.getEmojiDataFromAPI = function(callback) {
        return $.ajax({
          url: "https://www.emojidex.com/api/v1/emoji",
          dataType: "jsonp",
          jsonpCallback: "callback",
          type: "get",
          success: function(emojis_data) {
            console.log("success: load jsonp");
            console.log(emojis_data);
          },
          error: function(data) {
            console.log("error: load jsonp");
            console.log(data);
          }
        });
      };

      Plugin.prototype.setEmojiarea = function(options) {
        options.emojiarea["plaintext"].emojiarea({
          wysiwyg: false
        });
        options.emojiarea["wysiwyg"].on("change", function() {
          return options.emojiarea["value_output"].text($(this).val());
        });
        return options.emojiarea["wysiwyg"].trigger("change");
      };

      Plugin.prototype.prepareAutoComplete = function(emojis_data, options) {
        var category, emoji, emoji_config, emojis, _i, _len, _ref;
        emojis = [];
        for (category in emojis_data) {
          _ref = emojis_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            emojis.push(emoji.code);
          }
        }
        emojis = $.map(emojis, function(value, i) {
          return {
            key: value,
            name: value
          };
        });
        emoji_config = {
          at: ":",
          data: emojis,
          tpl: "<li data-value=':${key}:'><img src='../src/assets/img/utf/${name}.svg'  height='20' width='20' /> ${name}</li>",
          insert_tpl: "<img src='../src/assets/img/utf/${name}.svg' height='20' width='20' />"
        };
        options.emojiarea["plaintext"].atwho(emoji_config);
        return options.emojiarea["wysiwyg"].atwho(emoji_config);
      };

      return Plugin;

    })();
  })(jQuery, window, document);

}).call(this);
