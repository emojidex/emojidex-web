class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: ->
    # for useLoadingImg: true --------
    searchEmoji_setEmojiTag = (element) =>
      replaceToEmojiIcon = (type, loading_element, emoji_code) =>
        emoji_image = $("<img src='#{@plugin.ec.cdn_url}#{@plugin.ec.size_code}/#{emoji_code}.png'></img>")
        emoji_image.load (e) =>
          @fadeOutLoadingTag_fadeInEmojiTag loading_element, emoji_code
        emoji_image.error (e) =>
          @fadeOutLoadingTag_fadeInEmojiTag loading_element, "#{loading_element[0].dataset.emoji}", false

      # start: searchEmoji_setEmojiTag --------
      loading_elements = @getLoadingElement element
      @loadingNum = loading_elements.length
      for loading_element in loading_elements
        switch loading_element.dataset.type
          when 'code'
            replaceToEmojiIcon(
              loading_element.dataset.type
              $ loading_element
              @replaceSpaceToUnder loading_element.dataset.emoji.replace /:/g, ''
            )
          when 'utf'
            for emoji of @plugin.options.utfEmojiData
              if emoji is loading_element.dataset.emoji
                @fadeOutLoadingTag_fadeInEmojiTag $(loading_element), @plugin.options.utfEmojiData[emoji]
                break

    # for useLoadingImg: false --------
    checkComplete = =>
      if --target_num is 0 and @plugin.options.onComplete?
        @plugin.options.onComplete @plugin.element

    checkSearchEnd = (searches, element, text, code_emoji)=>
      if searches is 0
        replaceCodeToEmojTag_replaceElement element, text, code_emoji

    replaceCodeToEmojTag_replaceElement = (element, text, code_emoji) =>
      replaced_text = text
      for code in code_emoji
        replaced_text = replaced_text.replace code.matched, =>
          @getEmojiTag @replaceSpaceToUnder code.code
      $(element).replaceWith replaced_text
      checkComplete()

    setEomojiTag = (element) =>
      if element.parentElement.tagName isnt 'STYLE'
        code_emoji = []
        text = element.textContent.replace @plugin.options.regexpUtf, (matched_string) =>
          for emoji of @plugin.options.utfEmojiData
            if emoji is matched_string
              return @getEmojiTag @plugin.options.utfEmojiData[emoji]

        if text.match @regexpCode
          searches = 0
          text.replace @regexpCode, ->
            searches++
          text.replace @regexpCode, (matched_string, pattarn1, offset, string) =>
            emoji_image = $("<img src='#{@plugin.ec.cdn_url}#{@plugin.ec.size_code}/#{@replaceSpaceToUnder pattarn1}.png'></img>")
            emoji_image.load (e) =>
              searches--
              code_emoji.push
                matched: matched_string
                code: pattarn1
              checkSearchEnd searches, element, text, code_emoji
            emoji_image.error (e) =>
              searches--
              checkSearchEnd searches, element, text, code_emoji
        else
          $(element).replaceWith text
          checkComplete()

    # start: loadEmoji --------
    if @plugin.options.useLoadingImg
      @setLoadingTag @plugin
      searchEmoji_setEmojiTag @plugin.element
    else
      target_num = 0
      @plugin.element.find(":not(#{@plugin.options.ignore})").andSelf().contents().filter (index, element) =>
        if element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
          target_num++
      @plugin.element.find(":not(#{@plugin.options.ignore})").andSelf().contents().filter (index, element) =>
        if element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
          setEomojiTag element
