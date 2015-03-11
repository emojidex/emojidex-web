class Replacer
  loadingNum: undefined
  regexpCode: /:([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]+):/g

  getEmojiTag: (emoji_code) ->
    "<img
      class='emojidex-emoji'
      src='#{@plugin.ec.cdn_url}#{@plugin.ec.size_code}/#{emoji_code}.png'
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
    text = text.replace @regexpCode, (matched_string, pattern1) =>
      @getLoadingTag matched_string, 'code'
    text = text.replace @plugin.options.regexpUtf, (matched_string) =>
      @getLoadingTag matched_string, 'utf'
    return text

  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji_code, match = true) ->
    emoji_tag = undefined
    if match
      emoji_tag = $(@getEmojiTag emoji_code).hide()
    else
      emoji_tag = emoji_code

    element.fadeOut "normal", =>
      element.after emoji_tag
      element.remove()
      if match
        emoji_tag.fadeIn "fast", =>
          if --@loadingNum is 0 && @plugin.options.onComplete?
            @plugin.options.onComplete @plugin.element

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'

  replaceUnderToSpace: (string) ->
    string.replace /_/g, ' '
