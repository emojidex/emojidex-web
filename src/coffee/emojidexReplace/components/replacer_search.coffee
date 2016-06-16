class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: ->
    # for useLoadingImg: true --------
    searchEmoji_setEmojiTag = (element) =>
      replaceToEmojiIcon = (type, loading_element, emoji_code) =>
        return new Promise (resolve, reject) =>
          timeout = setTimeout ->
            reject new Error('emojidex: replaceToEmojiIcon - Timeout')
          , @promiseWaitTime

          emoji_image = $("<img src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{emoji_code}.png'></img>")
          emoji_image.load (e) =>
            @fadeOutLoadingTag_fadeInEmojiTag(loading_element, emoji_code).then ->
              resolve()
          emoji_image.error (e) =>
            @fadeOutLoadingTag_fadeInEmojiTag(loading_element, "#{loading_element[0].dataset.emoji}", false).then ->
              resolve()

      # start: searchEmoji_setEmojiTag --------
      return new Promise (resolve, reject) =>
        timeout = setTimeout ->
          reject new Error('emojidex: searchEmoji_setEmojiTag - Timeout')
        , @promiseWaitTime

        checkReplaceComplete = =>
          if loading_elements.length is ++complete_num
            resolve()

        complete_num = 0
        loading_elements = @getLoadingElement element
        for loading_element in loading_elements
          switch loading_element.dataset.type
            when 'code'
              replaceToEmojiIcon(
                loading_element.dataset.type
                $ loading_element
                @replaceSpaceToUnder loading_element.dataset.emoji.replace /:/g, ''
              ).then ->
                checkReplaceComplete()
              break
            when 'utf'
              for emoji of @plugin.options.utfEmojiData
                if emoji is loading_element.dataset.emoji
                  @fadeOutLoadingTag_fadeInEmojiTag($(loading_element), @plugin.options.utfEmojiData[emoji]).then ->
                    checkReplaceComplete()
                  break

    # for useLoadingImg: false --------
    setEomojiTag = (element) =>
      replaced_text = element.textContent.replace @plugin.options.regexpUtf, (matched_string) =>
        for emoji of @plugin.options.utfEmojiData
          if emoji is matched_string
            @emoji_tags++
            emoji_tag = @getEmojiTag @plugin.options.utfEmojiData[emoji]
            return emoji_tag

      replaced_promise = new Promise (resolve, reject) =>
        timeout = setTimeout ->
          reject new Error('emojidex: setEomojiTag - Timeout')
        , @promiseWaitTime

        checkReplaceEnd = () =>
          if matched_codes.length is ++replaced_num
            resolve()

        replaced_num = 0
        matched_codes = replaced_text.match @regexpCode
        if matched_codes.length
          for code in matched_codes
            code_only = code.replace /\:/g, ''
            emoji_image = $("<img src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{@replaceSpaceToUnder code_only}.png' data-code='#{code_only}'></img>")
            emoji_image.load (e) =>
              replaced_text = replaced_text.replace ":#{e.currentTarget.dataset.code}:", @getEmojiTag e.currentTarget.dataset.code
              checkReplaceEnd()
            emoji_image.error (e) =>
              checkReplaceEnd()
        else
          $(element).replaceWith replaced_text
          resolve()

      replaced_promise.then ->
        $(element).replaceWith replaced_text

    # start: loadEmoji --------
    if @plugin.options.useLoadingImg
      return @setLoadingTag(@plugin).then( =>
        searchEmoji_setEmojiTag @plugin.element
      ).then =>
        @plugin.options.onComplete? @plugin.element

    else
      return new Promise (resolve, reject) =>
        timeout = setTimeout ->
          reject new Error('emojidex: loadEmoji useLoadingImg: false - Timeout')
        , @promiseWaitTime

        checkReplaceComplete = =>
          if targets.length is ++complete_num
            console.log 'Finish: setEmoji'
            resolve()

        complete_num = 0
        targets = []
        @plugin.element.find(":not(#{@plugin.options.ignore})").andSelf().contents().filter (index, element) =>
          if element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
            targets.push element
        for target in targets
          setEomojiTag(target).then (e)->
            checkReplaceComplete()
