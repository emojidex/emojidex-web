# emojidex replace
#
# =LICENSE=
# Licensed under the emojidex Open License
# https://www.emojidex.com/emojidex/emojidex_open_license
#
# Copyright 2013 Genshin Souzou Kabushiki Kaisha

do ($ = jQuery, window, document) ->
  pluginName = "emojidex-replacer"
  defaults =
    user: [
      'emoji'
      'emojidex'
    ]

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))

  class Plugin
    constructor: (@element, options) ->
      @emoji_data_array = []

      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @api_emoji = new EmojiReplacerService @element, @options
      @api_emoji.replace()