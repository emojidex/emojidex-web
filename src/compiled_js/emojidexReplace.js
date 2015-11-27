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
  var Replacer;

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = 'emojidexReplace';
    defaults = {
      onComplete: void 0,
      useLoadingImg: false,
      ignore: 'iframe, textarea, script, pre, code',
      reloadOnAjax: true
    };
    Plugin = (function() {
      function Plugin(element, options) {
        var _this = this;
        this.element = element;
        this.element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.ec = new EmojidexClient;
        if (this.checkUpdate()) {
          this.options.regexpUtf = RegExp(this.ec.Data.storage.get('emojidex.regexpUtf'), 'g');
          this.options.utfEmojiData = this.ec.Data.storage.get('emojidex.utfEmojiData');
          this.replace();
        } else {
          $.ajax({
            url: this.ec.api_url + 'moji_codes',
            dataType: 'json',
            success: function(response) {
              var regexp;
              _this.ec.Data.storage.set('emojidex.utfInfoUpdated', new Date().toString());
              regexp = response.moji_array.join('|');
              _this.ec.Data.storage.set('emojidex.regexpUtf', regexp);
              _this.options.regexpUtf = RegExp(regexp, 'g');
              _this.ec.Data.storage.set('emojidex.utfEmojiData', response.moji_index);
              _this.options.utfEmojiData = response.moji_index;
              return _this.replace();
            }
          });
        }
      }

      Plugin.prototype.checkUpdate = function() {
        var current, updated;
        if (this.ec.Data.storage.isSet('emojidex.utfInfoUpdated')) {
          current = new Date;
          updated = new Date(this.ec.Data.storage.get('emojidex.utfInfoUpdated'));
          if (current - updated <= 3600000 * 48) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
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

  Replacer = (function() {
    function Replacer() {
      var ignore;
      this.loadingNum = 0;
      ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\';
      this.regexpCode = RegExp(":([^\\s" + ignore + "][^" + ignore + "]*[^\\s" + ignore + "]):|:([^\\s" + ignore + "]):", 'g');
    }

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return "<img class='emojidex-emoji' src='" + this.plugin.ec.cdn_url + this.plugin.ec.size_code + "/" + emoji_code + ".png' title='" + (this.replaceUnderToSpace(emoji_code)) + "'></img>";
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
        if (element.parentElement.tagName !== 'STYLE' && element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
          replaced_text = _this.getTextWithLoadingTag(element.textContent);
          if (replaced_text !== element.textContent) {
            return $(element).replaceWith(replaced_text);
          }
        }
      });
    };

    Replacer.prototype.getTextWithLoadingTag = function(text) {
      var text_bak,
        _this = this;
      text_bak = text;
      text = text.replace(this.plugin.options.regexpUtf, function(matched_string) {
        return _this.getLoadingTag(matched_string, 'utf');
      });
      text = text.replace(this.regexpCode, function(matched_string, pattern1) {
        return _this.getLoadingTag(matched_string, 'code');
      });
      return text;
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
              if (_this.plugin.options.reloadOnAjax) {
                return _this.plugin.element.watch({
                  properties: 'prop_innerText',
                  watchChildren: true,
                  callback: function(data, i) {
                    var plugin_data;
                    plugin_data = _this.plugin.element.data().plugin_emojidexReplace;
                    plugin_data.options.useLoadingImg = false;
                    return plugin_data.replacer.loadEmoji();
                  }
                });
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

}).call(this);
