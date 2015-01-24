# emojidexReplace
#
# =LICENSE=
# Licensed under the emojidex Open License
# https://www.emojidex.com/emojidex/emojidex_open_license
#
# Copyright 2013 Genshin Souzou Kabushiki Kaisha

do ($ = jQuery, window, document) ->
  pluginName = "emojidexReplace"
  defaults =
    userNames: [
      'emoji'
      'emojidex'
    ]

  class Plugin
    constructor: (@element, options) ->
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      # start: Plugin --------
      @api_emoji_replacer = new ReplacerService @element, @options
      @api_emoji_replacer.replace()

  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data(this, "plugin_" + pluginName)
        $.data this, "plugin_" + pluginName, new Plugin(this, options)
