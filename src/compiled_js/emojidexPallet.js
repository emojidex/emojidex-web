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
      this.setPallet(this.plugin.element);
      this.can_create_window = true;
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
            var category, _i, _len;
            for (_i = 0, _len = categories.length; _i < _len; _i++) {
              category = categories[_i];
              tab_list.append("<li class='" + (tab_list[0].children.length === 0 ? " active" : "") + "'><a href='#" + category.name + "' data-toggle='pill'>" + category.name + "</a></li>");
              tab_content.append("<div class='tab-pane " + (tab_content[0].children.length === 0 ? " active" : "") + "' id='" + category.name + "'>" + category.name + "</div>");
            }
            tab_list.append("<li class=''><a href='#search_tab' data-toggle='pill'>Search</a></li>");
            tab_content.append(_this.search_tab_content);
            return _this.setWindow(tab_list.add(tab_content));
          });
        }
      });
    };

    Pallet.prototype.search = function(search_word) {
      var _this = this;
      return this.ec.Search.search(search_word, function(result_emoji) {
        var emoji, pagination, search_emoji_list, _i, _len;
        $('.serach_emoji_list').remove();
        $('.search_pagination').remove();
        search_emoji_list = $('<div class="serach_emoji_list"></div>');
        for (_i = 0, _len = result_emoji.length; _i < _len; _i++) {
          emoji = result_emoji[_i];
          search_emoji_list.append("<button class='emoji-btn btn btn-default col-xs-2 col-sm-1' data-clipboard-text=':" + (emoji.code.replace(/\s/g, '_')) + ":'><img class='img-responsive center-block' src='" + _this.ec.cdn_url + "px32/" + (emoji.code.replace(/\s/g, '_')) + ".png'></img></button>");
        }
        _this.search_tab_content.append(search_emoji_list);
        pagination = $('<div class="search_pagination row"><div class="col-xs-12"></div></div>');
        pagination.find('.col-xs-12').append($('<button class="btn btn-link col-xs-1 col-xs-offset-3">《 </button>').click(function() {
          if (_this.ec.Search.cur_page > 1) {
            return _this.ec.Search.prev();
          }
        }));
        pagination.find('.col-xs-12').append($("<p class='col-xs-4 text-center'>" + _this.ec.Search.cur_page + " / " + _this.ec.Search.count + "</p>"));
        pagination.find('.col-xs-12').append($('<button class="btn btn-link col-xs-1"> 》 </button>').click(function() {
          if (_this.ec.Search.cur_page < _this.ec.Search.count) {
            return _this.ec.Search.next();
          }
        }));
        return _this.search_tab_content.append(pagination);
      });
    };

    Pallet.prototype.setWindow = function(body) {
      var ep, template,
        _this = this;
      template = $("      <div class='window emoji-pallet'>        <div class='window-header'>          <button type='button' class='close' data-dismiss='window' aria-hidden='true'>            x          </button>          <h4 class='window-title text-primary'>          </h4>        </div>        <div class='window-body'>        </div>      </div>    ");
      template.find('.close').click(function() {
        return _this.can_create_window = true;
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
