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

			# exec functions
			@loadEmojidexJSON(@element, @options)
			@setEmojiarea(@options)

		loadEmojidexJSON: (element, options) ->
			$.emojiarea.path = options.path_emoji_img
			$.getJSON options.path_emoji_json, (emoji) ->
				Plugin.prototype.setEmojiIcon(emoji, element)

		setEmojiIcon: (emoji, element) ->
			$.emojiarea.icons = emoji
			$.each $(element), (i, target) ->
				replaced_html = target.innerHTML.replace(/:[\-\w]+:/g, (matched_string) ->
					replaced = matched_string
					for category of $.emojiarea.icons
						emojis = $.emojiarea.icons[category]
						i = 0
						while i < emojis.length
							matched_string = matched_string.replace(/:/g, "")
							if emojis[i].name is matched_string
								path = $.emojiarea.path or ""
								path += "/"  if path.length and path.charAt(path.length - 1) isnt "/"
								replaced = "<img src=\"" + path + matched_string + ".svg\" alt=\"" + matched_string + "\">"
								break
							i++
					return replaced
				)
				$(target).empty().append replaced_html

		Plugin::setEmojiarea = (options) ->
			$wysiwyg = $(options.emojiarea["emojiarea_wysing"].selector).emojiarea(wysiwyg: true)
			$wysiwyg_value = $(options.emojiarea["emojiarea_output_value"].selector)
			$(options.emojiarea["emojiarea_planeText"].selector).emojiarea wysiwyg: false
			$wysiwyg.on "change", ->
				$wysiwyg_value.text $(this).val()

			$wysiwyg.trigger "change"


	$.fn[pluginName] = (options) ->
		@each ->
			if !$.data(@, "plugin_#{pluginName}")
				$.data(@, "plugin_#{pluginName}", new Plugin(@, options))
