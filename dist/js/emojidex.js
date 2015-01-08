/*
 *  jQuery Emojidex - v0.1.0
 *  emojidex coffee plugin for jQuery/Zepto and compatible
 *  https://github.com/emojidex/emojidex-coffee#emojidex-coffee
 *
 *  Made by emojidex
 *  Under LGPL License
 *  https://www.gnu.org/licenses/lgpl.html License
 */
/*
emojidex coffee plugin for jQuery/Zepto and compatible

=LICENSE=
Licensed under the emojidex Open License
https://www.emojidex.com/emojidex/emojidex_open_license

Copyright 2013 Genshin Souzou Kabushiki Kaisha
*/


(function() {
  var EmojiLoader, EmojiLoaderService, EmojiPallet,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidex";
    defaults = {
      emojiarea: {
        plain_text: ".emojidex-plain_text",
        content_editable: ".emojidex-content_editable"
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
        var _this = this;
        this.element = element;
        this.emoji_data_array = [];
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.api_emoji = new EmojiLoaderService(this.element, this.options);
        this.api_emoji.load(function() {
          _this.emoji_data_array.push(_this.api_emoji.emoji_data);
          return _this.checkLoadedEmojiData();
        });
      }

      Plugin.prototype.checkLoadedEmojiData = function() {
        if (this.emoji_data_array) {
          return this.setAutoComplete(this.options);
        }
      };

      Plugin.prototype.setAutoComplete = function(options) {
        var at_config, category, emoji, emoji_data, moji, test1, test2, testCallback, _i, _j, _len, _len1, _ref, _ref1;
        emoji = [];
        _ref = this.emoji_data_array;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          emoji_data = _ref[_i];
          for (category in emoji_data) {
            _ref1 = emoji_data[category];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              moji = _ref1[_j];
              emoji.push({
                code: moji.code,
                img_url: moji.img_url
              });
            }
          }
        }
        test1 = [
          {
            code: "aaa",
            img_url: "https://diuxa3neisbs9.cloudfront.net/emoji/px128/%E5%AD%A6%E5%90%9B.png?1420689357"
          }
        ];
        test2 = [
          {
            code: "bbb",
            img_url: "https://diuxa3neisbs9.cloudfront.net/emoji/px128/%E5%AD%A6%E5%90%9B.png?1420689357"
          }
        ];
        console.log("emoji --------");
        console.dir(emoji);
        testCallback = function(data) {
          console.log(111);
          return console.log(data);
        };
        at_config = {
          callbacks: {
            matcher: function(flag, subtext, should_startWithSpace) {
              var match, regexp, _a, _y;
              console.log("matcher --------");
              flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
              if (should_startWithSpace) {
                flag = '(?:^|\\s)' + flag;
              }
              _a = decodeURI("%C3%80");
              _y = decodeURI("%C3%BF");
              regexp = new RegExp("" + flag + "([A-Za-z" + _a + "-" + _y + "0-9_\+\-]*)$|" + flag + "([^\\x00-\\xff]*)$", 'gi');
              match = regexp.exec(subtext);
              console.log(match ? match[2] || match[1] : null);
              if (match) {
                return match[2] || match[1];
              } else {
                return null;
              }
            },
            filter: function(query, data, searchKey) {
              var item, _k, _len2, _results;
              console.log("filter --------");
              _results = [];
              for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
                item = data[_k];
                if (~new String(item[searchKey]).toLowerCase().indexOf(query.toLowerCase())) {
                  _results.push(item);
                }
              }
              return _results;
            }
          },
          at: ":",
          limit: 10,
          search_key: "code",
          data: test1,
          tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>",
          insert_tpl: "<img src='${img_url}' height='20' width='20' />"
        };
        $(options.emojiarea["plain_text"]).atwho(at_config).atwho({
          search_key: "code",
          at: "@",
          tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>",
          data: test2
        });
        return $(options.emojiarea["content_editable"]).atwho(at_config);
      };

      Plugin.prototype.setEmojiarea = function(options) {
        options.emojiarea["plaintext"].emojiarea({
          wysiwyg: false
        });
        options.emojiarea["wysiwyg"].on("change", function() {
          console.dir(this);
          return options.emojiarea["rawtext"].text($(this).val());
        });
        return options.emojiarea["wysiwyg"].trigger("change");
      };

      return Plugin;

    })();
  })(jQuery, window, document);

  /*
  emojidex coffee client
  * Provides search, index caching and combining and asset URI resolution
  
  =LICENSE=
  Licensed under the emojidex Open License
  https://www.emojidex.com/emojidex/emojidex_open_license
  
  Copyright 2013 Genshin Souzou Kabushiki Kaisha
  */


  this.EmojidexClient = (function() {
    function EmojidexClient(opts) {
      if (opts == null) {
        opts = {};
      }
      this.defaults = {
        locale: 'en',
        pre_cache_utf: false,
        pre_cache_extended: false,
        pre_cache_categories: true,
        api_uri: 'https://www.emojidex.com/api/v1/',
        cdn_uri: 'http://cdn.emojidex.com',
        detailed: false,
        limit: 32
      };
      opts = $.extend({}, this.defaults, opts);
      this.api_uri = opts.api_uri;
      this.cdn_uri = opts.cdn_uri;
      this.detailed = opts.detailed;
      this.limit = opts.limit;
      this.emoji = opts.emoji || [];
      this.history = opts.history || [];
      this.favorites = opts.favorites || [];
      this.search_results = opts.search_results || [];
      this.categories = [];
      if (opts.pre_cache_categories) {
        this.get_categories(null, {
          locale: opts.locale
        });
      }
      this.last_op = null;
      this.last_page = 1;
      if (this.auto_login()) {
        get_history;
        get_favorites;
      }
      if (opts.pre_cache_utf) {
        switch (opts.locale) {
          case 'en':
            this.user_emoji('emoji');
            break;
          case 'ja':
            this.user_emoji('絵文字');
        }
      }
      if (opts.pre_cache_extended) {
        switch (opts.locale) {
          case 'en':
            this.user_emoji('emojidex');
            break;
          case 'ja':
            this.user_emoji('絵文字デックス');
        }
      }
    }

    EmojidexClient.prototype.search = function(term, callback, opts) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      opts = this._combine_opts(opts);
      return $.getJSON(this.api_uri + 'search/emoji?' + $.param($.extend({}, {
        code_cont: this._escape_term(term)
      }, opts))).error(function(response) {
        return _this.search_results = [];
      }).success(function(response) {
        _this.search_results = response.emoji;
        _this.combine_emoji(response.emoji);
        if (callback) {
          return callback(response.emoji);
        }
      });
    };

    EmojidexClient.prototype.tag_search = function(tags, callback, opts) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      opts = this._combine_opts(opts);
      return $.getJSON(this.api_uri + 'search/emoji?' + $.param($.extend({}, {
        "tags[]": this._breakout(tags)
      }, opts))).error(function(response) {
        return _this.search_results = [];
      }).success(function(response) {
        _this.search_results = response.emoji;
        _this.combine_emoji(response.emoji);
        if (callback) {
          return callback(response.emoji);
        }
      });
    };

    EmojidexClient.prototype.advanced_search = function(term, tags, categories, callback, opts) {
      var params,
        _this = this;
      if (tags == null) {
        tags = [];
      }
      if (categories == null) {
        categories = [];
      }
      if (callback == null) {
        callback = null;
      }
      opts = this._combine_opts(opts);
      params = {
        code_cont: this._escape_term(term)
      };
      if (tags.length > 0) {
        params = $.extend(params, {
          "tags[]": this._breakout(tags)
        });
      }
      if (categories.length > 0) {
        params = $.extend(params, {
          "categories[]": this._breakout(categories)
        });
      }
      return $.getJSON(this.api_uri + 'search/emoji?' + $.param($.extend(params, opts))).error(function(response) {
        return _this.search_results = [];
      }).success(function(response) {
        _this.search_results = response.emoji;
        _this.combine_emoji(response.emoji);
        if (callback) {
          return callback(response.emoji);
        }
      });
    };

    EmojidexClient.prototype.user_emoji = function(username, callback, opts) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      opts = this._combine_opts(opts);
      return $.getJSON(this.api_uri + 'users/' + username + '/emoji?' + $.param(opts)).error(function(response) {
        return _this.search_results = [];
      }).success(function(response) {
        _this.search_results = response.emoji;
        _this.combine_emoji(response.emoji);
        if (callback) {
          return callback(response.emoji);
        }
      });
    };

    EmojidexClient.prototype.get_categories = function(callback, opts) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      opts = this._combine_opts(opts);
      return $.getJSON(this.api_uri + 'categories?' + $.param(opts)).error(function(response) {
        _this.categories = [];
        return [];
      }).success(function(response) {
        _this.categories = response.categories;
        if (callback) {
          return callback(response.categories);
        }
      });
    };

    EmojidexClient.prototype.auto_login = function() {
      this.username = null;
      return this.api_key = null;
    };

    EmojidexClient.prototype.login = function(username, password) {
      if (username == null) {
        username = null;
      }
      if (password == null) {
        password = nil;
      }
    };

    EmojidexClient.prototype.get_history = function(page, limit) {
      if (page == null) {
        page = 1;
      }
      if (limit == null) {
        limit = 50;
      }
    };

    EmojidexClient.prototype.set_history = function(emoji_code) {};

    EmojidexClient.prototype.get_favorites = function(page, limit) {
      if (page == null) {
        page = 1;
      }
      if (limit == null) {
        limit = 50;
      }
    };

    EmojidexClient.prototype.set_favorites = function(emoji_code) {};

    EmojidexClient.prototype.combine_emoji = function(emoji) {
      return $.extend(this.emoji, emoji);
    };

    EmojidexClient.prototype._combine_opts = function(opts) {
      return $.extend({}, {
        page: 1,
        limit: this.limit,
        detailed: this.detailed
      }, opts);
    };

    EmojidexClient.prototype._breakout = function(items) {
      if (items === null) {
        return [];
      }
      if (!(items instanceof Array)) {
        items = [items];
      }
      return items;
    };

    EmojidexClient.prototype._escape_term = function(term) {
      return term.split(' ').join('_');
    };

    EmojidexClient.prototype._de_escape_term = function(term) {
      return term.split('_').join(' ');
    };

    EmojidexClient.prototype._last_op = function(op, args, opts) {};

    return EmojidexClient;

  })();

  EmojiLoader = (function() {
    function EmojiLoader() {}

    EmojiLoader.prototype.emoji_data = null;

    EmojiLoader.prototype.element = null;

    EmojiLoader.prototype.options = null;

    EmojiLoader.prototype.emoji_regexps = null;

    EmojiLoader.prototype.getCategorizedData = function(emoji_data) {
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

    EmojiLoader.prototype.setEmojiCSS_getEmojiRegexps = function(emoji_data) {
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

    EmojiLoader.prototype.getEmojiTag = function(emoji_code) {
      return '<i class="emojidex-' + emoji_code + '"></i>';
    };

    EmojiLoader.prototype.replaceForUTF = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.moji === matched_string) {
              return EmojiLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojiLoader.prototype.replaceForCode = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        matched_string = matched_string.replace(/:/g, "");
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.code === matched_string) {
              return EmojiLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojiLoader.prototype.setEmojiIcon = function(loader) {
      return $(this.element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      }).each(function() {
        var replaced_string;
        replaced_string = this.textContent;
        if (loader.emoji_regexps.utf != null) {
          replaced_string = EmojiLoader.prototype.replaceForUTF({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.utf,
            emoji_data: loader.emoji_data
          });
        }
        if (loader.emoji_regexps.code != null) {
          replaced_string = EmojiLoader.prototype.replaceForCode({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.code,
            emoji_data: loader.emoji_data
          });
        }
        return $(this).replaceWith(replaced_string);
      });
    };

    return EmojiLoader;

  })();

  EmojiLoaderService = (function(_super) {
    __extends(EmojiLoaderService, _super);

    function EmojiLoaderService(element, options) {
      this.element = element;
      this.options = options;
      EmojiLoaderService.__super__.constructor.apply(this, arguments);
    }

    EmojiLoaderService.prototype.load = function(callback) {
      var onLoadEmojiData,
        _this = this;
      onLoadEmojiData = function(emoji_data) {
        var emoji, _i, _len;
        for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
          emoji = emoji_data[_i];
          emoji.code = emoji.code.replace(RegExp(" ", "g"), "_");
          emoji.img_url = "http://assets.emojidex.com/emoji/px32/" + emoji.code + ".png";
        }
        _this.emoji_data = _this.getCategorizedData(emoji_data);
        _this.emoji_regexps = _this.setEmojiCSS_getEmojiRegexps(_this.emoji_data);
        _this.setEmojiIcon(_this);
        return callback(_this);
      };
      this.getEmojiDataFromAPI(onLoadEmojiData);
      return this;
    };

    EmojiLoaderService.prototype.getEmojiDataFromAPI = function(callback) {
      var emoji_data, loaded_num, user_name, user_names, _i, _len, _results;
      loaded_num = 0;
      user_names = ["emojidex", "emoji"];
      emoji_data = [];
      _results = [];
      for (_i = 0, _len = user_names.length; _i < _len; _i++) {
        user_name = user_names[_i];
        $.ajaxSetup({
          beforeSend: function(jqXHR, settings) {
            return jqXHR.user_name = user_name;
          }
        });
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

    return EmojiLoaderService;

  })(EmojiLoader);

  EmojiPallet = (function() {
    function EmojiPallet(emoji_data_array, element, options) {
      this.emoji_data_array = emoji_data_array;
      this.element = element;
      this.options = options;
      this.KEY_ESC = 27;
      this.KEY_TAB = 9;
    }

    EmojiPallet.prototype.setPallet = function() {};

    return EmojiPallet;

  })();

}).call(this);
