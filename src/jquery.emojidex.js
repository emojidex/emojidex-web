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
        $.emojiarea.path = options.path_emoji_img;
        return $.getJSON(options.path_emoji_json, function(emoji) {
          return Plugin.prototype.setEmojiIcon(emoji, element);
        });
      };

      Plugin.prototype.setEmojiIcon = function(emoji, element) {
        $.emojiarea.icons = emoji;
        return $.each($(element), function(i, target) {
          var replaced_html;
          replaced_html = target.innerHTML.replace(/:[\-\w]+:/g, function(matched_string) {
            var category, emojis, path, replaced;
            replaced = matched_string;
            for (category in $.emojiarea.icons) {
              emojis = $.emojiarea.icons[category];
              i = 0;
              while (i < emojis.length) {
                matched_string = matched_string.replace(/:/g, "");
                if (emojis[i].name === matched_string) {
                  path = $.emojiarea.path || "";
                  if (path.length && path.charAt(path.length - 1) !== "/") {
                    path += "/";
                  }
                  replaced = "<img src=\"" + path + matched_string + ".svg\" alt=\"" + matched_string + "\">";
                  break;
                }
                i++;
              }
            }
            return replaced;
          });
          return $(target).empty().append(replaced_html);
        });
      };

      Plugin.prototype.setEmojiarea = function(options) {
        var $wysiwyg, $wysiwyg_value;
        $wysiwyg = $(options.emojiarea["emojiarea_wysing"].selector).emojiarea({
          wysiwyg: true
        });
        $wysiwyg_value = $(options.emojiarea["emojiarea_output_value"].selector);
        $(options.emojiarea["emojiarea_planeText"].selector).emojiarea({
          wysiwyg: false
        });
        $wysiwyg.on("change", function() {
          return $wysiwyg_value.text($(this).val());
        });
        return $wysiwyg.trigger("change");
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
