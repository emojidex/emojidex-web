class ReplacerSearch extends Replacer
  constructor: (@plugin) ->
    super

  loadEmoji: ->
    searchEmoji = (element) =>
      replaceToEmojiIcon = (type, loading_element, term) =>
        @plugin.EC.Search.search term, (emoji_data) =>
          unless emoji_data.length is 0
            for emoji in emoji_data
              switch type
                when 'code'
                  if emoji.code.replace(/\s/g, "_") is term
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

      # start: searchEmoji --------
      loading_elements = $ element.find ".emojidex-loading-icon"
      for loading_element in loading_elements
        switch loading_element.dataset.type
          when 'code'
            replaceToEmojiIcon(
              loading_element.dataset.type
              $ loading_element
              loading_element.dataset.emoji.replace /:/g, ''
            )
          when 'utf'
            replaceToEmojiIcon(
              loading_element.dataset.type
              $ loading_element
              loading_element.dataset.emoji
            )

    replaceTextToLoadingTag = (text) =>
      text = text.replace RegExp(@plugin.options.regexpUTF, "g"), (matched_string) =>
        @getLoadingTag matched_string, 'utf'
      text = text.replace /:([^:]+):/g, (matched_string, pattern1) =>
        @getLoadingTag matched_string, 'code'

    # start: loadEmoji --------
    @plugin.element.find(":not(iframe,textarea,script)").andSelf().contents().filter ->
      $(@).replaceWith replaceTextToLoadingTag @.textContent if @nodeType is Node.TEXT_NODE

    searchEmoji @plugin.element
