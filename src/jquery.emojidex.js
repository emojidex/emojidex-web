(function() {
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
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.loadEmojidexJSON(this.element, this.options);
        this.setEmojiarea(this.options);
      }

      Plugin.prototype.loadEmojidexJSON = function(element, options) {
        $.emojiarea.path = options.path_img;
        return $.getJSON(options.path_json, function(emojis_data) {
          var emoji_regexps;
          $.emojiarea.icons = emojis_data;
          emoji_regexps = Plugin.prototype.setEmojiCSS_getEmojiRegexps(emojis_data);
          return Plugin.prototype.setEmojiIcon(emojis_data, element, emoji_regexps);
        });
      };

      Plugin.prototype.setEmojiCSS_getEmojiRegexps = function(emojis_data) {
        var category, emoji, emojis_css, emojis_in_category, regexp_for_code, regexp_for_utf, _i, _len;
        regexp_for_utf = "";
        regexp_for_code = ":(";
        emojis_css = $('<style type="text/css" />');
        for (category in emojis_data) {
          emojis_in_category = emojis_data[category];
          for (_i = 0, _len = emojis_in_category.length; _i < _len; _i++) {
            emoji = emojis_in_category[_i];
            regexp_for_utf += emoji.moji + "|";
            regexp_for_code += emoji.name + "|";
            emojis_css.append("i.emojidex-" + emoji.moji + " {background-image: url('" + $.emojiarea.path + emoji.name + ".svg')}");
          }
        }
        $("head").append(emojis_css);
        return [regexp_for_utf.slice(0, -1), regexp_for_code.slice(0, -1) + "):"];
      };

      Plugin.prototype.setEmojiIcon = function(emojis_data, element, emoji_regexps) {
        var getEmojiTag, replaceForCode, replaceForUTF;
        getEmojiTag = function(emoji_utf) {
          return '<i class="emojidex-' + emoji_utf + '"></i>';
        };
        replaceForUTF = function(replaced_string, emoji_regexp) {
          return replaced_string = replaced_string.replace(new RegExp(emoji_regexp, "g"), function(matched_string) {
            return getEmojiTag(matched_string);
          });
        };
        replaceForCode = function(replaced_string, emoji_regexp, emojis_data) {
          return replaced_string = replaced_string.replace(new RegExp(emoji_regexp, "g"), function(matched_string) {
            var category, emoji, _i, _len, _ref;
            matched_string = matched_string.replace(/:/g, "");
            for (category in emojis_data) {
              _ref = emojis_data[category];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                emoji = _ref[_i];
                if (emoji.name === matched_string) {
                  return getEmojiTag(emoji.moji);
                }
              }
            }
          });
        };
        return $(element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
          return this.nodeType === Node.TEXT_NODE;
        }).each(function() {
          var replaced_string;
          replaced_string = this.textContent;
          replaced_string = replaceForUTF(replaced_string, emoji_regexps[0]);
          replaced_string = replaceForCode(replaced_string, emoji_regexps[1], emojis_data);
          return $(this).replaceWith(replaced_string);
        });
      };

      Plugin.prototype.setEmojiarea = function(options) {
        options.emojiarea["plaintext"].emojiarea({
          wysiwyg: false
        });
        options.emojiarea["wysiwyg"].emojiarea({
          wysiwyg: true
        });
        options.emojiarea["wysiwyg"].on("change", function() {
          return options.emojiarea["value_output"].text($(this).val());
        });
        return options.emojiarea["wysiwyg"].trigger("change");
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

}).call(this);
