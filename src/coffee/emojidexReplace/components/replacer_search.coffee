class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: ->
    searchEmoji = (element) =>
      setEmojiIcon = (loading_element, term) =>
        @plugin.EC.Search.search term, (emoji_data) =>
          unless emoji_data.length is 0
            for emoji in emoji_data
              if emoji.code.replace(/\s/g, "_") is term
                style = "background-image: url(#{@plugin.options.cdnURL}/#{@plugin.options.sizeCode}/#{term}.png)"
                loading_element.replaceWith @getEmojiTag term, style
          else
            loading_element.replaceWith ":#{term}:"

      loading_elements = element.find ".emojidex-loading-icon"
      for loading_element in loading_elements
        if loading_element.dataset.type is 'code'
          setEmojiIcon $(loading_element), loading_element.dataset.emoji.replace /:/g, ''

    setLoadingTag = (text) =>
      getImgTagWithEmojiData = (emoji_data, type) ->
        "<img class='emojidex-loading-icon' data-emoji='#{emoji_data}' data-type='#{type}'></img>"

      text = text.replace RegExp(@plugin.options.regexpUTF, "g"), (matched_string) ->
        getImgTagWithEmojiData matched_string, "utf"
      text = text.replace /:([^:]+):/g, (matched_string, pattern1) ->
        getImgTagWithEmojiData matched_string, "code"

    # start: loadEmoji --------
    text_nodes = @plugin.element.find(":not(iframe,textarea,script)").andSelf().contents().filter ->
      @nodeType is Node.TEXT_NODE
    for text_node in text_nodes
      new_text = setLoadingTag text_node.textContent
      $(text_node).replaceWith new_text

    searchEmoji @plugin.element
