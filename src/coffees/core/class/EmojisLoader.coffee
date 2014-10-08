class EmojisLoader
  emojis_data: null
  element: null
  options: null
  emoji_regexps: null

  getCategorizedData: (emojis_data) ->
    new_emojis_data = {}
    for emoji in emojis_data

      if emoji.category is null
        unless new_emojis_data.uncategorized? 
          new_emojis_data.uncategorized = [emoji]
        else
          new_emojis_data.uncategorized.push emoji

      else
        unless new_emojis_data[emoji.category]? 
          new_emojis_data[emoji.category] = [emoji]
        else
          new_emojis_data[emoji.category].push emoji

    return new_emojis_data

  setEmojiCSS_getEmojiRegexps: (emojis_data) ->
    regexp_for_utf = ""
    regexp_for_code = ":("

    emojis_css = $('<style type="text/css" />')
    for category of emojis_data
      emojis_in_category = emojis_data[category]
      for emoji in emojis_in_category
        regexp_for_utf += emoji.moji + "|"
        regexp_for_code += emoji.code + "|"
        emojis_css.append "i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}"
    $("head").append emojis_css
    
    return utf: regexp_for_utf.slice(0, -1), code: regexp_for_code.slice(0, -1) + "):"

  getEmojiTag: (emoji_code) ->
    return '<i class="emojidex-' + emoji_code + '"></i>'
  
  replaceForUTF: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string) ->
      for category of options.emojis_data
        for emoji in options.emojis_data[category]
          if emoji.moji is matched_string
            return EmojisLoader::getEmojiTag emoji.code
  
  replaceForCode: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string) ->
      matched_string = matched_string.replace /:/g, ""
      for category of options.emojis_data
        for emoji in options.emojis_data[category]
          if emoji.code is matched_string
            return EmojisLoader::getEmojiTag emoji.code

  setEmojiIcon: (loader) ->
    $(@element).find(":not(iframe,textarea,script)").andSelf().contents().filter(->
      @nodeType is Node.TEXT_NODE
    ).each ->
      replaced_string = @textContent
      replaced_string = EmojisLoader::replaceForUTF s_replace: replaced_string, regexp: loader.emoji_regexps.utf, emojis_data: loader.emojis_data if loader.emoji_regexps.utf?
      replaced_string = EmojisLoader::replaceForCode s_replace: replaced_string, regexp: loader.emoji_regexps.code, emojis_data: loader.emojis_data if loader.emoji_regexps.code?
      $(@).replaceWith replaced_string
