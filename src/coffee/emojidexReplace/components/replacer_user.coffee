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
    _logUtfEmoji = (emoji_data) ->
      utf_emoji = ''
      for emoji in emoji_data
        if emoji.moji?
          utf_emoji += emoji.moji
      console.log utf_emoji

    _logUtfRegexpPattern = (emoji_data) ->
      utf_emoji = []
      for emoji in emoji_data
        if emoji.moji?
          utf_emoji.push emoji.moji
      console.log utf_emoji.join '|'

    _logUtfEmojiDataList = (emoji_data) =>
      data_list = []
      for emoji in emoji_data
        if emoji.moji?
          data_list.push "{utf:'#{emoji.moji}',code:'#{@replaceSpaceToUnder emoji.code}'}"
      console.log "[#{data_list.join ','}]"

    # for update data --------
    # _logUtfRegexpPattern emoji_data
    # _logUtfEmojiDataList emoji_data

    @emoji_data = emoji_data
    @emoji_regexps = @getEmojiRegexps emoji_data

    @targetElementNum = @plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().length - 1

    @plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().filter (index, element) =>
      $(element).replaceWith @getTextWithEomojiTag element.textContent if element.nodeType is Node.TEXT_NODE
      if @targetElementNum - index is 0 && @plugin.options.onComplete?
        @plugin.options.onComplete @plugin.element

  getEmojiRegexps: (emoji_data) ->
    utf_emoji = []
    pattern_code = ':('

    for emoji in emoji_data
      if emoji.moji?
        utf_emoji.push emoji.moji
      pattern_code += @replaceSpaceToUnder(emoji.code) + '|' if emoji.code?

    utf_emoji.sort (v1, v2) ->
      v2.length - v1.length

    utf: RegExp utf_emoji.join('|'), 'g'
    code: RegExp pattern_code.slice(0, -1) + "):", 'g'

  getTextWithEomojiTag: (text) ->
    text = text.replace @emoji_regexps.utf, (matched_string) =>
      for emoji in @emoji_data
        if emoji.moji is matched_string
          return @getEmojiTag @replaceSpaceToUnder emoji.code

    text = text.replace @emoji_regexps.code, (matched_string, pattern1) =>
      for emoji in @emoji_data
        if @replaceSpaceToUnder(emoji.code) is pattern1
          return @getEmojiTag pattern1
