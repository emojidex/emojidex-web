class Replacer
  loadingNum: undefined

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

  getLoadingElement: (element) ->
    $ element.find '.emojidex-loading-icon'

  setLoadingTag: (plugin) ->
    plugin.element.find(":not(iframe,textarea,script)").andSelf().contents().filter (index, element) =>
      $(element).replaceWith @getTextWithLoadingTag element.textContent if element.nodeType is Node.TEXT_NODE

  getTextWithLoadingTag: (text) ->
    text = text.replace RegExp(@plugin.options.regexpUTF, "g"), (matched_string) =>
      @getLoadingTag matched_string, 'utf'
    text = text.replace /:([^:]+):/g, (matched_string, pattern1) =>
      @getLoadingTag matched_string, 'code'

  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji_code, match = true) ->
    if match
      emoji_tag = $(@getEmojiTag emoji_code).hide()
    else
      emoji_tag = $(emoji_code).hide()

    element.after(emoji_tag).fadeOut "normal", =>
      emoji_tag.fadeIn "fast"
      if --@loadingNum is 0 && @plugin.options.onComplete?
        @plugin.options.onComplete @plugin.element

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'