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

const pluginName = 'emojidexReplace'
const defaults = {
  useLoadingImg: true,
  autoUpdate: true,
  selector: '*',
  ignore: 'script, noscript, canvas, img, style, iframe, input, textarea, pre, code',
  ignoreContentEditable: true,
  threed: false
}

export default class EmojidexReplace {
  constructor(element, options) {
    this.element = element
    if (!window.emojidexReplacerOnce) {
      window.emojidexReplacerOnce = true

      this.element = $(this.element) // eslint-disable-line no-undef
      this.options = $.extend({}, defaults, options) // eslint-disable-line no-undef
      this._defaults = defaults
      this._name = pluginName

      return new EmojidexClient().then(EC => {
        this.EC = EC
        this.EC.User.login()
        return this.replace()
      })
    }
  }

  async replace() {
    if (this.options.autoUpdate) {
      this.replacer = new Observer(this)
      await this.replacer.reloadEmoji()
    } else {
      this.replacer = new Replacer(this)
      await this.replacer.loadEmoji()
    }

    return this.replacer
  }

  static getName() {
    return pluginName
  }
}
