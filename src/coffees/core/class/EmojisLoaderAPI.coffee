class EmojisLoaderAPI extends EmojisLoader
  constructor: (@element, @options) ->
    super

  load: (callback)->
    onLoadEmojisData = (emojis_data) =>
      console.dir emojis_data
      # fix data for At.js --------
      for emoji in emojis_data
        emoji.code = emoji.id
        emoji.img_url = "http://s3-us-west-2.amazonaws.com/assets.emojidex.com/emoji/px16/#{emoji.cod}.png"

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