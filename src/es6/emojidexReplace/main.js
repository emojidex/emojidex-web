/*
* emojidexReplace
*
* =LICENSE=
* Licensed under the emojidex Open License

* Copyright 2013 the emojidex project / K.K. GenSouSha
*/

(function($, window, document) {
  let pluginName = 'emojidexReplace';
  let defaults = {
    onComplete: undefined,
    useLoadingImg: true,
    autoUpdate: true,
    ignore: 'script, noscript, canvas, img, style, iframe, input, textarea, pre, code'
  };

  class Plugin {
    constructor(element, options) {
      this.element = element;
      if (!window.emojidexReplacerOnce) {
        window.emojidexReplacerOnce = true;

        this.element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.EC = new EmojidexClient({
          onReady: EC => {
            this.EC.User.login('session');
            this.replace()
          }
        });
      }
    }

    replace() {
      if (this.options.autoUpdate) {
        this.replacer = new Observer(this).reloadEmoji();
      } else {
        this.replacer = new Replacer(this).loadEmoji().then(() => {
          if (typeof this.options.onComplete === "function") {
            this.options.onComplete();
          }
        });
      }
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
