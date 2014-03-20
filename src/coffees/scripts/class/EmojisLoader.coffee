class EmojisLoader
  emojis_data: null
  element: null
  options: null

  loadedEmojisData: (emojis_data)->
    console.log emojis_data

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
        emojis_css.append "i.emojidex-" + emoji.moji + " {background-image: url('" + emoji.img_url + "')}"
    $("head").append emojis_css
    
    return [regexp_for_utf.slice(0, -1), regexp_for_code.slice(0, -1) + "):"]

  setEmojiIcon: (emojis_data) ->
    getEmojiTag = (emoji_utf) ->
      return '<i class="emojidex-' + emoji_utf + '"></i>'
    
    replaceForUTF = (replaced_string) =>
      replaced_string = replaced_string.replace new RegExp(@emoji_regexps[0], "g"), (matched_string) ->
        return getEmojiTag matched_string
    
    replaceForCode = (replaced_string, emojis_data) =>
      replaced_string = replaced_string.replace new RegExp(@emoji_regexps[1], "g"), (matched_string) ->
        matched_string = matched_string.replace /:/g, ""
        for category of emojis_data
          for emoji in emojis_data[category]
            if emoji.code is matched_string
              return getEmojiTag emoji.moji

    # start main --------
    $(@element).find(":not(iframe,textarea,script)").andSelf().contents().filter(->
      @nodeType is Node.TEXT_NODE
    ).each ->
      replaced_string = @textContent
      replaced_string = replaceForUTF replaced_string
      replaced_string = replaceForCode replaced_string, emojis_data
      $(@).replaceWith replaced_string
