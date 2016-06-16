class Replacer
  constructor: ->
    @promiseWaitTime = 5000

    ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\'
    @regexpCode = RegExp ":([^\\s#{ignore}][^#{ignore}]*[^\\s#{ignore}]):|:([^\\s#{ignore}]):", 'g'

  getEmojiTag: (emoji_code) ->
    "<img class='emojidex-emoji' src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{emoji_code}.png' title='#{@replaceUnderToSpace emoji_code}'></img>"

  getLoadingTag: (emoji_data, type) ->
    "<div class='emojidex-loading-icon' data-emoji='#{emoji_data}' data-type='#{type}'></div>"

  getLoadingElement: (element) ->
    $ element.find '.emojidex-loading-icon'

  setLoadingTag: (plugin) ->
    return new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: setLoadingTag - Timeout')
      , @promiseWaitTime

      checkReplaceComplete = =>
        if targets.length is ++complete_num
          resolve()

      complete_num = 0
      targets = []
      plugin.element.find(":not(#{plugin.options.ignore})").andSelf().contents().filter (index, element) =>
        if element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
          targets.push element
      for target in targets
        @getTextWithLoadingTag(target).then (data) ->
          $(data.element).replaceWith data.text
          checkReplaceComplete()

  getTextWithLoadingTag: (target_element) ->
    replaced_text = target_element.textContent.replace @plugin.options.regexpUtf, (matched_string) =>
      @getLoadingTag matched_string, 'utf'

    new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: getTextWithLoadingTag - Timeout')
      , @promiseWaitTime

      checkReplaceEnd = () =>
        if matched_codes.length is ++replaced_num
          resolve
            element: target_element
            text: replaced_text

      replaced_num = 0
      matched_codes = replaced_text.match @regexpCode
      if matched_codes.length
        for code in matched_codes
          code_only = code.replace /\:/g, ''
          emoji_image = $("<img src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{@replaceSpaceToUnder code_only}.png' data-code='#{code_only}'></img>")
          emoji_image.load (e) =>
            replaced_text = replaced_text.replace ":#{e.currentTarget.dataset.code}:", @getLoadingTag e.currentTarget.dataset.code, 'code'
            checkReplaceEnd()
          emoji_image.error (e) =>
            checkReplaceEnd()
      else
        resolve
          element: target_element
          text: replaced_text


  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji_code, match = true) ->
    emoji_tag = undefined
    if match
      emoji_tag = $(@getEmojiTag emoji_code).hide()
    else
      emoji_tag = emoji_code

    return new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: fadeOutLoadingTag_fadeInEmojiTag - Timeout')
      , @promiseWaitTime

      element.fadeOut
        duration: 'normal'
        done: =>
          element.after emoji_tag
          element.remove()
          if match
            emoji_tag.fadeIn
              duration: "fast"
              done: =>
                resolve()
          else
            resolve()

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'

  replaceUnderToSpace: (string) ->
    string.replace /_/g, ' '
