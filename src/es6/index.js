import EmojidexReplace from './emojidexReplace'
import EmojidexAutocomplete from './emojidexAutocomplete'

const plugins = [EmojidexReplace, EmojidexAutocomplete];
for (const Plugin of plugins) {
  $.fn[Plugin.getName()] = function(options) {
    return this.each(function() {
      if (!$.data(this, `plugin_${Plugin.getName()}`)) {
        return $.data(this, `plugin_${Plugin.getName()}`, new Plugin(this, options))
      }
    })
  }
}