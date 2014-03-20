###
emojidex coffee plugin for jQuery/Zepto and compatible

=LICENSE=
When used with the emojidex service enabled this library is
  licensed under:
  * LGPL[https://www.gnu.org/licenses/lgpl.html].
When modified to not use the emojidex service this library is
  dual licensed under:
  * GPL v3[https://www.gnu.org/licenses/gpl.html]
  * AGPL v3[https://www.gnu.org/licenses/agpl.html]

The
Copyright 2013 Genshin Souzou Kabushiki Kaisha
###

do ($ = jQuery, window, document) ->
  pluginName = "emojidex"
  defaults =
    emojiarea:
      plaintext: "emojidex-plaintext"
      wysiwyg: "emojidex-wysiwyg"
      value_output: "emojidex-rawtext"

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

      @setEmojiarea @options
      $.emojiarea.path = options.path_img
      
      @poe_emojis = new EmojisLoaderPOE @element, @options
      @poe_emojis.load =>
        @emojis_data_array.push @poe_emojis.emojis_data
        @setAutoComplete @options

      @api_emojis = new EmojisLoaderAPI
      @api_emojis.load =>
        @emojis_data_array.push @api_emojis.emojis_data
        @setAutoComplete @options

    setAutoComplete: (options) ->
      if @emojis_data_array.length is 2  
        emojis = []
        for emojis_data in @emojis_data_array
          for category of emojis_data
            for emoji in emojis_data[category]
              emojis.push
                key: emoji.code
                name: emoji.code
                img_url: emoji.img_url
        
        emoji_config =
          at: ":"
          data: emojis
          tpl: "<li data-value=':${key}:'><img src='${img_url}' height='20' width='20' /> ${name}</li>"
          insert_tpl: "<img src='${img_url}' height='20' width='20' />"
        options.emojiarea["plaintext"].atwho(emoji_config)
        options.emojiarea["wysiwyg"].atwho(emoji_config)

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        options.emojiarea["value_output"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"
