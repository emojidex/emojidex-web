class ReplacerUser extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: ->
    @getUserEmojiData @plugin.options.userNames, @onLoadEmojiData

  getUserEmojiData: (user_names, callback) ->
    loaded_num = 0
    names = user_names
    emoji_data = []

    for name in names
      $.ajax
        url: "https://www.emojidex.com/api/v1/users/#{name}/emoji"
        dataType: 'json'
        type: 'get'

        success: (user_emoji_json, status, xhr) ->
          emoji_data = emoji_data.concat user_emoji_json.emoji
          if ++loaded_num is names.length
            callback emoji_data

        error: (data) ->
          console.log 'error: load json'
          console.log data

  onLoadEmojiData: (emoji_data) =>
    @emoji_data = emoji_data
    @emoji_regexps = @getEmojiRegexps emoji_data

    @plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().filter (index, element) =>
      $(element).replaceWith @getTextWithEomojiTag element.textContent if element.nodeType is Node.TEXT_NODE

  getEmojiRegexps: (emoji_data) ->
    pattern_utf = ''
    utfs = ''
    pattern_code = ':('

    continuous_utf_emoji = []
    for emoji in emoji_data
      if emoji.moji?
        console.count()
        utfs += emoji.moji
        if @utfCharAt(emoji.moji, 1) isnt ''
          continuous_utf_emoji.push
            emoji: emoji
            first: @utfCharAt emoji.moji, 0
            second: @utfCharAt emoji.moji, 1
        else
          pattern_utf += emoji.moji + '|'
      pattern_code += @replaceSpaceToUnder(emoji.code) + '|' if emoji.code?

    continuous_list = {}
    for utf in continuous_utf_emoji
      if -1 isnt pattern_utf.indexOf utf.first
        matched_index = pattern_utf.indexOf utf.first
        unless continuous_list[utf.first]?
          continuous_list[utf.first] = [utf.second]
        else
          continuous_list[utf.first].push utf.second
      else
        pattern_utf += utf.emoji.moji + '|'

    for list_hash of continuous_list
      pattern = "(?!#{continuous_list[list_hash].join '|'})"
      index = pattern_utf.indexOf '|', pattern_utf.indexOf(list_hash)
      pattern_utf = pattern_utf.slice(0, index) + pattern + pattern_utf.slice(index)

    for utf in continuous_utf_emoji
      pattern_utf += utf.emoji.moji + '|'

    # console.log utfs

    utf: RegExp(pattern_utf.slice(0, -1), 'g')
    code: RegExp(pattern_code.slice(0, -1) + "):", 'g')

  getTextWithEomojiTag: (text) ->
    text = text.replace @emoji_regexps.utf, (matched_string) =>
      for emoji in @emoji_data
        if emoji.moji is matched_string
          return @getEmojiTag @replaceSpaceToUnder emoji.code

    text = text.replace @emoji_regexps.code, (matched_string, pattern1) =>
      for emoji in @emoji_data
        if @replaceSpaceToUnder(emoji.code) is pattern1
          return @getEmojiTag pattern1

  utfCharAt: (string, index) ->
    re = ''
    string += ''
    end = string.length
    surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
    while surrogatePairs.exec(string) != null
      li = surrogatePairs.lastIndex
      if li - 2 < index
        index++
      else
        break
    if index >= end or index < 0
      return ''
    re += string.charAt(index)
    if /[\uD800-\uDBFF]/.test(re) and /[\uDC00-\uDFFF]/.test(string.charAt(index + 1))
      re += string.charAt(index + 1)
    re
