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
      contentEditablePlaneText: false
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
      var at_init, ec, getMatchString, getRegexp, searching_num, setAtwho, setSearchedEmojiData,
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
        ec.Search.search(escape(match_string), function(response) {
          var emoji, searched_data;
          console.dir(this);
          console.dir(response);
          console.log(111);
          console.log(ec.Search.results);
          searched_data = (function() {
            var _i, _len, _ref, _results;
            _ref = ec.Search.results;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              emoji = _ref[_i];
              _results.push({
                code: emoji.code.replace(/[ ]/g, "_"),
                img_url: "http://cdn.emojidex.com/emoji/px32/" + (emoji.code.replace(/\s/g, '_')) + ".png"
              });
            }
            return _results;
          })();
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
        return regexp = new RegExp("" + flag + "([^:;@$&!?#%~=+*\f\n\r\\\/]+)", 'gi');
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
        limit: this.plugin.options.limit,
        search_key: "code",
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>",
        insert_tpl: this.plugin.options.contentEditablePlaneText ? ":${code}:" : "<img src='${img_url}' height='20' width='20' />",
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

    return AutoComplete;

  })();

}).call(this);
