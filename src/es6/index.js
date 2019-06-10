import EmojidexAutocomplete from './emojidexAutocomplete'
import EmojidexPalette from './emojidexPalette'
import EmojidexReplace from './emojidexReplace'

import 'bootstrap-sass/assets/javascripts/bootstrap/tab.js'
import 'jquery.caret/dist/jquery.caret.min.js'
import './../vendor/jquery-ui-1.12.1.custom/jquery-ui.min.js'

const plugins = [EmojidexAutocomplete, EmojidexPalette, EmojidexReplace];
for (const Plugin of plugins) {
  $.fn[Plugin.getName()] = function(options) {
    return this.each(function() {
      if (!$.data(this, `plugin_${Plugin.getName()}`)) {
        return $.data(this, `plugin_${Plugin.getName()}`, new Plugin(this, options))
      }
    })
  }
}