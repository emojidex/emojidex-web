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
  var AutoComplete, OriginAutoComplete;

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
      var _this = this;
      this.plugin = plugin;
      this.searching_num = 0;
      this.EC = new EmojidexClient({
        onReady: function(EC) {
          return _this.setAutoComplete();
        }
      });
    }

    AutoComplete.prototype.setAutoComplete = function() {
      var config, emojis, emojisList;
      emojis = ['smile', 'iphone', 'girl', 'smiley', 'heart', 'kiss', 'copyright', 'coffee'];
      emojisList = $.map(emojis, function(value, i) {
        return {
          'id': i,
          'name': value
        };
      });
      config = {
        at: ':',
        data: emojisList,
        limit: this.plugin.options.listLimit,
        searchKey: "name",
        displayTpl: "<li><img src='http://a248.e.akamai.net/assets.github.com/images/icons/emoji/${name}.png' height='20' width='20'/> ${name} </li>",
        insertTpl: ":${name}:"
      };
      $(this.plugin).atwho(config).atwho('run');
      return console.log($(this.plugin));
    };

    return AutoComplete;

  })();

  OriginAutoComplete = (function() {
    function OriginAutoComplete(plugin) {
      var _this = this;
      this.plugin = plugin;
      this.searching_num = 0;
      this.EC = new EmojidexClient({
        onReady: function(EC) {
          return _this.setAutoComplete();
        }
      });
    }

    OriginAutoComplete.prototype.setAutoComplete = function() {
      var at_init, getMatchString, getRegexp, onHighlighter, setAtwho, setSearchedEmojiData,
        _this = this;
      setAtwho = function(at_options) {
        var _base;
        $(_this.plugin.element).atwho(at_options).on('reposition.atwho', function(e) {
          return $(e.currentTarget).atwho(at_options);
        }).on('hidden.atwho', function(e) {
          return $(e.currentTarget).atwho(at_options);
        });
        return typeof (_base = _this.plugin.options).onComplete === "function" ? _base.onComplete() : void 0;
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
          return at_bak.$inputor.atwho($.extend({}, at_bak.setting, at_options)).atwho('run');
        };
        num = ++_this.searching_num;
        _this.EC.Search.search(match_string, function(response) {
          var emoji, searched_data;
          searched_data = (function() {
            var _i, _len, _ref, _results;
            _ref = this.EC.Search.results;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              emoji = _ref[_i];
              _results.push({
                code: emoji.code.replace(/\s/g, '_'),
                img_url: "" + this.EC.cdn_url + this.EC.size_code + "/" + (emoji.code.replace(/\s/g, '_')) + ".png"
              });
            }
            return _results;
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
      getRegexp = function(flag, should_startWithSpace) {
        var regexp, _a, _y;
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
        searchKey: "code",
        displayTpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20'></img>${code}</li>",
        insertTpl: this.plugin.options.insertImg ? "<img src='${img_url}' height='20' width='20' />" : ":${code}:",
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

    return OriginAutoComplete;

  })();

}).call(this);
