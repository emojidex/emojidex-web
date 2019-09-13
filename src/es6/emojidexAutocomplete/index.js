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

import AutoComplete from './components/autocomplete'

const pluginName = 'emojidexAutocomplete'
const defaults = {
  listLimit: 15,
  contentEditable: {
    insertImg: true
  }
}

export default class EmojidexAutocomplete {
  constructor(element, options) {
    this.element = element
    this.options = $.extend({}, defaults, options) // eslint-disable-line no-undef
    this._defaults = defaults
    this._name = pluginName

    // start: Plugin --------
    this.autocomplete = new AutoComplete(this)
    return this.autocomplete
  }

  static getName() {
    return pluginName
  }
}

