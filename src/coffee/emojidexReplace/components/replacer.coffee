class Replacer
  loadingNum: undefined

  getEmojiTag: (emoji_code) ->
    "<img
      class='emojidex-emoji'
      src='#{@plugin.options.cdnURL}/#{@plugin.options.sizeCode}/#{emoji_code}.png'
      title='#{@replaceUnderToSpace emoji_code}'
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
      if element.nodeType is Node.TEXT_NODE and element.textContent.match /\S/
        $(element).replaceWith @getTextWithLoadingTag element.textContent

  getTextWithLoadingTag: (text) ->
    text = text.replace /:([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]+):/g, (matched_string, pattern1) =>
      @getLoadingTag matched_string, 'code'
    text = text.replace @plugin.options.regexpUTF, (matched_string) =>
      @getLoadingTag matched_string, 'utf'
    return text

  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji_code, match = true) ->
    if match
      emoji_tag = $(@getEmojiTag emoji_code).hide()
    else
      emoji_tag = $(emoji_code).hide()

    element.after(emoji_tag).fadeOut "normal", =>
      emoji_tag.fadeIn "fast", =>
        if --@loadingNum is 0 && @plugin.options.onComplete?
          @plugin.options.onComplete @plugin.element

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'

  replaceUnderToSpace: (string) ->
    string.replace /_/g, ' '
