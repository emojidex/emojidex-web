class EmojisLoaderAPI extends EmojisLoader
  constructor: (@element, @options) ->
    super

  load: (callback)->
    onLoadEmojisData = (emojis_data) =>
      for emoji in emojis_data
        emoji.img_url = "http://assets.emojidex.com/emoji/" + emoji.code + "/px32.png"

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
      dataType: "jsonp"
      jsonpCallback: "callback"
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