(function() {
  var EmojiAutoComplete, EmojiLoader, EmojiLoaderService, EmojiPallet,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.EmojidexClient = (function() {
    function EmojidexClient(opts) {
      if (opts == null) {
        opts = {};
      }
      this.defaults = {
        locale: 'en',
        api_uri: 'https://www.emojidex.com/api/v1/',
        cdn_uri: 'http://cdn.emojidex.com/emoji',
        size_code: 'px32',
        detailed: false,
        limit: 32
      };
      opts = $.extend({}, this.defaults, opts);
      this.api_uri = opts.api_uri;
      this.cdn_uri = opts.cdn_uri;
      this.size_code = opts.size_code;
      this.detailed = opts.detailed;
      this.limit = opts.limit;
      this._init_storages(opts);
      this.results = opts.results || [];
      this.cur_page = opts.page || 1;
      this.cur_limit = this.limit;
      this.count = opts.count || 0;
      this._auto_login();
      this.next = function() {
        return null;
      };
    }

    EmojidexClient.prototype._init_storages = function(opts) {
      this.storage = $.localStorage;
      if (!this.storage.isSet("emojidex")) {
        this.storage.set("emojidex", {});
      }
      if (!this.storage.isSet("emojidex.emoji")) {
        this.storage.set("emojidex.emoji", opts.emoji || []);
      }
      this.emoji = this.storage.get("emojidex.emoji");
      if (!this.storage.isSet("emojidex.history")) {
        this.storage.set("emojidex.history", opts.history || []);
      }
      this.history = this.storage.get("emojidex.history");
      if (!this.storage.isSet("emojidex.favorites")) {
        this.storage.set("emojidex.favorites", opts.favorites || []);
      }
      this.favorites = this.storage.get("emojidex.favorites");
      if (!this.storage.isSet("emojidex.categories")) {
        this.storage.set("emojidex.categories", opts.categories || []);
      }
      this.categories = this.storage.get("emojidex.categories");
      return this._pre_cache(opts);
    };

    EmojidexClient.prototype._pre_cache = function(opts) {
      if (this.emoji.length === 0) {
        switch (opts.locale) {
          case 'en':
            this.user_emoji('emoji');
            this.user_emoji('emojidex');
            break;
          case 'ja':
            this.user_emoji('絵文字');
            this.user_emoji('絵文字デックス');
        }
      }
      if (this.categories.length === 0) {
        return this.get_categories(null, {
          locale: opts.locale
        });
      }
    };

    EmojidexClient.prototype._auto_login = function() {
      if (this.storage.get("emojidex.auth_token") !== null) {
        this.auth_status = this.storage.get("emojidex.auth_status");
        this.auth_token = this.storage.get("emojidex.auth_token");
        this.user = this.storage.get("emojidex.user");
        return this.get_user_data();
      } else {
        return this.logout();
      }
    };

    EmojidexClient.prototype.search = function(term, callback, opts) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      this.next = function() {
        return this.search(term, callback, $.extend(opts, {
          page: opts.page + 1
        }));
      };
      opts = this._combine_opts(opts);
      return $.getJSON(this.api_uri + 'search/emoji?' + $.param($.extend({}, {
        code_cont: this._escape_term(term)
      }, opts))).error(function(response) {
        return _this.results = [];
      }).success(function(response) {
        return _this._succeed(response, callback);
      });
    };

    EmojidexClient.prototype.tag_search = function(tags, callback, opts) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      this.next = function() {
        return this.tag_search(term, callback, $.extend(opts, {
          page: opts.page + 1
        }));
      };
      opts = this._combine_opts(opts);
      return $.getJSON(this.api_uri + 'search/emoji?' + $.param($.extend({}, {
        "tags[]": this._breakout(tags)
      }, opts))).error(function(response) {
        return _this.results = [];
      }).success(function(response) {
        return _this._succeed(response, callback);
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
      this.next = function() {
        return this.advanced_search(term, tags, categories, callback, $.extend(opts, {
          page: opts.page + 1
        }));
      };
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
        return _this.results = [];
      }).success(function(response) {
        return _this._succeed(response, callback);
      });
    };

    EmojidexClient.prototype.user_emoji = function(username, callback, opts) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      opts = this._combine_opts(opts);
      return $.getJSON(this.api_uri + 'users/' + username + '/emoji?' + $.param(opts)).error(function(response) {
        return _this.results = [];
      }).success(function(response) {
        return _this._succeed(response, callback);
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
        return _this.storage.set("emojidex.categories", _this.categories);
      }).success(function(response) {
        _this.categories = response.categories;
        _this.storage.set("emojidex.categories", _this.categories);
        if (callback) {
          return callback(response.categories);
        }
      });
    };

    EmojidexClient.prototype.login = function(params) {
      switch (params.authtype) {
        case 'plain':
          return this._plain_login(params.username, params.password, params.callback);
        case 'google':
          return this._google_login(params.callback);
        default:
          return this._auto_login();
      }
    };

    EmojidexClient.prototype.logout = function() {
      this.auth_status = 'none';
      this.storage.set("emojidex.auth_status", this.auth_status);
      this.user = '';
      this.storage.set("emojidex.user", this.user);
      this.auth_token = null;
      return this.storage.set("emojidex.auth_token", this.auth_token);
    };

    EmojidexClient.prototype._plain_login = function(username, password, callback) {
      var url,
        _this = this;
      if (callback == null) {
        callback = null;
      }
      url = this.api_uri + 'users/authenticate?' + $.param({
        username: username,
        password: password
      });
      return $.getJSON(url).error(function(response) {
        _this.auth_status = response.auth_status;
        _this.auth_token = null;
        return _this.user = '';
      }).success(function(response) {
        _this._set_auth_from_response(response);
        if (callback) {
          return callback(response.auth_token);
        }
      });
    };

    EmojidexClient.prototype._google_login = function(callback) {
      if (callback == null) {
        callback = null;
      }
      return false;
    };

    EmojidexClient.prototype._set_auth_from_response = function(response) {
      this.auth_status = response.auth_status;
      this.storage.set("emojidex.auth_status", this.auth_status);
      this.auth_token = response.auth_token;
      this.storage.set("emojidex.auth_token", this.auth_token);
      this.user = response.auth_user;
      this.storage.set("emojidex.user", this.user);
      return this.get_user_data();
    };

    EmojidexClient.prototype.get_user_data = function() {
      this.get_favorites();
      return this.get_history();
    };

    EmojidexClient.prototype.get_history = function(opts) {
      var _this = this;
      if (this.auth_token !== null) {
        return $.getJSON(this.api_uri + 'users/history?' + $.param({
          auth_token: this.auth_token
        })).error(function(response) {
          return _this.history = [];
        }).success(function(response) {
          return _this.history = response;
        });
      }
    };

    EmojidexClient.prototype.set_history = function(emoji_code) {
      if (this.auth_token !== null) {
        return $.post(this.api_uri + 'users/history?' + $.param({
          auth_token: this.auth_token,
          emoji_code: emoji_code
        }));
      }
    };

    EmojidexClient.prototype.get_favorites = function() {
      if (this.auth_token !== null) {
        return $.ajax({
          url: this.api_uri + 'users/favorites',
          data: {
            auth_token: this.auth_token
          },
          success: function(response) {
            return this.favorites = response;
          },
          error: function(response) {
            return this.favorites = [];
          }
        });
      }
    };

    EmojidexClient.prototype.set_favorites = function(emoji_code) {
      if (this.auth_token !== null) {
        return $.ajax({
          type: 'POST',
          url: this.api_uri + 'users/favorites',
          data: {
            auth_token: this.auth_token,
            emoji_code: emoji_code
          },
          success: function(response) {}
        });
      }
    };

    EmojidexClient.prototype.unset_favorites = function(emoji_code) {
      if (this.auth_token !== null) {
        return $.ajax({
          type: 'DELETE',
          url: this.api_uri + 'users/favorites',
          data: {
            auth_token: this.auth_token,
            emoji_code: emoji_code
          },
          success: function(response) {}
        });
      }
    };

    EmojidexClient.prototype.combine_emoji = function(emoji) {
      return $.extend(this.emoji, emoji);
    };

    EmojidexClient.prototype.simplify = function(emoji, size_code) {
      var moji, _i, _len, _results;
      if (emoji == null) {
        emoji = this.results;
      }
      if (size_code == null) {
        size_code = this.size_code;
      }
      _results = [];
      for (_i = 0, _len = emoji.length; _i < _len; _i++) {
        moji = emoji[_i];
        _results.push({
          code: this._escape_term(moji.code),
          img_url: "" + this.cdn_uri + "/" + size_code + "/" + (this._escape_term(moji.code)) + ".png"
        });
      }
      return _results;
    };

    EmojidexClient.prototype._combine_opts = function(opts) {
      return $.extend({}, {
        page: 1,
        limit: this.limit,
        detailed: this.detailed
      }, opts);
    };

    EmojidexClient.prototype._succeed = function(response, callback) {
      this.results = response.emoji;
      this.cur_page = response.meta.page;
      this.count = response.meta.count;
      this.combine_emoji(response.emoji);
      if (callback) {
        return callback(response.emoji);
      }
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

    return EmojidexClient;

  })();

  EmojiAutoComplete = (function() {
    function EmojiAutoComplete(plugin) {
      this.plugin = plugin;
    }

    EmojiAutoComplete.prototype.setAutoComplete = function() {
      var at_init, ec, getMatchString, getRegexp, searching_num, setAtwho, setSearchedEmojiData,
        _this = this;
      setAtwho = function(at_options) {
        var target, targets, _i, _len, _results;
        targets = [_this.plugin.options.emojiarea["plain_text"], _this.plugin.options.emojiarea["content_editable"]];
        _results = [];
        for (_i = 0, _len = targets.length; _i < _len; _i++) {
          target = targets[_i];
          _results.push(target.atwho(at_options).on('reposition.atwho', function(e) {
            return $(e.currentTarget).atwho(at_options);
          }).on('hidden.atwho', function(e) {
            return $(e.currentTarget).atwho(at_options);
          }));
        }
        return _results;
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
        ec.search(match_string, function(response) {
          var searched_data;
          searched_data = ec.simplify();
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
        if (should_startWithSpace) {
          flag = '(?:^|\\s)' + flag;
        }
        return regexp = new RegExp("" + flag + "([A-Za-z" + _a + "-" + _y + "0-9_\+\-]*)$|" + flag + "([^\\x00-\\xff]*)$", 'gi');
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
        limit: 10,
        search_key: "code",
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>",
        insert_tpl: "<img src='${img_url}' height='20' width='20' />",
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

    return EmojiAutoComplete;

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
          emoji.img_url = "http://cdn.emojidex.com/emoji/px32/" + emoji.code + ".png";
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
        var ac;
        if (this.emoji_data_array) {
          ac = new EmojiAutoComplete(this);
          return ac.setAutoComplete();
        }
      };

      return Plugin;

    })();
  })(jQuery, window, document);

}).call(this);
