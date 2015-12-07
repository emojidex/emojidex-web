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
  var Pallet;

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
      this.can_create_window = true;
      this.show_first_tab = true;
      this.tabs_emoji = [];
      this.setPallet(this.plugin.element);
    }

    Pallet.prototype.setPallet = function(element) {
      var search_emoji_input,
        _this = this;
      search_emoji_input = function() {
        var search_word;
        search_word = $('#pallet-emoji-search-input').val();
        if (search_word.length > 0) {
          return _this.search(search_word);
        }
      };
      return $(element).click(function(e) {
        var search_btn, tab_content, tab_list;
        if (_this.can_create_window) {
          _this.can_create_window = false;
          _this.search_tab_content = $('<div class="tab-pane" id="search_tab"><div class="input-group"><input type="text" name="search" id="pallet-emoji-search-input" class="form-control" placeholder="検索"><span class="input-group-btn"></span></div></div>');
          _this.search_tab_content.find('#pallet-emoji-search-input').keypress(function(e) {
            if (e.keyCode === 13) {
              return search_emoji_input();
            }
          });
          search_btn = $('<button type="submit" class="btn btn-primary" id="pallet-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></button>');
          search_btn.click(function() {
            return search_emoji_input();
          });
          _this.search_tab_content.find('.input-group-btn').append(search_btn);
          tab_list = $('<ul class="nav nav-pills"></ul>');
          tab_content = $('<div class="tab-content"></div>');
          return _this.ec.Categories.sync(function(categories) {
            var category, content_page, tab_button, _i, _len;
            for (_i = 0, _len = categories.length; _i < _len; _i++) {
              category = categories[_i];
              tab_button = $("<li id='tab-" + category.code + "' data-code='" + category.code + "' class='" + (tab_list[0].children.length === 0 ? " active" : "") + "'><a href='#tab-content-" + category.code + "' data-toggle='pill'>" + category.name + "</a></li>");
              content_page = $("<div class='tab-pane " + (tab_content[0].children.length === 0 ? " active" : "") + "' id='tab-content-" + category.code + "'></div>");
              tab_button.click(function(e) {
                return _this.setCategory($(e.currentTarget).data('code'));
              });
              tab_list.append(tab_button);
              tab_content.append(content_page);
            }
            tab_list.append("<li class=''><a href='#search_tab' data-toggle='pill'>Search</a></li>");
            tab_content.append(_this.search_tab_content);
            _this.emoji_pallet = $('<div class="emoji-pallet"></div>');
            _this.emoji_pallet.append(tab_list.add(tab_content));
            _this.emoji_pallet.find('ul').after('<hr>');
            _this.setWindow(_this.emoji_pallet);
            return $("#tab-abstract").click();
          });
        }
      });
    };

    Pallet.prototype.setCategory = function(category_name) {
      var tab_data, _i, _len, _ref, _results;
      if (this.tabs_emoji.length && !this.show_first_tab) {
        _ref = this.tabs_emoji;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tab_data = _ref[_i];
          if (tab_data.category_name === category_name) {
            this.ec.Categories.called_data = tab_data;
            break;
          } else if (tab_data === this.tabs_emoji[this.tabs_emoji.length - 1]) {
            _results.push(this.setCategoryTabContent(category_name));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      } else {
        this.show_first_tab = false;
        return this.setCategoryTabContent(category_name);
      }
    };

    Pallet.prototype.setCategoryTabContent = function(category_name) {
      var _this = this;
      return this.ec.Categories.getEmoji(category_name, function(result_emoji) {
        var category_emoji_list, content_page, cur_page, emoji, i, max_page, pagination, tab_data, _i, _j, _len, _len1, _ref;
        if (_this.tabs_emoji.length) {
          _ref = _this.tabs_emoji;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            tab_data = _ref[i];
            if (tab_data.category_name === category_name) {
              _this.tabs_emoji[i] = _this.ec.Categories.called_data;
              break;
            } else if (tab_data === _this.tabs_emoji[_this.tabs_emoji.length - 1]) {
              _this.tabs_emoji.push(_this.ec.Categories.called_data);
            }
          }
        } else {
          _this.tabs_emoji.push(_this.ec.Categories.called_data);
        }
        content_page = $("#tab-content-" + category_name);
        content_page.find('.category-emoji-list').remove();
        content_page.find('.category-pagination').remove();
        category_emoji_list = $('<div class="category-emoji-list clearfix"></div>');
        for (_j = 0, _len1 = result_emoji.length; _j < _len1; _j++) {
          emoji = result_emoji[_j];
          category_emoji_list.append(_this.createEmojiButton(emoji.code));
        }
        content_page.append(category_emoji_list);
        pagination = $('<div class="category-pagination"><div class="text-center"><ul class="pagination"></ul></div></div>');
        pagination.find('.pagination').append($('<li class="pallet-pager"><span>&laquo;</span></li>').click(function() {
          return _this.ec.Categories.prev();
        }));
        cur_page = _this.ec.Categories.meta.total_count === 0 ? 0 : _this.ec.Categories.cur_page;
        max_page = Math.floor(_this.ec.Categories.meta.total_count / _this.ec.options.limit);
        if (_this.ec.Categories.meta.total_count % _this.ec.options.limit > 0) {
          max_page++;
        }
        pagination.find('.pagination').append($("<li class='disabled'><span>" + cur_page + " / " + max_page + "</span></li>"));
        pagination.find('.pagination').append($('<li class="pallet-pager"><span>&raquo;</span></li>').click(function() {
          return _this.ec.Categories.next();
        }));
        return content_page.append(pagination);
      });
    };

    Pallet.prototype.search = function(search_word) {
      var _this = this;
      return this.ec.Search.search(search_word, function(result_emoji) {
        var cur_page, emoji, max_page, pagination, search_emoji_list, _i, _len;
        $('.serach-emoji-list').remove();
        $('.search-pagination').remove();
        search_emoji_list = $('<div class="serach-emoji-list clearfix"></div>');
        for (_i = 0, _len = result_emoji.length; _i < _len; _i++) {
          emoji = result_emoji[_i];
          search_emoji_list.append(_this.createEmojiButton(emoji.code));
        }
        _this.search_tab_content.append(search_emoji_list);
        pagination = $('<div class="search-pagination"><div class="text-center"><ul class="pagination"></ul></div></div>');
        pagination.find('.pagination').append($('<li class="pallet-pager"><span>&laquo;</span></li>').click(function() {
          return _this.ec.Search.prev();
        }));
        cur_page = _this.ec.Search.meta.total_count === 0 ? 0 : _this.ec.Search.cur_page;
        max_page = Math.floor(_this.ec.Search.meta.total_count / _this.ec.options.limit);
        if (_this.ec.Search.meta.total_count % _this.ec.options.limit > 0) {
          max_page++;
        }
        pagination.find('.pagination').append($("<li class='disabled'><span>" + cur_page + " / " + max_page + "</span></li>"));
        pagination.find('.pagination').append($('<li class="pallet-pager"><span>&raquo;</span></li>').click(function() {
          return _this.ec.Search.next();
        }));
        return _this.search_tab_content.append(pagination);
      });
    };

    Pallet.prototype.createEmojiButton = function(code) {
      return "<button class='emoji-btn btn btn-default col-xs-2 col-sm-1' data-clipboard-text=':" + (code.replace(/\s/g, '_')) + ":'><img alt='" + code + "' title='" + code + "' class='img-responsive center-block' src='" + this.ec.cdn_url + "px32/" + (code.replace(/\s/g, '_')) + ".png'></img></button>";
    };

    Pallet.prototype.setWindow = function(body) {
      var ep, template,
        _this = this;
      template = $("      <div class='window emoji-pallet'>        <div class='window-header'>          <button type='button' class='close' data-dismiss='window' aria-hidden='true'>            x          </button>          <h4 class='window-title text-primary'>          </h4>        </div>        <div class='window-body'>        </div>      </div>    ");
      template.find('.close').click(function() {
        _this.can_create_window = true;
        return _this.show_first_tab = true;
      });
      return ep = new Window({
        template: template,
        title: 'emoji pallet',
        bodyContent: body
      });
    };

    return Pallet;

  })();

}).call(this);
