class Replacer
  emoji_data: null
  element: null
  options: null
  emoji_regexps: null

  setEmojiCSS_getEmojiRegexps: (emoji_data) ->
    regexp_for_utf = ""
    regexp_for_code = ":("
    emoji_css = $('<style type="text/css" />')

    for emoji in emoji_data
      if emoji.moji?
        regexp_for_utf += emoji.moji + "|"
        emoji_css.append "i.emojidex-" + emoji.moji + " {background-image: url('" + emoji.img_url + "')}"
      if emoji.code?
        regexp_for_code += emoji.code + "|"
        emoji_css.append "i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}"

    $("head").append emoji_css

    return utf: regexp_for_utf.slice(0, -1), code: regexp_for_code.slice(0, -1) + "):"

  getEmojiTag: (emoji_code) ->
    return '<i class="emojidex-' + emoji_code + '"></i>'

  replaceForUTF: (options) ->
    replaced_string = options.text.replace RegExp(options.regexp, "g"), (matched_string) =>
      for emoji in options.emoji_data
        if emoji.moji is matched_string
          return @getEmojiTag emoji.code

  replaceForCode: (options) ->
    replaced_string = options.text.replace RegExp(options.regexp, "g"), (matched_string, pattern1) =>
      for emoji in options.emoji_data
        if emoji.code is pattern1
          return @getEmojiTag emoji.code


  setEmojiIcon: (loader) ->
    replaceLoadingIcon = (options) =>
      replaceUseFade = (element, new_element) ->
        element.after new_element.hide()
        element.fadeOut "normal", ->
          new_element.fadeIn "fast"

      for element in options.loading_elements
        new_element = ""
        switch element.dataset.type
          when 'utf'
            new_element = element.dataset.emoji.replace RegExp(options.regexp_utf), (matched_string) =>
              @getEmojiTag matched_string
          when 'code'
            new_element = element.dataset.emoji.replace RegExp(options.regexp_code), (matched_string, pattern1) =>
              @getEmojiTag pattern1

        if new_element.indexOf("<i class=") isnt -1
          replaceUseFade $(element), $(new_element)
        else
          $(element).replaceWith new_element

      loader.options.onComplete? @element

    replaceTextNode = (element) =>
      text_nodes = $(element).find(":not(iframe,textarea,script)").andSelf().contents().filter ->
        @nodeType is Node.TEXT_NODE
      for text_node in text_nodes
        replaced_string = text_node.textContent

        if loader.emoji_regexps.utf?
          replaced_string = @replaceForUTF
            text: replaced_string
            regexp: loader.emoji_regexps.utf
            emoji_data: loader.emoji_data

        if loader.emoji_regexps.code?
          replaced_string = @replaceForCode
            text: replaced_string
            regexp: loader.emoji_regexps.code
            emoji_data: loader.emoji_data

        $(text_node).replaceWith replaced_string

      loader.options.onComplete? @element

    # start setEmojiIcon --------
    if loader.options.loadingIcon
      loading_elements = @element.find ".emojidex-loading-icon"
      replaceLoadingIcon
        loading_elements: loading_elements
        regexp_utf: loader.emoji_regexps.utf
        regexp_code: loader.emoji_regexps.code
    else
      replaceTextNode @element
