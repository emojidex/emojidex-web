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
          target.atwho(at_options).on('reposition.atwho', (e) ->
            $(e.currentTarget).atwho(at_options)
          ).on('hidden.atwho', (e) ->
            $(e.currentTarget).atwho(at_options)
          )

      setSearchedEmojiData = (at_obj, match_string) ->
        updateAtwho = (searched_data)->
          at_options =
            data: searched_data
            callbacks:
              matcher: (flag, subtext, should_startWithSpace) ->
                flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                flag = '(?:^|\\s)' + flag if should_startWithSpace
                # À
                _a = decodeURI("%C3%80")
                # ÿ
                _y = decodeURI("%C3%BF")
                regexp = new RegExp "#{flag}([A-Za-z#{_a}-#{_y}0-9_\+\-]*)$|#{flag}([^\\x00-\\xff]*)$",'gi'
                match = regexp.exec subtext
                match = if match then match[2] || match[1] else null

          at_obj.$inputor.atwho('destroy')
          at_obj.$inputor.atwho($.extend {}, at_obj.setting, at_options).atwho('run')

        # start: setSearchedEmojiData --------
        num = ++searching_num
        ec.search(match_string, (response) ->
          searched_data = ec.simplify()
          for emoji in searched_data
            emoji.code = emoji.code.replace RegExp(" ", "g"), "_"
            emoji.img_url = emoji.img_url.replace RegExp(" ", "g"), "_"

          if searching_num == num
            updateAtwho(searched_data) if searched_data.length
        )
        return match_string

      # start: setAutoComplete --------
      ec = new EmojidexClient
      searching_num = 0
      at_init =
        at: ":"
        limit: 10
        search_key: "code"
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        insert_tpl: "<img src='${img_url}' height='20' width='20' />"
        callbacks:
          matcher: (flag, subtext, should_startWithSpace) ->
            flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            flag = '(?:^|\\s)' + flag if should_startWithSpace
            # À
            _a = decodeURI("%C3%80")
            # ÿ
            _y = decodeURI("%C3%BF")
            regexp = new RegExp "#{flag}([A-Za-z#{_a}-#{_y}0-9_\+\-]*)$|#{flag}([^\\x00-\\xff]*)$",'gi'
            match = regexp.exec subtext
            match = if match then match[2] || match[1] else null
            setSearchedEmojiData(@, match) if match
      atwho_emoji_data = []

      for emoji_data in @emoji_data_array
        for category of emoji_data
          for moji in emoji_data[category]
            atwho_emoji_data.push
              code: moji.code
              img_url: moji.img_url

      setAtwho(at_init)

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        # console.dir @
        # console.dir options.emojiarea["rawtext"].text
        options.emojiarea["rawtext"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"
