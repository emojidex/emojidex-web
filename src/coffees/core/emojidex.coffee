###
emojidex coffee plugin for jQuery/Zepto and compatible

=LICENSE=
Licensed under the emojidex Open License
https://www.emojidex.com/emojidex/emojidex_open_license

Copyright 2013 Genshin Souzou Kabushiki Kaisha
###

do ($ = jQuery, window, document) ->
  pluginName = "emojidex"
  defaults =
    emojiarea:
      plain_text: ".emojidex-plain_text"
      content_editable: ".emojidex-content_editable"

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))

  class Plugin
    constructor: (@element, options) ->
      @emojis_data_array = []

      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @api_emojis = new EmojisLoaderAPI @element, @options
      @api_emojis.load =>
        @emojis_data_array.push @api_emojis.emojis_data
        @checkLoadedEmojisData()

    checkLoadedEmojisData: ->
      if @emojis_data_array
        @setAutoComplete @options

        # @emojis_pallet = new EmojisPallet @emojis_data_array, $("#ep"), @options
        # @emojis_pallet.setPallet()

    setAutoComplete: (options) ->
      emojis = []
      for emojis_data in @emojis_data_array
        for category of emojis_data
          for emoji in emojis_data[category]
            emojis.push
              code: emoji.code
              img_url: emoji.img_url

      testCallback = (data)->
        console.log 111

      at_config =
        callback: testCallback
        at: ":"
        limit: 10
        search_key: "code"
        data: emojis
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        insert_tpl: "<img src='${img_url}' height='20' width='20' />"
      $(options.emojiarea["plain_text"]).atwho(at_config)
      $(options.emojiarea["content_editable"]).atwho(at_config)

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        console.dir @
        # console.dir options.emojiarea["rawtext"].text
        options.emojiarea["rawtext"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"
