
/*
* emojidexAutocomplete
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
  var AutoComplete;

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexAutocomplete";
    defaults = {
      onComplete: void 0,
      listLimit: 10,
      insertImg: true
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.autocomplete = new AutoComplete(this);
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

  AutoComplete = (function() {
    function AutoComplete(plugin) {
      this.plugin = plugin;
      this.searching_num = 0;
      this.EC = new EmojidexClient({
        onReady: (function(_this) {
          return function(EC) {
            return _this.setAutoComplete();
          };
        })(this)
      });
    }

    AutoComplete.prototype.setAutoComplete = function() {
      var at_init, getMatchString, getRegexp, onHighlighter, setAtwho, setSearchedEmojiData;
      setAtwho = (function(_this) {
        return function(at_options) {
          var base;
          $(_this.plugin.element).atwho(at_options).on('reposition.atwho', function(e) {
            return $(e.currentTarget).atwho(at_options);
          }).on('hidden.atwho', function(e) {
            return $(e.currentTarget).atwho(at_options);
          });
          return typeof (base = _this.plugin.options).onComplete === "function" ? base.onComplete() : void 0;
        };
      })(this);
      setSearchedEmojiData = (function(_this) {
        return function(at_obj, match_string) {
          var num, updateAtwho;
          updateAtwho = function(searched_data, at_bak) {
            var at_options;
            at_options = {
              data: searched_data,
              callbacks: {
                highlighter: onHighlighter,
                matcher: function(flag, subtext, should_startWithSpace) {
                  var match;
                  return match = getMatchString(subtext, getRegexp(flag, should_startWithSpace));
                }
              }
            };
            return at_bak.$inputor.atwho('destroy').atwho($.extend({}, at_bak.setting, at_options)).atwho('run');
          };
          num = ++_this.searching_num;
          _this.EC.Search.search(match_string, function(response) {
            var emoji, searched_data;
            searched_data = (function() {
              var i, len, ref, results;
              ref = this.EC.Search.results;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                emoji = ref[i];
                results.push({
                  code: emoji.code.replace(/\s/g, '_'),
                  img_url: "" + this.EC.cdn_url + this.EC.size_code + "/" + (emoji.code.replace(/\s/g, '_')) + ".png"
                });
              }
              return results;
            }).call(_this);
            if (_this.searching_num === num) {
              if (searched_data.length) {
                updateAtwho(searched_data, at_obj);
              }
              return _this.searching_num = 0;
            }
          });
          return match_string;
        };
      })(this);
      getRegexp = function(flag, should_startWithSpace) {
        var _a, _y, regexp;
        _a = decodeURI("%C3%80");
        _y = decodeURI("%C3%BF");
        return regexp = new RegExp("[：" + flag + "]([^：:;@&#~\!\$\+\?\%\*\f\n\r\\\/]+)$", 'gi');
      };
      getMatchString = function(subtext, regexp) {
        var match;
        match = regexp.exec(subtext);
        match = match ? match[2] || match[1] : null;
        return match;
      };
      onHighlighter = function(li, query) {
        var regexp;
        if (!query) {
          return li;
        }
        regexp = new RegExp(">\\s*([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*?)(" + (query.replace(/(\(|\))/g, '\\$1')) + ")([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*)\\s*<", 'ig');
        return li.replace(regexp, function(str, $1, $2, $3) {
          return "> " + $1 + "<strong>" + $2 + "</strong>" + $3 + " <";
        });
      };
      at_init = {
        at: ':',
        suffix: '',
        limit: this.plugin.options.listLimit,
        search_key: "code",
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20'></img>${code}</li>",
        insert_tpl: this.plugin.options.insertImg ? "<img src='${img_url}' height='20' width='20' />" : ":${code}:",
        callbacks: {
          highlighter: onHighlighter,
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

    return AutoComplete;

  })();

}).call(this);
