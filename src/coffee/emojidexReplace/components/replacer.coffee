class Replacer
  emoji_data: null
  element: null
  options: null
  emoji_regexps: null

  getCategorizedData: (emoji_data) ->
    new_emoji_data = {}
    for emoji in emoji_data

      if emoji.category is null
        unless new_emoji_data.uncategorized?
          new_emoji_data.uncategorized = [emoji]
        else
          new_emoji_data.uncategorized.push emoji

      else
        unless new_emoji_data[emoji.category]?
          new_emoji_data[emoji.category] = [emoji]
        else
          new_emoji_data[emoji.category].push emoji

    return new_emoji_data

  setEmojiCSS_getEmojiRegexps: (emoji_data) ->
    regexp_for_utf = ""
    regexp_for_code = ":("
    emoji_css = $('<style type="text/css" />')
    for category of emoji_data
      emoji_in_category = emoji_data[category]
      for emoji in emoji_in_category
        regexp_for_utf += emoji.moji + "|" if emoji.moji?
        regexp_for_code += emoji.code + "|"  if emoji.code?
        emoji_css.append "i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}"
    $("head").append emoji_css

    return utf: regexp_for_utf.slice(0, -1), code: regexp_for_code.slice(0, -1) + "):"

  getEmojiTag: (emoji_code) ->
    return '<i class="emojidex-' + emoji_code + '"></i>'

  replaceForUTF: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string) =>
      for category of options.emoji_data
        for emoji in options.emoji_data[category]
          if emoji.moji is matched_string
            return @getEmojiTag emoji.code

  replaceForCode: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string, pattern1) =>
      matched_string = pattern1
      for category of options.emoji_data
        for emoji in options.emoji_data[category]
          if emoji.code is matched_string
            return @getEmojiTag emoji.code

  setEmojiIcon: (loader) ->
    text_nodes = $(@element_clone).find(":not(iframe,textarea,script)").andSelf().contents().filter ->
      @nodeType is Node.TEXT_NODE
    for text_node in text_nodes
      replaced_string = text_node.textContent
      replaced_string = @replaceForUTF s_replace: replaced_string, regexp: loader.emoji_regexps.utf, emoji_data: loader.emoji_data if loader.emoji_regexps.utf?
      replaced_string = @replaceForCode s_replace: replaced_string, regexp: loader.emoji_regexps.code, emoji_data: loader.emoji_data if loader.emoji_regexps.code?
      $(text_node).replaceWith replaced_string
    @element.replaceWith @element_clone
    @element = @element_clone
