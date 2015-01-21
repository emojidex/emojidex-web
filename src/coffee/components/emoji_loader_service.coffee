class EmojiLoaderService extends EmojiLoader
  constructor: (@element, @options) ->
    super

  load: (callback)->
    onLoadEmojiData = (emoji_data) =>
      # fix data for At.js --------
      for emoji in emoji_data
        emoji.code = emoji.code.replace RegExp(" ", "g"), "_"
        emoji.img_url = "http://cdn.emojidex.com/emoji/px32/#{emoji.code}.png"

      # console.dir emoji_data
      @emoji_data = @getCategorizedData emoji_data
      @emoji_regexps = @setEmojiCSS_getEmojiRegexps @emoji_data
      @setEmojiIcon @
      callback @

    # start main --------
    @getEmojiDataFromAPI onLoadEmojiData
    @

  getEmojiDataFromAPI: (callback) ->
    loaded_num = 0
    user_names = ["emojidex", "emoji"]
    emoji_data = []

    for user_name in user_names
      $.ajaxSetup beforeSend: (jqXHR, settings) ->
        # set user_name for loaded flag
        # jqXHR.user_name = user_name

      $.ajax
        url: "https://www.emojidex.com/api/v1/users/" + user_name + "/emoji"
        dataType: "json"
        type: "get"

        success: (user_emoji_json, status, xhr) ->
          # console.log "success: load json"
          emoji_data = emoji_data.concat user_emoji_json.emoji
          if ++loaded_num is user_names.length
            callback emoji_data

        error: (data) ->
          console.log "error: load json"
          console.log data
