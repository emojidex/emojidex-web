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

const pluginName = "emojidexPalette";
const defaults = {
  onComplete: undefined,
  onEmojiButtonClicked: undefined,
  paletteEmojisLimit: 50
};

export default class EmojidexPalette {
  constructor(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    // start: Plugin --------
    this.palette = new Palette(this);
  }
  
  static getName() {
    return pluginName;
  }
}
