import EmojidexAutocomplete from './emojidexAutocomplete'
import EmojidexPalette from './emojidexPalette'
import EmojidexReplace from './emojidexReplace'

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