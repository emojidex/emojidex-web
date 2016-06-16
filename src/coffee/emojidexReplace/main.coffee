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
  pluginName = 'emojidexReplace'
  defaults =
    onComplete: undefined
    useLoadingImg: true
    ignore: 'script, noscript, canvas, style, iframe, input, textarea, pre, code'

    # this option is beta --------
    autoUpdate: false
    updateLimit: 10

  class Plugin
    constructor: (@element, options) ->
      @element = $ @element
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @EC = new EmojidexClient
        onReady: (EC) =>
          if @checkUpdate()
            $.ajax
              url: @EC.api_url + 'moji_codes'
              dataType: 'json'
              success: (response) =>
                regexp = response.moji_array.join('|')
                @options.regexpUtf = RegExp regexp, 'g'
                @options.utfEmojiData = response.moji_index

                @EC.Data.storage.update('emojidex.utfInfoUpdated', new Date().toString()).then( =>
                  return @EC.Data.storage.update 'emojidex.regexpUtf', regexp
                ).then( =>
                  return @EC.Data.storage.update 'emojidex.utfEmojiData', response.moji_index
                ).then =>
                  @replace()
          else
            @options.regexpUtf = RegExp @EC.Data.storage.get('emojidex.regexpUtf'), 'g'
            @options.utfEmojiData = @EC.Data.storage.get 'emojidex.utfEmojiData'
            @replace()

    checkUpdate: ->
      if @EC.Data.storage.isSet 'emojidex.utfInfoUpdated'
        current = new Date
        updated = new Date @EC.Data.storage.get 'emojidex.utfInfoUpdated'
        if current - updated >= 3600000 * 48
          return true
        else
          return false
      else
        return true

    replace: ->
      console.log 'replace START ---'
      @replacer = new ReplacerSearch @
      @replacer.loadEmoji().then =>
        console.log 'replace END ---'
        @options.onComplete? @element
        setTimeout =>
          @replace()
        , 3000

  $.fn[pluginName] = (options) ->
    @each ->
      unless $.data @, "plugin_#{pluginName}"
        $.data @, "plugin_#{pluginName}", new Plugin @, options
