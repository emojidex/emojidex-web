class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: ->
    searchEmoji_setEmojiTag = (element) =>
      replaceToEmojiIcon = (type, loading_element, term) =>
        @plugin.EC.Search.search term, (emoji_data) =>
          unless emoji_data.length is 0
            for emoji in emoji_data
              switch type
                when 'code'
                  if @replaceSpaceToUnder(emoji.code) is term
                    @fadeOutLoadingTag_fadeInEmojiTag loading_element, term
                when 'utf'
                  if emoji.moji is term
                    @fadeOutLoadingTag_fadeInEmojiTag loading_element, emoji.code.replace /\s/g, "_"
          else
            switch type
              when 'code'
                @fadeOutLoadingTag_fadeInEmojiTag loading_element, "<span>:#{term}:</span>", false
              when 'utf'
                @fadeOutLoadingTag_fadeInEmojiTag loading_element, "<span>#{term}</span>", false

      # start: searchEmoji_setEmojiTag --------
      loading_elements = @getLoadingElement element
      for loading_element in loading_elements
        switch loading_element.dataset.type
          when 'code'
            replaceToEmojiIcon(
              loading_element.dataset.type
              $ loading_element
              loading_element.dataset.emoji.replace /:/g, ''
            )
          when 'utf'
            # Need Update!!: Search API --------
            # replaceToEmojiIcon(
            #   loading_element.dataset.type
            #   $ loading_element
            #   loading_element.dataset.emoji
            # )
            for emoji in @plugin.options.utfEmojiData
              if emoji.utf is loading_element.dataset.emoji
                @fadeOutLoadingTag_fadeInEmojiTag $(loading_element), emoji.code

    # start: loadEmoji --------
    @setLoadingTag @plugin

    searchEmoji_setEmojiTag @plugin.element
