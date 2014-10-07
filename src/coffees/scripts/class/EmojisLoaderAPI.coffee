class EmojisLoaderAPI extends EmojisLoader
  constructor: (@element, @options) ->
    super

  load: (callback)->
    onLoadEmojisData = (emojis_data) =>
      for emoji in emojis_data
        console.log emoji.image
        emoji.img_url = emoji.image.replace 'emojidex.com/emoji/original', 'emojidex.com/emoji/px16'
        # emoji.img_url = "http://assets.emojidex.com/utf/px16/" + emoji.id + ".png"

      @emojis_data = @getCategorizedData emojis_data
      @emoji_regexps = @setEmojiCSS_getEmojiRegexps @emojis_data
      # @emoji_regexps.utf = null
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