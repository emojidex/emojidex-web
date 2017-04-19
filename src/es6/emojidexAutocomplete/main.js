/*
* emojidexAutocomplete
*
* require: emojidex-client
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 the emojidex project / K.K. GenSouSha
*/

(function($, window, document) {
  let pluginName = "emojidexAutocomplete";
  let content_editable_defaults = {
    onComplete: undefined,
    listLimit: 10,
    insertImg: true
  };
  let textarea_defaults = {
    onComplete: undefined,
    listLimit: 10,
    insertImg: false
  };
  let defaults;

  class Plugin {
    constructor(element, options) {
      this.element = element;
      defaults = element.contentEditable === 'true' ? content_editable_defaults : textarea_defaults;
      this.options = $.extend({}, defaults, options);
      this._defaults = defaults;
      this._name = pluginName;

      // start: Plugin --------
      // TODO: content_editableだと入力がバグるためライブラリを変更するまで無効化する。
      if (element.contentEditable === 'true') return;
      this.autocomplete = new AutoComplete(this);
    }
  }

  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, `plugin_${pluginName}`)) {
        return $.data(this, `plugin_${pluginName}`, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
