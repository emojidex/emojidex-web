/*
* emojidexPalette
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 the emojidex project / K.K. GenSouSha
*/

import Palette from './components/palette'

const pluginName = 'emojidexPalette'
const defaults = {
  onEmojiButtonClicked: undefined,
  paletteEmojisLimit: 50 // NOTE: Free users can only view one page [max: 50 emoji] of their usage history and favorite.
}

export default class EmojidexPalette {
  constructor(element, options) {
    this.element = element
    this.options = $.extend({}, defaults, options) // eslint-disable-line no-undef
    this._defaults = defaults
    this._name = pluginName

    // start: Plugin --------
    this.palette = new Palette(this)
  }

  static getName() {
    return pluginName
  }
}
