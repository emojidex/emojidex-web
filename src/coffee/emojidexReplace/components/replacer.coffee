class Replacer
  getEmojiTag: (emoji_code) ->
    "<img
      class='emojidex-emoji'
      src='#{@plugin.options.cdnURL}/#{@plugin.options.sizeCode}/#{emoji_code}.png'
      title='#{emoji_code.replace /_/g, ' '}'
    ></img>"

  getLoadingTag: (emoji_data, type) ->
    "<img
      class='emojidex-loading-icon'
      data-emoji='#{emoji_data}'
      data-type='#{type}'
    ></img>"

  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji_code, matched = true) ->
    if matched
      emoji_tag = $(@getEmojiTag emoji_code).hide()
    else
      emoji_tag = $(emoji_code).hide()

    element.after(emoji_tag).fadeOut "normal", ->
      emoji_tag.fadeIn "fast"
