class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: ->
    searchEmoji_setEmojiTag = (element) =>
      replaceToEmojiIcon = (type, loading_element, emoji_code) =>
        emoji_image = $("<img src='#{@plugin.ec.cdn_url}#{@plugin.ec.size_code}/#{emoji_code}.png'></img>")
        emoji_image.load (e) =>
          @fadeOutLoadingTag_fadeInEmojiTag loading_element, emoji_code

        emoji_image.error (e) =>
          @fadeOutLoadingTag_fadeInEmojiTag loading_element, "<span>:#{emoji_code}:</span>", false

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

    # start: loadEmoji --------
    @setLoadingTag @plugin
    searchEmoji_setEmojiTag @plugin.element
