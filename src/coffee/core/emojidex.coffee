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
      emoji = []
      for emoji_data in @emoji_data_array
        for category of emoji_data
          for moji in emoji_data[category]
            emoji.push
              code: moji.code
              img_url: moji.img_url

      test1 = [
        {code: "aaa", img_url: "https://diuxa3neisbs9.cloudfront.net/emoji/px128/%E5%AD%A6%E5%90%9B.png?1420689357"}
      ]
      test2 = [
        {code: "bbb", img_url: "https://diuxa3neisbs9.cloudfront.net/emoji/px128/%E5%AD%A6%E5%90%9B.png?1420689357"}
      ]

      console.log "emoji --------"
      console.dir emoji

      testCallback = (data)->
        console.log 111
        console.log data

      at_config =
        callbacks:
          matcher: (flag, subtext, should_startWithSpace) ->
            console.log "matcher --------"
            flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            flag = '(?:^|\\s)' + flag if should_startWithSpace
            # À
            _a = decodeURI("%C3%80")
            # ÿ
            _y = decodeURI("%C3%BF")
            regexp = new RegExp "#{flag}([A-Za-z#{_a}-#{_y}0-9_\+\-]*)$|#{flag}([^\\x00-\\xff]*)$",'gi'
            match = regexp.exec subtext
            console.log if match then match[2] || match[1] else null
            if match then match[2] || match[1] else null

          filter: (query, data, searchKey) ->
            console.log "filter --------"
            # !!null #=> false; !!undefined #=> false; !!'' #=> false;
            _results = []
            for item in data
              _results.push item if ~new String(item[searchKey]).toLowerCase().indexOf query.toLowerCase()
            _results

        at: ":"
        limit: 10
        search_key: "code"
        data: test1
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        insert_tpl: "<img src='${img_url}' height='20' width='20' />"

      $(options.emojiarea["plain_text"]).atwho(at_config).atwho(
        search_key: "code"
        at: "@"
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        data: test2
      )
      $(options.emojiarea["content_editable"]).atwho(at_config)

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        console.dir @
        # console.dir options.emojiarea["rawtext"].text
        options.emojiarea["rawtext"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"
