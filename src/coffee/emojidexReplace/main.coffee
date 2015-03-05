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

    useUserEmoji: false
    userNames: [
      'emoji'
      'emojidex'
    ]

  class Plugin
    constructor: (@element, options) ->
      @element = $ @element
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @ec = new EmojidexClient

      if @ec.Data.storage.get('emojidex.regexpUTF') and @ec.Data.storage.get('emojidex.utfEmojiData')
        @options.regexpUTF = RegExp @ec.Data.storage.get('emojidex.regexpUTF'), 'g'
        @options.utfEmojiData = @ec.Data.storage.get 'emojidex.utfEmojiData'
        @replace()
      else
        $.ajax
          url: @ec.api_url + 'moji_codes'
          dataType: 'json'
          success: (response) =>
            @ec.Data.storage.set 'emojidex.utfEmojiData', response.moji_index
            @options.utfEmojiData = response.moji_index

            regexp = response.moji_array.join('|')
            @ec.Data.storage.set 'emojidex.regexpUTF', regexp
            @options.regexpUTF = RegExp regexp, 'g'
            @replace()

    replace: ->
      @replacer = if @options.useUserEmoji then new ReplacerUser @ else new ReplacerSearch @
      @replacer.loadEmoji()

  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data(this, "plugin_" + pluginName)
        $.data this, "plugin_" + pluginName, new Plugin(this, options)
