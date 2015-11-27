class Replacer
  constructor: ->
    @loadingNum = 0

    ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\'
    @regexpCode = RegExp ":([^\\s#{ignore}][^#{ignore}]*[^\\s#{ignore}]):|:([^\\s#{ignore}]):", 'g'

  getEmojiTag: (emoji_code) ->
    "<img class='emojidex-emoji' src='#{@plugin.ec.cdn_url}#{@plugin.ec.size_code}/#{emoji_code}.png' title='#{@replaceUnderToSpace emoji_code}'></img>"

  getLoadingTag: (emoji_data, type) ->
    "<div class='emojidex-loading-icon' data-emoji='#{emoji_data}' data-type='#{type}'></div>"

  getLoadingElement: (element) ->
    $ element.find '.emojidex-loading-icon'

  setLoadingTag: (plugin) ->
    plugin.element.find(":not(#{plugin.options.ignore})").andSelf().contents().filter (index, element) =>
      if element.parentElement.tagName isnt 'STYLE' and element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
        replaced_text = @getTextWithLoadingTag element.textContent
        $(element).replaceWith replaced_text if replaced_text isnt element.textContent

  getTextWithLoadingTag: (text) ->
    text_bak = text
    text = text.replace @plugin.options.regexpUtf, (matched_string) =>
      @getLoadingTag matched_string, 'utf'
    text = text.replace @regexpCode, (matched_string, pattern1) =>
      @getLoadingTag matched_string, 'code'
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
          if --@loadingNum is 0
            if @plugin.options.onComplete?
              @plugin.options.onComplete @plugin.element

            if @plugin.options.reloadOnAjax
              @plugin.element.watch
                properties: 'prop_innerText'
                watchChildren: true
                callback: (data, i) =>
                  plugin_data = @plugin.element.data().plugin_emojidexReplace
                  plugin_data.options.useLoadingImg = false
                  plugin_data.options.reloadOnAjax = false
                  plugin_data.replacer.loadEmoji()

      else
        @loadingNum--

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'

  replaceUnderToSpace: (string) ->
    string.replace /_/g, ' '
