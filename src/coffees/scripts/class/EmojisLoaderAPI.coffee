class EmojisLoaderAPI extends EmojisLoader
  constructor: (@json_url) ->
    super
    console.log "EmojisLoaderAPI --- start ---"

  load: (callback)->
    onLoadEmojisData = (emojis_data) =>
      console.log 111
      @emojis_data = @getCategorizedData emojis_data
      console.log @emojis_data

      # @emoji_regexps = @setEmojiCSS_getEmojiRegexps @emojis_data
      # @setEmojiIcon @emojis_data

    @getEmojiDataFromAPI onLoadEmojisData
    @

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

  getEmojiDataFromAPI: (callback) ->
    $.ajax
      url: "https://www.emojidex.com/api/v1/emoji"
      dataType: "jsonp"
      jsonpCallback: "callback"
      type: "get"
      success: (emojis_data) ->
        console.log "success: load jsonp"
        console.log emojis_data
        callback emojis_data.emoji
        return
      error: (emojis_data) ->
        console.log "error: load jsonp"
        console.log data
        return