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
      if @replaced_text is @targetNum
        if @plugin.options.onComplete?
          @plugin.options.onComplete @plugin.element

        if @plugin.options.reloadOnAjax
          # mem = @plugin.element[0].innerText
          # setTimeout =>
          #   console.log mem is @plugin.element[0].innerText
          # , 0
          setTimeout =>
            @plugin.element.watch
              properties: 'prop_innerText'
              watchChildren: true
              id: 'reload_emoji_watcher'
              callback: (data, i) =>
                # debugger
                plugin_data = @plugin.element.data().plugin_emojidexReplace
                plugin_data.options.reloadOnAjax = false
                plugin_data.replacer.loadEmoji()
          , 1000
      # else
        # console.log @targetNum
        # console.log @replaced_text
      return

    checkSearchEnd = (searches, element, text, code_emoji)=>
      if searches is 0
        replaceCodeToEmojTag_replaceElement element, text, code_emoji

    replaceCodeToEmojTag_replaceElement = (element, text, code_emoji) =>
      replaced_text = text
      for code in code_emoji
        replaced_text = replaced_text.replace code.matched, =>
          @emoji_tags++
          emoji_tag = @getEmojiTag @replaceSpaceToUnder code.code
          return emoji_tag

      $(element).replaceWith replaced_text
      @replaced_text++
      checkComplete()

    setEomojiTag = (element) =>
      code_emoji = []
      text = element.textContent.replace @plugin.options.regexpUtf, (matched_string) =>
        for emoji of @plugin.options.utfEmojiData
          if emoji is matched_string
            @emoji_tags++
            emoji_tag = @getEmojiTag @plugin.options.utfEmojiData[emoji]
            return emoji_tag

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
        @replaced_text++
        checkComplete()

    # start: loadEmoji --------
    if @plugin.options.useLoadingImg
      @setLoadingTag @plugin
      searchEmoji_setEmojiTag @plugin.element
    else
      @targetNum = 0
      @replaced_text = 0
      @emoji_tags = 0
      @plugin.element.find(":not(#{@plugin.options.ignore})").andSelf().contents().filter (index, element) =>
        if element.parentElement.tagName isnt 'STYLE' and element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
          @targetNum++
      @plugin.element.find(":not(#{@plugin.options.ignore})").andSelf().contents().filter (index, element) =>
        if element.parentElement.tagName isnt 'STYLE' and element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
          setEomojiTag element
