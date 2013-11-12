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
      $.each $(element), (i, target) ->
        replaced_html = target.innerHTML
        for category of emojis_data
          emojis_in_category = emojis_data[category]
          for emoji in emojis_in_category
            pattern = new RegExp(emoji.moji, "g")
            replaced_html = replaced_html.replace pattern, (matched_string) ->
              return '<img src="' + $.emojiarea.path + emoji.name + '.svg" alt="' + emoji.name + '"></img>'
        target.innerHTML = replaced_html

    setEmojiIconForCode: (emojis_data, element) ->
      $.each $(element), (i, target) ->
        replaced_html = target.innerHTML.replace /:[\-\w]+:/g, (matched_string) ->
          retrun_string = matched_string
          for category of emojis_data
            emojis_in_category = emojis_data[category]
            for emoji in emojis_in_category
              matched_string = matched_string.replace(/:/g, "")
              if emoji.name is matched_string
                retrun_string = '<img src="' + $.emojiarea.path + matched_string + '.svg" alt="' + matched_string + '"></img>'
                break
          return retrun_string
        target.innerHTML = replaced_html

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
