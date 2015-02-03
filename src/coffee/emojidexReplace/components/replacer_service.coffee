class ReplacerService extends Replacer
  constructor: (@element, @options) ->
    super
    @element = $(@element)

  replace: (callback)->
    @setLoadingIcon()
    @

  onLoadEmojiData: (emoji_data) =>
    # fix data for At.js --------
    for emoji in emoji_data
      emoji.code = emoji.code.replace RegExp(" ", "g"), "_"
      emoji.img_url = "http://cdn.emojidex.com/emoji/px32/#{emoji.code}.png"

    @emoji_data = emoji_data
    @emoji_regexps = @setEmojiCSS_getEmojiRegexps emoji_data
    @setEmojiIcon @
    callback @ if callback?

  setLoadingIcon: ->
    setLoadingTag = (text) ->
      text = text.replace /:([^:]+):/g, (matched_string, pattern1) ->
        '<img class="emojidex-loading-icon" style="width: 1.5em; height: 1.5em" src="img/loading1.gif"></img>'

    @element_clone = @element.clone()

    text_nodes = @element.find(":not(iframe,textarea,script)").andSelf().contents().filter ->
      @nodeType is Node.TEXT_NODE
    for text_node in text_nodes
      text = text_node.textContent
      text = setLoadingTag text
      $(text_node).replaceWith text

    @getEmojiDataFromAPI @onLoadEmojiData

  getEmojiDataFromAPI: (callback) ->
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
