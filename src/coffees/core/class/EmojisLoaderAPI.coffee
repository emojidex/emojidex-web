class EmojisLoaderAPI extends EmojisLoader
  constructor: (@element, @options) ->
    super

  load: (callback)->
    onLoadEmojisData = (emojis_data) =>
      # fix data for At.js
      for emoji in emojis_data
        emoji.code = emoji.id
        emoji.img_url = emoji.image.replace('emoji/original', 'emoji/px16').replace('.svg?', '.png?')

      @emojis_data = @getCategorizedData emojis_data
      @emoji_regexps = @setEmojiCSS_getEmojiRegexps @emojis_data
      @setEmojiIcon @
      callback @

    # start main --------
    @getEmojiDataFromAPI onLoadEmojisData
    @

  getEmojiDataFromAPI: (callback) ->
    $.ajax
      url: "https://www.emojidex.com/api/v1/emoji"
      dataType: "json"
      type: "get"
      success: (emojis_data) ->
        # console.log "success: load jsonp"
        # console.log emojis_data
        callback emojis_data.emoji
        return
      error: (emojis_data) ->
        # console.log "error: load jsonp"
        # console.log data
        return