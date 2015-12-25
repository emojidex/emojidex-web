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
  var CategoryTab, Pallet, SearchTab;

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
            var category, category_tab, search_tab, _i, _len;
            for (_i = 0, _len = categories.length; _i < _len; _i++) {
              category = categories[_i];
              category_tab = new CategoryTab(_this, category, tab_list[0].children.length);
              tab_list.append(category_tab.tab_list);
              tab_content.append(category_tab.tab_content);
            }
            search_tab = new SearchTab(_this);
            tab_list.append(search_tab.tab_list);
            tab_content.append(search_tab.tab_content);
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
      var emoji, emoji_list, _i, _len;
      emoji_list = $("<div class='" + kind + "-emoji-list clearfix'></div>");
      for (_i = 0, _len = result_emoji.length; _i < _len; _i++) {
        emoji = result_emoji[_i];
        emoji_list.append("<button class='emoji-btn btn btn-default pull-left' data-clipboard-text=':" + (emoji.code.replace(/\s/g, '_')) + ":'><img alt='" + emoji.code + "' title='" + emoji.code + "' class='img-responsive center-block' src='" + this.ec.cdn_url + "px32/" + (emoji.code.replace(/\s/g, '_')) + ".png'></img></button>");
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
      this.tab_list = "<li class=''><a href='#tab-content-search' data-toggle='pill'>Search</a></li>";
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

}).call(this);
