(function() {
  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidex";
    defaults = {};
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
          $.emojiarea.icons = emojis_data;
          Plugin.prototype.setEmojiIconForUTF(emojis_data, element);
          return Plugin.prototype.setEmojiIconForCode(emojis_data, element);
        });
      };

      Plugin.prototype.setEmojiIconForUTF = function(emojis_data, element) {};

      Plugin.prototype.setEmojiIconForCode = function(emojis_data, element) {
        var path;
        path = $.emojiarea.path || "";
        if (path.length && path.charAt(path.length - 1) !== "/") {
          path += "/";
        }
        return $.each($(element), function(i, target) {
          var replaced_html;
          replaced_html = target.innerHTML.replace(/:[\-\w]+:/g, function(matched_string) {
            var category, emoji, emojis_in_category, img_tag, _i, _len;
            img_tag = "";
            for (category in emojis_data) {
              emojis_in_category = emojis_data[category];
              for (_i = 0, _len = emojis_in_category.length; _i < _len; _i++) {
                emoji = emojis_in_category[_i];
                matched_string = matched_string.replace(/:/g, "");
                if (emoji.name === matched_string) {
                  img_tag = "<img src=\"" + path + matched_string + ".svg\" alt=\"" + matched_string + "\">";
                  break;
                }
              }
            }
            return img_tag;
          });
          return $(target).empty().append(replaced_html);
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
