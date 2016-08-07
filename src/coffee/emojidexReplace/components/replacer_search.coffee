class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: (target_element) ->
    # for useLoadingImg: true --------
    searchEmoji_setEmojiTag = (element) =>
      replaceToEmojiIconOrRollback = (loading_element) =>
        return new Promise (resolve, reject) =>
          timeout = setTimeout ->
            reject new Error('emojidex: replaceToEmojiIconOrRollback - Timeout')
          , @promiseWaitTime
          emoji_code = @replaceSpaceToUnder loading_element.dataset.emoji
          emoji_image = $("<img src='#{@plugin.EC.cdn_url}px8/#{emoji_code}.png'></img>")
          emoji_image.on 'load', (e) =>
            @fadeOutLoadingTag_fadeInEmojiTag($(loading_element), emoji_code).then ->
              resolve()
          emoji_image.on 'error', (e) =>
            @fadeOutLoadingTag_fadeInEmojiTag($(loading_element), emoji_code, false).then ->
              resolve()

      # start: searchEmoji_setEmojiTag --------

      loading_elements = $ '.emojidex-loading-icon'
      if loading_elements.length
        checker = new CountChecker loading_elements.length
        for loading_element in loading_elements
          switch loading_element.dataset.type
            when 'code'
              replaceToEmojiIconOrRollback(loading_element).then ->
                checker.check()
              break
            when 'utf'
              for emoji of @plugin.options.utfEmojiData
                if emoji is loading_element.dataset.emoji
                  @fadeOutLoadingTag_fadeInEmojiTag($(loading_element), @plugin.options.utfEmojiData[emoji]).then ->
                    checker.check()
                  break

    # for useLoadingImg: false --------
    setEmojiTag = (element) =>
      replaced_text = element.textContent.replace @plugin.options.regexpUtf, (matched_string) =>
        for emoji of @plugin.options.utfEmojiData
          if emoji is matched_string
            @emoji_tags++
            emoji_tag = @getEmojiTag @plugin.options.utfEmojiData[emoji]
            return emoji_tag

      matched_codes = replaced_text.match @regexpCode
      replaced_promise = new Promise (resolve, reject) =>
        if matched_codes?.length
          timeout = setTimeout ->
            reject new Error('emojidex: setEmojiTag - Timeout')
          , @promiseWaitTime

          checker = new CountChecker matched_codes.length, ->
            resolve()

          for code in matched_codes
            code_only = @replaceSpaceToUnder(code.replace(/\:/g, ''))

          @plugin.EC.Search.find code_only, (emoji)=>
            if emoji.r18 == true && @plugin.EC.User.auth_info.r18 == false
              resolve()
              return
            emoji_image = $("<img src='#{@plugin.EC.cdn_url}px8/#{code_only}.png' data-code='#{code_only}'></img>")
            emoji_image.on 'load', (e) =>
              replaced_text = replaced_text.replace ":#{e.currentTarget.dataset.code}:", @getEmojiTag @replaceSpaceToUnder(e.currentTarget.dataset.code)
              checker.check()
              resolve()
            emoji_image.on 'error', (e) =>
              checker.check()
              resolve()
        else
          resolve()

      replaced_promise.then ->
        $(element).replaceWith replaced_text

    # start: loadEmoji --------
    element = target_element || @plugin.element

    @targets = []
    @setTargets element[0]

    if @targets.length
      checker = new CountChecker @targets.length, ->
      for target in @targets
        setEmojiTag(target).then (e) =>
          checker.check()
    else
