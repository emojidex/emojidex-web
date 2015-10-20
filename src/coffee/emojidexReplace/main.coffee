###
* emojidexReplace
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
  pluginName = "emojidexReplace"
  defaults =
    onComplete: undefined
    useLoadingImg: true
    useUserEmoji: false
    # eg: useUserEmoji --------
    # useUserEmoji: [
    #   'emoji'
    #   'emojidex'
    # ]

  class Plugin
    constructor: (@element, options) ->
      @element = $ @element
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @ec = new EmojidexClient

      if @checkUpdate()
        @options.regexpUtf = RegExp @ec.Data.storage.get('emojidex.regexpUtf'), 'g'
        @options.utfEmojiData = @ec.Data.storage.get 'emojidex.utfEmojiData'
        @replace()
      else
        $.ajax
          url: @ec.api_url + 'moji_codes'
          dataType: 'json'
          success: (response) =>
            @ec.Data.storage.set 'emojidex.utfInfoUpdated', new Date().toString()

            regexp = response.moji_array.join('|')
            @ec.Data.storage.set 'emojidex.regexpUtf', regexp
            @options.regexpUtf = RegExp regexp, 'g'

            @ec.Data.storage.set 'emojidex.utfEmojiData', response.moji_index
            @options.utfEmojiData = response.moji_index

            @replace()

    checkUpdate: ->
      if @ec.Data.storage.isSet 'emojidex.utfInfoUpdated'
        current = new Date
        updated = new Date @ec.Data.storage.get 'emojidex.utfInfoUpdated'
        if current - updated <= 3600000 * 48
          return true
        else
          return false
      else
        return false

    replace: ->
      @replacer = if @options.useUserEmoji then new ReplacerUser @ else new ReplacerSearch @
      @replacer.loadEmoji()

  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data(this, "plugin_" + pluginName)
        $.data this, "plugin_" + pluginName, new Plugin(this, options)
