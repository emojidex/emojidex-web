
/*
* emojidexPallet
*
* require: emojidex-client
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 emojidex
 */

(function() {
  var CategoryTab, IndexTab, Pallet, SearchTab, UserTab;

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexPallet";
    defaults = {
      onComplete: void 0
    };
    Plugin = (function() {
      function Plugin(element1, options) {
        this.element = element1;
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
      this.active_input_area = null;
      this.EC = new EmojidexClient({
        limit: 65,
        onReady: (function(_this) {
          return function(EC) {
            var base;
            $('input, textarea, [contenteditable="true"]').on('focus keyup mouseup', function(e) {
              return _this.active_input_area = $(e.currentTarget);
            });
            _this.createDialog();
            _this.setPallet(_this.plugin.element);
            return typeof (base = _this.plugin.options).onComplete === "function" ? base.onComplete() : void 0;
          };
        })(this)
      });
    }

    Pallet.prototype.createDialog = function() {
      this.dialog = $('<div id="emojidex-dialog-content"></div>');
      return this.dialog.dialog({
        classes: {
          'ui-dialog': 'emojidex-ui-dialog'
        },
        autoOpen: false,
        width: 700,
        title: '<img src="http://assets.emojidex.com/logo-hdpi.png" alt="emojidex logo" />',
        create: function(e) {
          var close_btn;
          $('.ui-dialog-titlebar-close').hide();
          close_btn = $('<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
          close_btn.click(function(e) {
            return $('#emojidex-dialog-content').dialog('close');
          });
          $('.ui-dialog-titlebar').append(close_btn);
          return $('.emojidex-ui-dialog').wrap('<span id="emojidex-emoji-pallet"></span>');
        },
        open: function(e) {
          $('.ui-dialog :button').blur();
          return $('.nav.nav-pills a').blur();
        }
      });
    };

    Pallet.prototype.setPallet = function(element) {
      return $(element).click((function(_this) {
        return function(e) {
          var tab_content, tab_list;
          if (_this.emoji_pallet != null) {
            return _this.openDialog();
          } else {
            tab_list = $('<ul class="nav nav-pills"></ul>');
            tab_content = $('<div class="tab-content"></div>');
            return _this.EC.Categories.sync(function(categories) {
              var category, category_tab, i, index_tab, len, search_tab, user_tab;
              index_tab = new IndexTab(_this);
              tab_list.append(index_tab.tab_list);
              tab_content.append(index_tab.tab_content);
              for (i = 0, len = categories.length; i < len; i++) {
                category = categories[i];
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
        };
      })(this));
    };

    Pallet.prototype.setEmojiList = function(kind, emoji_list) {
      var emoji, emoji_button, emoji_button_image, emoji_divs, i, len;
      emoji_divs = $("<div class='" + kind + "-emoji-list clearfix'></div>");
      for (i = 0, len = emoji_list.length; i < len; i++) {
        emoji = emoji_list[i];
        emoji_button = $('<button>', {
          "class": 'emoji-btn btn btn-default pull-left'
        });
        emoji_button.prop('emoji_data', emoji);
        emoji_button_image = $('<img>', {
          alt: "" + emoji.code,
          title: "" + emoji.code,
          "class": 'img-responsive center-block',
          src: this.EC.cdn_url + "px32/" + (emoji.code.replace(/\s/g, '_')) + ".png"
        });
        emoji_button.append(emoji_button_image);
        emoji_button.click((function(_this) {
          return function(e) {
            return _this.insertEmojiAtCaret($(e.currentTarget).prop('emoji_data'));
          };
        })(this));
        emoji_divs.append(emoji_button);
      }
      return emoji_divs;
    };

    Pallet.prototype.setCodeList = function(kind, code_list) {
      var code, emoji_button, emoji_button_image, emoji_divs, i, len;
      emoji_divs = $("<div class='" + kind + "-emoji-list clearfix'></div>");
      for (i = 0, len = code_list.length; i < len; i++) {
        code = code_list[i];
        emoji_button = $('<button>', {
          "class": 'emoji-btn btn btn-default pull-left'
        });
        emoji_button_image = $('<img>', {
          title: code,
          "class": 'img-responsive center-block',
          src: this.EC.cdn_url + "px32/" + (code.replace(/\s/g, '_')) + ".png"
        });
        emoji_button.prop('emoji_data', {
          code: code
        });
        emoji_button.append(emoji_button_image);
        emoji_button.click((function(_this) {
          return function(e) {
            return _this.insertEmojiAtCaret($(e.currentTarget).prop('emoji_data'));
          };
        })(this));
        emoji_divs.append(emoji_button);
      }
      return emoji_divs;
    };

    Pallet.prototype.mojiOrCode = function(emoji) {
      if (emoji.moji !== null && emoji.moji !== '') {
        return emoji.moji;
      } else {
        return ":" + emoji.code + ":";
      }
    };

    Pallet.prototype.insertEmojiAtCaret = function(emoji) {
      var code, elem, link_wrapper, pos, range, selection, startTxt, stopTxt, txt, wrapper;
      code = this.mojiOrCode(emoji);
      if (this.clipboard) {
        this.clipboard.destroy();
      }
      if (this.EC.User.auth_info.token !== null) {
        this.EC.User.History.set(emoji.code.replace(/\s/g, '_'));
      }
      if (this.active_input_area === null) {
        this.clipboard = new Clipboard('.emoji-btn', {
          text: function(e) {
            return code;
          }
        });
        return;
      }
      elem = this.active_input_area;
      if (elem.is('[contenteditable="true"]')) {
        wrapper = $('<img>', {
          "class": 'emojidex-emoji',
          src: this.EC.cdn_url + "px32/" + (emoji.code.replace(/\s/g, '_')) + ".png",
          alt: emoji.code
        });
        if (emoji.link !== null && emoji.link !== '') {
          link_wrapper = wrapper;
          wrapper = $('<a>', {
            href: emoji.link
          });
          wrapper = link_wrapper.append(wrapper);
        }
        elem.focus();
        selection = window.getSelection();
        range = selection.getRangeAt(0);
        range.insertNode(wrapper[0]);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        return elem.change();
      } else {
        pos = elem.caret('pos');
        txt = elem.val();
        startTxt = txt.substring(0, pos);
        stopTxt = txt.substring(pos, txt.length);
        elem.val(startTxt + code + stopTxt);
        elem.focus();
        return elem.caret('pos', pos + code.length);
      }
    };

    Pallet.prototype.setPagination = function(kind, prev_func, next_func, cur_page, max_page) {
      var pagination;
      pagination = $("<div class='" + kind + "-pagination text-center'><ul class='pagination mb-0'></ul></div>");
      pagination.find('.pagination').append($('<li class="pallet-pager"><span>&laquo;</span></li>').click((function(_this) {
        return function() {
          return prev_func();
        };
      })(this)));
      pagination.find('.pagination').append($("<li class='disabled'><span>" + cur_page + " / " + max_page + "</span></li>"));
      pagination.find('.pagination').append($('<li class="pallet-pager"><span>&raquo;</span></li>').click((function(_this) {
        return function() {
          return next_func();
        };
      })(this)));
      return pagination;
    };

    Pallet.prototype.setSorting = function(target_tab) {
      var sort_selector;
      if (this.EC.User.auth_info.premium === true) {
        sort_selector = $('<select></select>');
        sort_selector.append($('<option value="score">Score</option>'));
        sort_selector.append($('<option value="newest">Newest</option>'));
        sort_selector.append($('<option value="liked">Most Liked</option>'));
        sort_selector.val(target_tab.sort_type);
        sort_selector.change(function() {
          target_tab.sort_type = sort_selector.val();
          return target_tab.setTabContent();
        });
        return sort_selector;
      }
    };

    Pallet.prototype.openDialog = function() {
      return this.dialog.dialog('open');
    };

    return Pallet;

  })();

  CategoryTab = (function() {
    function CategoryTab(pallet, category, length) {
      this.pallet = pallet;
      this.sort_type = 'score';
      this.category_name = 'faces';
      this.tab_list = $("<li id='tab-" + category.code + "' data-code='" + category.code + "'><a href='#tab-content-" + category.code + "' data-toggle='pill'><i class='emjdx-" + category.code + "'></a></li>");
      this.tab_list.click((function(_this) {
        return function(e) {
          return _this.setCategory($(e.currentTarget).data('code'));
        };
      })(this));
      this.tab_content = $("<div class='tab-pane " + (length === 0 ? " active" : "") + "' id='tab-content-" + category.code + "'></div>");
    }

    CategoryTab.prototype.setCategory = function(category_name) {
      if (this.tab_data != null) {
        return this.pallet.EC.Categories.called_data = this.tab_data;
      } else {
        return this.setCategoryTabContent(category_name);
      }
    };

    CategoryTab.prototype.setCategoryTabContent = function(category_name) {
      this.category_name = category_name;
      return this.pallet.EC.Categories.getEmoji(category_name, (function(_this) {
        return function(result_emoji, called_data) {
          var cur_page, max_page, next_func, pagination, prev_func;
          _this.tab_data = called_data;
          _this.tab_content.find('.category-emoji-list').remove();
          _this.tab_content.find('.category-pagination').remove();
          _this.tab_content.append(_this.pallet.setEmojiList('category', result_emoji));
          cur_page = _this.pallet.EC.Categories.meta.total_count === 0 ? 0 : _this.pallet.EC.Categories.cur_page;
          max_page = Math.floor(_this.pallet.EC.Categories.meta.total_count / _this.pallet.EC.options.limit);
          if (_this.pallet.EC.Categories.meta.total_count % _this.pallet.EC.options.limit > 0) {
            max_page++;
          }
          prev_func = function() {
            return _this.pallet.EC.Categories.prev();
          };
          next_func = function() {
            return _this.pallet.EC.Categories.next();
          };
          pagination = _this.pallet.setPagination('category', prev_func, next_func, cur_page, max_page);
          pagination.append(_this.pallet.setSorting(_this));
          return _this.tab_content.append(pagination);
        };
      })(this), {
        sort: this.sort_type
      });
    };

    CategoryTab.prototype.setTabContent = function() {
      return this.setCategoryTabContent(this.category_name);
    };

    return CategoryTab;

  })();

  IndexTab = (function() {
    function IndexTab(pallet) {
      this.pallet = pallet;
      this.sort_type = 'score';
      this.tab_list = $("<li id='tab-index' class='active'><a href='#tab-content-index' data-toggle='pill'>Index</a></li>");
      this.tab_content = $("<div class='tab-pane active' id='tab-content-index'></div>");
      this.setTabContent();
    }

    IndexTab.prototype.setTabContent = function() {
      return this.pallet.EC.Indexes.index((function(_this) {
        return function(result_emoji, called_data) {
          var cur_page, max_page, next_func, pagination, prev_func;
          _this.tab_data = called_data;
          _this.tab_content.find('.index-emoji-list').remove();
          _this.tab_content.find('.index-pagination').remove();
          _this.tab_content.append(_this.pallet.setEmojiList('index', result_emoji));
          cur_page = _this.pallet.EC.Indexes.meta.total_count === 0 ? 0 : _this.pallet.EC.Indexes.cur_page;
          max_page = Math.floor(_this.pallet.EC.Indexes.meta.total_count / _this.pallet.EC.options.limit);
          if (_this.pallet.EC.Indexes.meta.total_count % _this.pallet.EC.options.limit > 0) {
            max_page++;
          }
          prev_func = function() {
            return _this.pallet.EC.Indexes.prev();
          };
          next_func = function() {
            return _this.pallet.EC.Indexes.next();
          };
          pagination = _this.pallet.setPagination('index', prev_func, next_func, cur_page, max_page);
          pagination.append(_this.pallet.setSorting(_this));
          return _this.tab_content.append(pagination);
        };
      })(this), {
        sort: this.sort_type
      });
    };

    return IndexTab;

  })();

  SearchTab = (function() {
    function SearchTab(pallet) {
      this.pallet = pallet;
      this.sort_type = 'score';
      this.tab_list = "<li id='tab-search'><a href='#tab-content-search' data-toggle='pill'>Search</a></li>";
      this.tab_content = this.getTabContent();
    }

    SearchTab.prototype.getTabContent = function() {
      var search_btn, tab_content;
      tab_content = $('<div class="tab-pane" id="tab-content-search"><div class="input-group"><input type="text" name="search" id="pallet-emoji-search-input" class="form-control" placeholder="Search emoji"><span class="input-group-btn"></span></div></div>');
      tab_content.find('#pallet-emoji-search-input').keypress((function(_this) {
        return function(e) {
          if (e.keyCode === 13) {
            return _this.searchEmojiInput();
          }
        };
      })(this));
      search_btn = $('<div class="btn btn-primary" id="pallet-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></div>');
      search_btn.click((function(_this) {
        return function() {
          return _this.searchEmojiInput();
        };
      })(this));
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
      this.search_word = search_word;
      return this.pallet.EC.Search.search(search_word, (function(_this) {
        return function(result_emoji) {
          var cur_page, max_page, next_func, pagination, prev_func;
          $('.search-emoji-list').remove();
          $('.search-pagination').remove();
          _this.tab_content.append(_this.pallet.setEmojiList('search', result_emoji));
          cur_page = _this.pallet.EC.Search.meta.total_count === 0 ? 0 : _this.pallet.EC.Search.cur_page;
          max_page = Math.floor(_this.pallet.EC.Search.meta.total_count / _this.pallet.EC.options.limit);
          if (_this.pallet.EC.Search.meta.total_count % _this.pallet.EC.options.limit > 0) {
            max_page++;
          }
          prev_func = function() {
            return _this.pallet.EC.Search.prev();
          };
          next_func = function() {
            return _this.pallet.EC.Search.next();
          };
          pagination = _this.pallet.setPagination('search', prev_func, next_func, cur_page, max_page);
          pagination.append(_this.pallet.setSorting(_this));
          return _this.tab_content.append(pagination);
        };
      })(this), {
        sort: this.sort_type
      });
    };

    SearchTab.prototype.setTabContent = function() {
      return this.search(this.search_word);
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
      var auth_info, login_btn, ref, ref1, ref2, tab_content;
      tab_content = $('<div class="tab-pane" id="tab-content-user"><input type="text" class="form-control" id="pallet-emoji-username-input" placeholder="Username"><input type="password" class="form-control mt-m" id="pallet-emoji-password-input" placeholder="Password"></div>');
      tab_content.find('#pallet-emoji-password-input').keypress((function(_this) {
        return function(e) {
          if (e.keyCode === 13) {
            return _this.checkInput();
          }
        };
      })(this));
      login_btn = $('<div class="btn btn-primary btn-block mt-m" id="pallet-emoji-login-submit">Login</div>');
      login_btn.click((function(_this) {
        return function() {
          return _this.checkInput();
        };
      })(this));
      tab_content.append(login_btn);
      if (((ref = this.pallet.EC.Data.storage.hub_cache) != null ? (ref1 = ref.emojidex) != null ? (ref2 = ref1.auth_info) != null ? ref2.status : void 0 : void 0 : void 0) === 'verified') {
        auth_info = this.pallet.EC.Data.storage.hub_cache.emojidex.auth_info;
        this.login(auth_info.user, auth_info.token, 'token');
      }
      return tab_content;
    };

    UserTab.prototype.checkInput = function() {
      var password, username;
      $('#login-error').remove();
      username = $('#pallet-emoji-username-input').val();
      password = $('#pallet-emoji-password-input').val();
      if (username.length > 0 && password.length > 0) {
        return this.login(username, password, 'plain');
      }
    };

    UserTab.prototype.login = function(username, password, type) {
      var callback;
      callback = (function(_this) {
        return function(auth_info) {
          if (auth_info.status === 'verified') {
            _this.hideLoginForm();
            _this.setUserTab();
            _this.setHistory(auth_info);
            return _this.setFavorite(auth_info);
          } else {
            return _this.showError(auth_info);
          }
        };
      })(this);
      if (type === 'plain') {
        return this.pallet.EC.User.plain_auth(username, password, function(auth_info) {
          return callback(auth_info);
        });
      } else {
        return this.pallet.EC.User.token_auth(username, password, function(auth_info) {
          return callback(auth_info);
        });
      }
    };

    UserTab.prototype.showError = function(auth_info) {
      return this.tab_content.prepend($('<div id="login-error"><span style="color:red">Login failed. Please check your username and password or <a href="https://www.emojidex.com/users/sign_in">login here</a>.</span><div>'));
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
      var logout_btn, user_tab_list;
      user_tab_list = $('<ul class="nav nav-tabs mb-m mt-m" id="user_tab_list"></ul>');
      user_tab_list.append($('<li id="tab-user-favorite" class="active"><a href="#tab-content-user-favorite" data-toggle="tab">Favorite</a></li>'));
      user_tab_list.append($('<li id="tab-user-history"><a href="#tab-content-user-history" data-toggle="tab">History</a></li>'));
      logout_btn = $('<button class="btn btn-default btm-sm pull-right" id="pallet-emoji-logout">LogOut</button>');
      logout_btn.click((function(_this) {
        return function() {
          _this.pallet.EC.User.logout();
          $('#user_tab_list').remove();
          $('#user_tab_content').remove();
          return _this.showLoginForm();
        };
      })(this));
      user_tab_list.append(logout_btn);
      this.user_tab_content = $('<div class="tab-content" id="user_tab_content"></div>');
      this.tab_content.append(user_tab_list);
      return this.tab_content.append(this.user_tab_content);
    };

    UserTab.prototype.setHistory = function(auth_info) {
      return this.pallet.EC.User.History.get((function(_this) {
        return function(response) {
          var item;
          return _this.setDataByCodes((function() {
            var i, len, ref, results;
            ref = response.history;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              item = ref[i];
              results.push(item.emoji_code);
            }
            return results;
          })(), response.meta, 'history');
        };
      })(this));
    };

    UserTab.prototype.setFavorite = function(auth_info) {
      return this.pallet.EC.User.Favorites.get((function(_this) {
        return function(response) {
          return _this.setData(response.emoji, response.meta, 'favorite');
        };
      })(this));
    };

    UserTab.prototype.setData = function(data, meta, kind) {
      var tab_pane;
      tab_pane = $("<div class='tab-pane " + (kind === 'favorite' ? 'active' : '') + "' id='tab-content-user-" + kind + "'></div>");
      tab_pane.append(this.pallet.setEmojiList(kind, data));
      return this.user_tab_content.append(tab_pane);
    };

    UserTab.prototype.setDataByCodes = function(data, meta, kind) {
      var tab_pane;
      tab_pane = $("<div class='tab-pane' id='tab-content-user-" + kind + "'></div>");
      tab_pane.append(this.pallet.setCodeList(kind, data));
      return this.user_tab_content.append(tab_pane);
    };

    UserTab.prototype.setPremiumData = function(response, kind) {
      var tab_pane;
      tab_pane = $("<div class='tab-pane' id='tab-content-user-" + kind + "'></div>");
      if (response.statusText === 'Payment Required') {
        tab_pane.append($('<p style="margin-top:15px;"><a class="btn btn-primary" href="https://www.emojidex.com/profile" target="_blank">Premium/Pro user only.</a></p>'));
      } else {
        tab_pane.append(this.pallet.setEmojiList(kind, response.emoji));
      }
      return this.user_tab_content.append(tab_pane);
    };

    UserTab.prototype.setPagination = function(meta, pane, kind) {
      var cur_page, max_page, next_func, prev_func;
      cur_page = meta.total_count === 0 ? 0 : meta.page;
      max_page = Math.floor(meta.total_count / 50);
      if (meta.total_count % 50 > 0) {
        max_page++;
      }
      prev_func = (function(_this) {
        return function() {
          return console.log('prev');
        };
      })(this);
      next_func = (function(_this) {
        return function() {
          return console.log('next');
        };
      })(this);
      return this.user_tab_content.append(pane.append(this.pallet.setPagination(kind, prev_func, next_func, cur_page, max_page)));
    };

    return UserTab;

  })();

}).call(this);
