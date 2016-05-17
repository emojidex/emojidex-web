###
* emojidexAutocomplete
*
* require: emojidex-client
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 Genshin Souzou Kabushiki Kaisha
###

do ($ = jQuery, window, document) ->
  pluginName = "emojidexAutocomplete"
  defaults =
    onComplete: undefined
    listLimit: 10
    insertImg: false

  class Plugin
    constructor: (@element, options) ->
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      # start: Plugin --------
      @autocomplete = new AutoComplete @
      # @autocomplete.setAutoComplete()

  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data(this, "plugin_" + pluginName)
        $.data this, "plugin_" + pluginName, new Plugin(this, options)
