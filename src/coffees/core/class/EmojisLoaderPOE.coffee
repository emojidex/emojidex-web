class EmojisLoaderPOE extends EmojisLoader
  constructor: (@element, @options) ->
    super

  load: (callback) ->
    onLoadEmojisData = (emojis_data) =>
      for emoji in emojis_data
        emoji.img_url = @options.path_img + "/" + emoji.code + ".svg"

      @emojis_data = @getCategorizedData emojis_data
      
      @emoji_regexps = @setEmojiCSS_getEmojiRegexps @emojis_data
      @setEmojiIcon @
      callback @
      
    # start main --------
    if @options.path_json
      $.getJSON(@options.path_json, onLoadEmojisData)
      @
    else
      onLoadEmojisData new EmojisData().parsed_json
      @
