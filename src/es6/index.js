import EmojidexReplace from './emojidexReplace'

let pluginName = 'emojidexReplace'
$.fn[pluginName] = function(options) {
  return this.each(function() {
    if (!$.data(this, `plugin_${pluginName}`)) {
      return $.data(this, `plugin_${pluginName}`, new EmojidexReplace(this, options))
    }
  })
}