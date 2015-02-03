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
      this.setPallet(this.plugin.element);
    }

    Pallet.prototype.setPallet = function(element) {
      var body,
        _this = this;
      body = '';
      return $(element).click(function(e) {
        var tab_content, tab_list;
        tab_list = $('<ul class="nav nav-tabs"></ul>');
        tab_content = $('<div class="tab-content"></div>');
        return _this.ec.Categories.sync(function(categories) {
          var category, _i, _len;
          console.dir(categories);
          for (_i = 0, _len = categories.length; _i < _len; _i++) {
            category = categories[_i];
            tab_list.append("<li class='" + (tab_list[0].children.length === 0 ? " active" : "") + "'><a href='#" + category.name + "' data-toggle='tab'>" + category.name[0] + "</a></li>");
          }
          return _this.setWindow(tab_list);
        });
      });
    };

    Pallet.prototype.setWindow = function(body) {
      var ep, template;
      template = $("      <div id='templage'>        <div class='window emoji-pallet'>          <div class='window-header'>            <button type='button' class='close' data-dismiss='window' aria-hidden='true'>              x            </button>            <h4 class='window-title text-primary'>            </h4>          </div>          <div class='window-body'>          </div>        </div>      </div>    ").html();
      return ep = new Window({
        template: template,
        title: 'emoji pallet',
        bodyContent: body
      });
    };

    return Pallet;

  })();

}).call(this);
