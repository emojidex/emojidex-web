/*
* emojidexReplace
*
* =LICENSE=
* Licensed under the emojidex Open License

* Copyright 2013 the emojidex project / K.K. GenSouSha
*/

import EmojidexClient from 'emojidex-client/src/es6/client.js'
import Replacer from './components/replacer'
import Observer from './components/observer'

let pluginName = 'emojidexReplace';
let defaults = {
  onComplete: undefined,
  useLoadingImg: true,
  autoUpdate: true,
  selector: '*',
  ignore: 'script, noscript, canvas, img, style, iframe, input, textarea, pre, code',
  ignoreContentEditable: true
};

export default class EmojidexReplace {
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
