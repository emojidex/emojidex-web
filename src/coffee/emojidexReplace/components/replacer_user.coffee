class ReplacerUser extends Replacer
  constructor: (@plugin) ->
    super

  getEmojiRegexps: (emoji_data) ->
    regexp_for_utf = ""
    regexp_for_code = ":("
    for emoji in emoji_data
      regexp_for_utf += emoji.moji + "|" if emoji.moji?
      regexp_for_code += emoji.code + "|" if emoji.code?

    return utf: regexp_for_utf.slice(0, -1), code: regexp_for_code.slice(0, -1) + "):"

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

  getUserEmojiData: (callback) ->
    loaded_num = 0
    user_names = @options.userNames
    emoji_data = []

    for user_name in user_names
      $.ajax
        url: "https://www.emojidex.com/api/v1/users/" + user_name + "/emoji"
        dataType: "json"
        type: "get"

        success: (user_emoji_json, status, xhr) ->
          emoji_data = emoji_data.concat user_emoji_json.emoji
          if ++loaded_num is user_names.length
            callback emoji_data

        error: (data) ->
          console.log "error: load json"
          console.log data

  onLoadEmojiData: (emoji_data) =>
    # fix data for At.js --------
    for emoji in emoji_data
      emoji.code = emoji.code.replace RegExp(" ", "g"), "_"
      emoji.img_url = "http://cdn.emojidex.com/emoji/px32/#{emoji.code}.png"

    @emoji_data = emoji_data
    @emoji_regexps = @sgetEmojiRegexps emoji_data
    @setEmojiIcon @
    callback? @

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
