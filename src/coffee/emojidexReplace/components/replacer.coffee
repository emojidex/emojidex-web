class Replacer
  constructor: ->
    @loadingNum = 0

    ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\'
    @regexpCode = RegExp ":([^\\s#{ignore}][^#{ignore}]*[^\\s#{ignore}]):|:([^\\s#{ignore}]):", 'g'

  getEmojiTag: (emoji_code) ->
    "<img class='emojidex-emoji' src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{emoji_code}.png' title='#{@replaceUnderToSpace emoji_code}'></img>"

  getLoadingTag: (emoji_data, type) ->
    "<div class='emojidex-loading-icon' data-emoji='#{emoji_data}' data-type='#{type}'></div>"

  getLoadingElement: (element) ->
    $ element.find '.emojidex-loading-icon'

  setLoadingTag: (plugin) ->
    plugin.element.find(":not(#{plugin.options.ignore})").andSelf().contents().filter (index, element) =>
      if element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
        replaced_text = @getTextWithLoadingTag element.textContent
        $(element).replaceWith replaced_text if replaced_text isnt element.textContent

  getTextWithLoadingTag: (text) ->
    text = text.replace @plugin.options.regexpUtf, (matched_string) =>
      @getLoadingTag matched_string, 'utf'
    text = text.replace @regexpCode, (matched_string) =>
      @getLoadingTag matched_string, 'code'
    return text

  reloadEmoji: ->
    queues = []
    doQueue = =>
      disconnect()
      body = $('body')[0]
      if queues.indexOf(body) > -1
        matchText body, regExp
        queues = []
      else
        queue_limit = 500
        while queues.length > 0 and queue_limit > 0
          console.count('replace')
          queue = queues.pop()
          @plugin.options.useLoadingImg = false
          @plugin.replacer.loadEmoji()
          queue_limit--

    DomObserve = =>
      config =
        childList: true
        subtree: true
        characterData: true
      dom_observer.observe @plugin.element[0], config

    disconnect = ->
      dom_observer.disconnect()

    dom_observer = new MutationObserver (mutations) =>
      for mutation in mutations
        if queues.indexOf(mutation.target) is -1
          queues.push mutation.target

    setInterval (->
      if queues.length > 0
        console.log queues
        doQueue()
    ), 1000
    DomObserve()

  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji_code, match = true) ->
    emoji_tag = undefined
    if match
      emoji_tag = $(@getEmojiTag emoji_code).hide()
    else
      emoji_tag = emoji_code

    element.fadeOut "normal", =>
      element.after emoji_tag
      element.remove()
      if match
        emoji_tag.fadeIn "fast", =>
          if --@loadingNum is 0
            if @plugin.options.onComplete?
              @plugin.options.onComplete @plugin.element

            if @plugin.options.autoUpdate
              @reloadEmoji()
      else
        @loadingNum--

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'

  replaceUnderToSpace: (string) ->
    string.replace /_/g, ' '
