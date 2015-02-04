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
      regexp_for_utf += emoji.moji + "|" if emoji.moji?
      regexp_for_code += emoji.code + "|"  if emoji.code?
      emoji_css.append "i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}"

    $("head").append emoji_css

    return utf: regexp_for_utf.slice(0, -1), code: regexp_for_code.slice(0, -1) + "):"

  getEmojiTag: (emoji_code) ->
    return '<i class="emojidex-' + emoji_code + '"></i>'

  replaceForUTF: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string) =>
      for emoji in options.emoji_data
        if emoji.moji is matched_string
          return @getEmojiTag emoji.code

  replaceForCode: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string, pattern1) =>
      for emoji in options.emoji_data
        if emoji.code is pattern1
          return @getEmojiTag emoji.code

  setEmojiIcon: (loader, options) ->
    replaceTextNode = (element) =>
      text_nodes = $(element).find(":not(iframe,textarea,script)").andSelf().contents().filter ->
        @nodeType is Node.TEXT_NODE
      for text_node in text_nodes
        replaced_string = text_node.textContent
        replaced_string = @replaceForUTF s_replace: replaced_string, regexp: loader.emoji_regexps.utf, emoji_data: loader.emoji_data if loader.emoji_regexps.utf?
        replaced_string = @replaceForCode s_replace: replaced_string, regexp: loader.emoji_regexps.code, emoji_data: loader.emoji_data if loader.emoji_regexps.code?
        $(text_node).replaceWith replaced_string

    if options.loadingIcon?
      replaceTextNode @element_clone

      num = 0
      @element.find(".emojidex-loading-icon").fadeOut "normal", =>
        if num is @element.find(".emojidex-loading-icon").length - 1
          @element_clone.find('i[class*="emojidex-"]').hide()
          @element.replaceWith @element_clone
          @element_clone.find('i[class*="emojidex-"]').fadeIn "fast"

          @element = @element_clone

          options.onComplete @element if options.onComplete?
        else
          num++
    else
      replaceTextNode @element
