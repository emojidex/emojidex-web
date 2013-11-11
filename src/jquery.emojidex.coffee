# emojidex coffee plugin for jQuery/Zepto and compatible
#
# =LICENSE=
# When used with the emojidex service enabled this library is
#   licensed under the LGPL[https://www.gnu.org/licenses/lgpl.html].
# When modified to not use the emojidex service this library is
#   dual licensed under
#   GPL v3[https://www.gnu.org/licenses/gpl.html]
#   AGPL v3[https://www.gnu.org/licenses/agpl.html]
# 
# The
# Copyright 2013 Genshin Souzou Kabushiki Kaisha

do ($ = jQuery, window, document) ->

  pluginName = "emojidex"
  defaults = {}
  class Plugin
    constructor: (@element, options) ->
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @loadEmojidexJSON(@element, @options)
      @setEmojiarea(@options)

    loadEmojidexJSON: (element, options) ->
      $.emojiarea.path = options.path_img
      $.getJSON options.path_json, (emojis_data) ->
        $.emojiarea.icons = emojis_data
        Plugin.prototype.setEmojiIconForUTF emojis_data, element
        Plugin.prototype.setEmojiIconForCode emojis_data, element

    setEmojiIconForUTF: (emojis_data, element) ->
      # $.each $(element), (i, target) ->
      #   replaced = ""
      #   for category of emojis_data
      #     console.dir(category)
      #     emojis_in_category = emojis_data[category]
      #     for emoji of emojis_in_category
      #       console.dir emoji

    setEmojiIconForCode: (emojis_data, element) ->
      path = $.emojiarea.path or ""
      path += "/"  if path.length and path.charAt(path.length - 1) isnt "/"
      $.each $(element), (i, target) ->
        replaced_html = target.innerHTML.replace(/:[\-\w]+:/g, (matched_string) ->
          img_tag = ""
          for category of emojis_data
            emojis_in_category = emojis_data[category]
            for emoji in emojis_in_category
              matched_string = matched_string.replace(/:/g, "")
              if emoji.name is matched_string
                img_tag = "<img src=\"" + path + matched_string + ".svg\" alt=\"" + matched_string + "\">"
                break

          return img_tag
        )
        $(target).empty().append replaced_html

    Plugin::setEmojiarea = (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      options.emojiarea["wysiwyg"].emojiarea(wysiwyg: true)
      
      options.emojiarea["wysiwyg"].on "change", ->
        options.emojiarea["value_output"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))
