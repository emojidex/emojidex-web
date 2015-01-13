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
      @emoji_data_array = []

      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @api_emoji = new EmojiLoaderService @element, @options
      @api_emoji.load =>
        @emoji_data_array.push @api_emoji.emoji_data
        @checkLoadedEmojiData()

    checkLoadedEmojiData: ->
      if @emoji_data_array
        @setAutoComplete @options

        # @emoji_pallet = new EmojiPallet @emoji_data_array, $("#ep"), @options
        # @emoji_pallet.setPallet()

    setAutoComplete: (options) ->

      setAtwho = (at_options) ->
        targets = [
          options.emojiarea["plain_text"]
          options.emojiarea["content_editable"]
        ]

        for target in targets
          target.atwho(at_options).on('matched.atwho', (e)->
            console.log "matched ------"
            console.dir e
          )

      setSearchedEmojiData = (match) ->
        flag_refresh = 0
        ec.search(match, (response) ->
          ecs = ec.simplify()
          for emoji in ecs
            emoji.code = emoji.code.replace RegExp(" ", "g"), "_"
            emoji.img_url = emoji.img_url.replace RegExp(" ", "g"), "_"

          console.log ecs
          flag_refresh = 1
          setAtwho
            at: ":"
            data: ecs
        )
        console.dir @
        console.log "flag ----"
        console.log flag_refresh

        return null

      ec = new EmojidexClient

      atwho_emoji_data = []
      for emoji_data in @emoji_data_array
        for category of emoji_data
          for moji in emoji_data[category]
            atwho_emoji_data.push
              code: moji.code
              img_url: moji.img_url

      at_init =
        at: ":"
        limit: 10
        search_key: "code"
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        insert_tpl: "<img src='${img_url}' height='20' width='20' />"
        # data: atwho_emoji_data
        callbacks:
          matcher: (flag, subtext, should_startWithSpace) ->
            console.dir @
            flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            flag = '(?:^|\\s)' + flag if should_startWithSpace
            # À
            _a = decodeURI("%C3%80")
            # ÿ
            _y = decodeURI("%C3%BF")
            regexp = new RegExp "#{flag}([A-Za-z#{_a}-#{_y}0-9_\+\-]*)$|#{flag}([^\\x00-\\xff]*)$",'gi'
            match = regexp.exec subtext
            match = if match then match[2] || match[1] else null
            setSearchedEmojiData(match)

      setAtwho(at_init)

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        console.dir @
        # console.dir options.emojiarea["rawtext"].text
        options.emojiarea["rawtext"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"
