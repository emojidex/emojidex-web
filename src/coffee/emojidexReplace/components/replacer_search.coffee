class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: (target_element) ->
    # for useLoadingImg: true --------
    searchEmoji_setEmojiTag = (element) =>
      replaceToEmojiIcon = (type, loading_element, emoji_code) =>
        return new Promise (resolve, reject) =>
          timeout = setTimeout ->
            reject new Error('emojidex: replaceToEmojiIcon - Timeout')
          , @promiseWaitTime

          @fadeOutLoadingTag_fadeInEmojiTag(loading_element, emoji_code).then ->
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
        if loading_elements.length
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
        else
          resolve()

    # for useLoadingImg: false --------
    setEomojiTag = (element) =>
      console.time 'replace for utf'
      replaced_text = element.textContent.replace @plugin.options.regexpUtf, (matched_string) =>
        for emoji of @plugin.options.utfEmojiData
          if emoji is matched_string
            @emoji_tags++
            emoji_tag = @getEmojiTag @plugin.options.utfEmojiData[emoji]
            return emoji_tag
      console.timeEnd 'replace for utf'

      console.time 'replace for code'
      replaced_promise = new Promise (resolve, reject) =>
        timeout = setTimeout ->
          reject new Error('emojidex: setEomojiTag - Timeout')
        , @promiseWaitTime

        checkReplaceEnd = () =>
          if matched_codes.length is ++replaced_num
            console.timeEnd 'replace for code'
            resolve()

        replaced_num = 0
        matched_codes = replaced_text.match @regexpCode
        if matched_codes?.length
          for code in matched_codes
            code_only = code.replace /\:/g, ''
            emoji_image = $("<img src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{@replaceSpaceToUnder code_only}.png' data-code='#{code_only}'></img>")
            emoji_image.load (e) =>
              replaced_text = replaced_text.replace ":#{e.currentTarget.dataset.code}:", @getEmojiTag e.currentTarget.dataset.code
              checkReplaceEnd()
            emoji_image.error (e) =>
              checkReplaceEnd()
        else
          resolve()

      replaced_promise.then ->
        $(element).replaceWith "<span class='emojidex-ignore-element'>#{replaced_text}</span>"

    # start: loadEmoji --------
    element = target_element || @plugin.element
    if @plugin.options.useLoadingImg
      return @setLoadingTag().then =>
        searchEmoji_setEmojiTag element
    else
      # start fix: process of get node
      return new Promise (resolve, reject) =>
        timeout = setTimeout ->
          reject new Error('emojidex: loadEmoji useLoadingImg: false - Timeout')
        , @promiseWaitTime

        @targets = []
        @complete_num = 0
        @setTargets element[0]

        console.log 'targets node length:', @targets.length, @targets

        console.time 'replace target total'
        if @targets.length
          for target in @targets
            setEomojiTag(target).then (e) =>
              @checkReplaceComplete resolve
        else
          resolve()
