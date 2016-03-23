/*
* emojidexPallet
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
  var CategoryTab, Pallet, SearchTab, UserTab;

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexPallet";
    defaults = {
      switch_element: $("#pallet-btn")
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.pallet = new Pallet(this);
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

  Pallet = (function() {
    function Pallet(plugin) {
      this.plugin = plugin;
      this.ec = new EmojidexClient;
      this.clipboard = new Clipboard('.emoji-btn');
      this.createDialog();
      this.setPallet(this.plugin.element);
    }

    Pallet.prototype.createDialog = function() {
      this.dialog = $('<div id="emojidex-dialog"></div>');
      $('body').append(this.dialog);
      return this.dialog.dialog({
        autoOpen: false,
        width: 700,
        title: 'Emojidex Pallet',
        create: function(e) {
          var close_btn;
          $('.ui-dialog-titlebar-close').hide();
          close_btn = $('<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
          close_btn.click(function(e) {
            return $('#emojidex-dialog').dialog('close');
          });
          return $('.ui-dialog-titlebar').append(close_btn);
        },
        open: function(e) {
          $('.ui-dialog :button').blur();
          return $('.nav.nav-pills a').blur();
        }
      });
    };

    Pallet.prototype.setPallet = function(element) {
      var _this = this;
      return $(element).click(function(e) {
        var tab_content, tab_list;
        if (_this.emoji_pallet != null) {
          return _this.openDialog();
        } else {
          tab_list = $('<ul class="nav nav-pills"></ul>');
          tab_content = $('<div class="tab-content"></div>');
          return _this.ec.Categories.sync(function(categories) {
            var category, category_tab, search_tab, user_tab, _i, _len;
            for (_i = 0, _len = categories.length; _i < _len; _i++) {
              category = categories[_i];
              category_tab = new CategoryTab(_this, category, tab_list[0].children.length);
              tab_list.append(category_tab.tab_list);
              tab_content.append(category_tab.tab_content);
            }
            search_tab = new SearchTab(_this);
            tab_list.append(search_tab.tab_list);
            tab_content.append(search_tab.tab_content);
            user_tab = new UserTab(_this);
            tab_list.append(user_tab.tab_list);
            tab_content.append(user_tab.tab_content);
            _this.emoji_pallet = $('<div class="emoji-pallet"></div>');
            _this.emoji_pallet.append(tab_list.add(tab_content));
            _this.emoji_pallet.find('ul').after('<hr>');
            _this.dialog.append(_this.emoji_pallet);
            _this.openDialog();
            return $("#tab-" + categories[0].code).click();
          });
        }
      });
    };

    Pallet.prototype.setEmojiList = function(kind, result_emoji) {
      var code, emoji, emoji_list, _i, _len, _ref;
      emoji_list = $("<div class='" + kind + "-emoji-list clearfix'></div>");
      for (_i = 0, _len = result_emoji.length; _i < _len; _i++) {
        emoji = result_emoji[_i];
        code = (_ref = emoji.code) != null ? _ref : emoji.emoji_code;
        emoji_list.append("<button class='emoji-btn btn btn-default pull-left' data-clipboard-text=':" + (code.replace(/\s/g, '_')) + ":'><img alt='" + code + "' title='" + code + "' class='img-responsive center-block' src='" + this.ec.cdn_url + "px32/" + (code.replace(/\s/g, '_')) + ".png'></img></button>");
      }
      return emoji_list;
    };

    Pallet.prototype.setPagination = function(kind, prev_func, next_func, cur_page, max_page) {
      var pagination,
        _this = this;
      pagination = $("<div class='" + kind + "-pagination text-center'><ul class='pagination mb-0'></ul></div>");
      pagination.find('.pagination').append($('<li class="pallet-pager"><span>&laquo;</span></li>').click(function() {
        return prev_func();
      }));
      pagination.find('.pagination').append($("<li class='disabled'><span>" + cur_page + " / " + max_page + "</span></li>"));
      pagination.find('.pagination').append($('<li class="pallet-pager"><span>&raquo;</span></li>').click(function() {
        return next_func();
      }));
      return pagination;
    };

    Pallet.prototype.openDialog = function() {
      return this.dialog.dialog('open');
    };

    return Pallet;

  })();

  CategoryTab = (function() {
    function CategoryTab(pallet, category, length) {
      var _this = this;
      this.pallet = pallet;
      this.tab_list = $("<li id='tab-" + category.code + "' data-code='" + category.code + "' class='" + (length === 0 ? " active" : "") + "'><a href='#tab-content-" + category.code + "' data-toggle='pill'>" + category.name + "</a></li>");
      this.tab_list.click(function(e) {
        return _this.setCategory($(e.currentTarget).data('code'));
      });
      this.tab_content = $("<div class='tab-pane " + (length === 0 ? " active" : "") + "' id='tab-content-" + category.code + "'></div>");
    }

    CategoryTab.prototype.setCategory = function(category_name) {
      if (this.tab_data != null) {
        return this.pallet.ec.Categories.called_data = this.tab_data;
      } else {
        return this.setCategoryTabContent(category_name);
      }
    };

    CategoryTab.prototype.setCategoryTabContent = function(category_name) {
      var _this = this;
      return this.pallet.ec.Categories.getEmoji(category_name, function(result_emoji) {
        var cur_page, max_page, next_func, prev_func;
        _this.tab_data = _this.pallet.ec.Categories.called_data;
        _this.tab_content.find('.category-emoji-list').remove();
        _this.tab_content.find('.category-pagination').remove();
        _this.tab_content.append(_this.pallet.setEmojiList('category', result_emoji));
        cur_page = _this.pallet.ec.Categories.meta.total_count === 0 ? 0 : _this.pallet.ec.Categories.cur_page;
        max_page = Math.floor(_this.pallet.ec.Categories.meta.total_count / _this.pallet.ec.options.limit);
        if (_this.pallet.ec.Categories.meta.total_count % _this.pallet.ec.options.limit > 0) {
          max_page++;
        }
        prev_func = function() {
          return _this.pallet.ec.Categories.prev();
        };
        next_func = function() {
          return _this.pallet.ec.Categories.next();
        };
        return _this.tab_content.append(_this.pallet.setPagination('category', prev_func, next_func, cur_page, max_page));
      });
    };

    return CategoryTab;

  })();

  SearchTab = (function() {
    function SearchTab(pallet) {
      this.pallet = pallet;
      this.tab_list = "<li id='tab-search'><a href='#tab-content-search' data-toggle='pill'>Search</a></li>";
      this.tab_content = this.getTabContent();
    }

    SearchTab.prototype.getTabContent = function() {
      var search_btn, tab_content,
        _this = this;
      tab_content = $('<div class="tab-pane" id="tab-content-search"><div class="input-group"><input type="text" name="search" id="pallet-emoji-search-input" class="form-control" placeholder="検索"><span class="input-group-btn"></span></div></div>');
      tab_content.find('#pallet-emoji-search-input').keypress(function(e) {
        if (e.keyCode === 13) {
          return _this.searchEmojiInput();
        }
      });
      search_btn = $('<div class="btn btn-primary" id="pallet-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></div>');
      search_btn.click(function() {
        return _this.searchEmojiInput();
      });
      tab_content.find('.input-group-btn').append(search_btn);
      return tab_content;
    };

    SearchTab.prototype.searchEmojiInput = function() {
      var search_word;
      search_word = $('#pallet-emoji-search-input').val();
      if (search_word.length > 0) {
        return this.search(search_word);
      }
    };

    SearchTab.prototype.search = function(search_word) {
      var _this = this;
      return this.pallet.ec.Search.search(search_word, function(result_emoji) {
        var cur_page, max_page, next_func, prev_func;
        $('.search-emoji-list').remove();
        $('.search-pagination').remove();
        _this.tab_content.append(_this.pallet.setEmojiList('search', result_emoji));
        cur_page = _this.pallet.ec.Search.meta.total_count === 0 ? 0 : _this.pallet.ec.Search.cur_page;
        max_page = Math.floor(_this.pallet.ec.Search.meta.total_count / _this.pallet.ec.options.limit);
        if (_this.pallet.ec.Search.meta.total_count % _this.pallet.ec.options.limit > 0) {
          max_page++;
        }
        prev_func = function() {
          return _this.pallet.ec.Search.prev();
        };
        next_func = function() {
          return _this.pallet.ec.Search.next();
        };
        return _this.tab_content.append(_this.pallet.setPagination('search', prev_func, next_func, cur_page, max_page));
      });
    };

    return SearchTab;

  })();

  UserTab = (function() {
    function UserTab(pallet) {
      this.pallet = pallet;
      this.tab_list = "<li id='tab-user'><a href='#tab-content-user' data-toggle='pill'>User</a></li>";
      this.tab_content = this.getTabContent();
    }

    UserTab.prototype.getTabContent = function() {
      var login_btn, tab_content,
        _this = this;
      tab_content = $('<div class="tab-pane" id="tab-content-user"><input type="text" class="form-control" id="pallet-emoji-username-input" placeholder="Username"><input type="password" class="form-control mt-m" id="pallet-emoji-password-input" placeholder="Password"></div>');
      tab_content.find('#pallet-emoji-password-input').keypress(function(e) {
        if (e.keyCode === 13) {
          return _this.checkInput();
        }
      });
      login_btn = $('<div class="btn btn-primary btn-block mt-m" id="pallet-emoji-login-submit">Login</div>');
      login_btn.click(function() {
        return _this.checkInput();
      });
      tab_content.append(login_btn);
      return tab_content;
    };

    UserTab.prototype.checkInput = function() {
      var password, username;
      $('#login-error').remove();
      username = $('#pallet-emoji-username-input').val();
      password = $('#pallet-emoji-password-input').val();
      if (username.length > 0 && password.length > 0) {
        return this.login(username, password);
      }
    };

    UserTab.prototype.login = function(username, password) {
      var _this = this;
      return this.pallet.ec.User.plain_auth(username, password, function(auth_info) {
        if (auth_info.status === 'verified') {
          _this.hideLoginForm();
          _this.setUserTab();
          _this.setHistory(auth_info);
          _this.setFavorite(auth_info);
          _this.setNewest(auth_info);
          return _this.setPopular(auth_info);
        } else {
          return _this.showError(auth_info);
        }
      });
    };

    UserTab.prototype.showError = function(auth_info) {
      return this.tab_content.prepend($('<div id="login-error"><span style="color:red">ログインに失敗しました。</span><div>'));
    };

    UserTab.prototype.hideLoginForm = function() {
      $('#pallet-emoji-username-input').val('');
      $('#pallet-emoji-password-input').val('');
      $('#pallet-emoji-username-input').hide();
      $('#pallet-emoji-password-input').hide();
      return $('#pallet-emoji-login-submit').hide();
    };

    UserTab.prototype.showLoginForm = function() {
      $('#pallet-emoji-username-input').show();
      $('#pallet-emoji-password-input').show();
      return $('#pallet-emoji-login-submit').show();
    };

    UserTab.prototype.setUserTab = function() {
      var logout_btn, user_tab_list,
        _this = this;
      user_tab_list = $('<ul class="nav nav-tabs mb-m mt-m" id="user_tab_list"></ul>');
      user_tab_list.append($('<li id="tab-user-history" class="active"><a href="#tab-content-user-history" data-toggle="tab">History</a></li>'));
      user_tab_list.append($('<li id="tab-user-favorite"><a href="#tab-content-user-favorite" data-toggle="tab">Favorite</a></li>'));
      user_tab_list.append($('<li id="tab-user-newest"><a href="#tab-content-user-newest" data-toggle="tab">Newest</a></li>'));
      user_tab_list.append($('<li id="tab-user-popular"><a href="#tab-content-user-popular" data-toggle="tab">Popular</a></li>'));
      logout_btn = $('<button class="btn btn-default btm-sm pull-right" id="pallet-emoji-logout">LogOut</button>');
      logout_btn.click(function() {
        _this.pallet.ec.User.logout();
        $('#user_tab_list').remove();
        $('#user_tab_content').remove();
        return _this.showLoginForm();
      });
      user_tab_list.append(logout_btn);
      this.user_tab_content = $('<div class="tab-content" id="user_tab_content"></div>');
      this.tab_content.append(user_tab_list);
      return this.tab_content.append(this.user_tab_content);
    };

    UserTab.prototype.setHistory = function(auth_info) {
      var _this = this;
      return this.pallet.ec.User.History.get(function(response) {
        return _this.setData(response.history, response.meta, 'history');
      });
    };

    UserTab.prototype.setFavorite = function(auth_info) {
      var _this = this;
      return this.pallet.ec.User.Favorites.get(function(response) {
        return _this.setData(response.emoji, response.meta, 'favorite');
      });
    };

    UserTab.prototype.setData = function(data, meta, kind) {
      var tab_pane;
      tab_pane = $("<div class='tab-pane " + (kind === 'history' ? 'active' : '') + "' id='tab-content-user-" + kind + "'></div>");
      tab_pane.append(this.pallet.setEmojiList(kind, data));
      return this.user_tab_content.append(tab_pane);
    };

    UserTab.prototype.setNewest = function(auth_info) {
      var _this = this;
      return this.pallet.ec.User.Newest.get(function(response) {
        return _this.setPremiumData(response, 'newest');
      });
    };

    UserTab.prototype.setPopular = function(auth_info) {
      var _this = this;
      return this.pallet.ec.User.Popular.get(function(response) {
        return _this.setPremiumData(response, 'popular');
      });
    };

    UserTab.prototype.setPremiumData = function(response, kind) {
      var tab_pane;
      tab_pane = $("<div class='tab-pane' id='tab-content-user-" + kind + "'></div>");
      if (response.statusText === 'Payment Required') {
        tab_pane.append($('<p style="margin-top:15px;"><a class="btn btn-primary" href="https://www.emojidex.com/profile">プレミアム・プロユーザーのみ閲覧できます。</a></p>'));
      } else {
        tab_pane.append(this.pallet.setEmojiList(kind, response.emoji));
      }
      return this.user_tab_content.append(tab_pane);
    };

    UserTab.prototype.setPagination = function(meta, pane, kind) {
      var cur_page, max_page, next_func, prev_func,
        _this = this;
      cur_page = meta.total_count === 0 ? 0 : meta.page;
      max_page = Math.floor(meta.total_count / 50);
      if (meta.total_count % 50 > 0) {
        max_page++;
      }
      prev_func = function() {
        return console.log('prev');
      };
      next_func = function() {
        return console.log('next');
      };
      return this.user_tab_content.append(pane.append(this.pallet.setPagination(kind, prev_func, next_func, cur_page, max_page)));
    };

    return UserTab;

  })();

}).call(this);
