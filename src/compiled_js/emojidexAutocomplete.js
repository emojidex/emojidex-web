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
      limit: 10,
      insertImg: true
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.autocomplete = new AutoComplete(this);
        this.autocomplete.setAutoComplete();
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
    }

    AutoComplete.prototype.setAutoComplete = function() {
      var at_init, ec, getMatchString, getRegexp, onHighlighter, searching_num, setAtwho, setSearchedEmojiData,
        _this = this;
      setAtwho = function(at_options) {
        return $(_this.plugin.element).atwho(at_options).on('reposition.atwho', function(e) {
          return $(e.currentTarget).atwho(at_options);
        }).on('hidden.atwho', function(e) {
          return $(e.currentTarget).atwho(at_options);
        });
      };
      setSearchedEmojiData = function(at_obj, match_string) {
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
        num = ++searching_num;
        ec.Search.search(match_string, function(response) {
          var emoji, searched_data;
          searched_data = (function() {
            var _i, _len, _ref, _results;
            _ref = ec.Search.results;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              emoji = _ref[_i];
              _results.push({
                code: emoji.code.replace(/\s/g, '_'),
                img_url: "http://cdn.emojidex.com/emoji/px32/" + (emoji.code.replace(/\s/g, '_')) + ".png"
              });
            }
            return _results;
          })();
          if (searching_num === num) {
            if (searched_data.length) {
              return updateAtwho(searched_data, at_obj);
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
        return regexp = new RegExp("" + flag + "([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/?]+)$", 'gi');
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
        regexp = new RegExp(">\\s*([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*?)(" + query.replace(/(\(|\))/g, '\\$1') + ")([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*)\\s*<", 'ig');
        return li.replace(regexp, function(str, $1, $2, $3) {
          return '> ' + $1 + '<strong>' + $2 + '</strong>' + $3 + ' <';
        });
      };
      searching_num = 0;
      ec = new EmojidexClient;
      at_init = {
        at: ":",
        limit: this.plugin.options.limit,
        search_key: "code",
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20'></img> ${code}</li>",
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
