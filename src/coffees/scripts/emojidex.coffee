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
      # start main --------
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @setEmojiarea @options
      $.emojiarea.path = options.path_img
      
      @poe_emojis = new EmojisLoaderPOE @element, @options
      @poe_emojis.load (backed_obj)->
        # console.log loaded.emojis_data

      @api_emojis = new EmojisLoaderAPI
      @api_emojis.load (backed_obj)=>
        # console.log 333
        # console.log @api_emojis

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        options.emojiarea["value_output"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"

    prepareAutoComplete: (emojis_data, options) ->
      emojis = []
      for category of emojis_data
        for emoji in emojis_data[category]
          emojis.push emoji.code
      emojis = $.map emojis, (value) ->
        key: value
        name: value

      emoji_config =
        at: ":"
        data: emojis
        tpl: "<li data-value=':${key}:'><img src='../src/assets/img/utf/${name}.svg'  height='20' width='20' /> ${name}</li>"
        insert_tpl: "<img src='../src/assets/img/utf/${name}.svg' height='20' width='20' />"
      options.emojiarea["plaintext"].atwho(emoji_config)
      options.emojiarea["wysiwyg"].atwho(emoji_config)
