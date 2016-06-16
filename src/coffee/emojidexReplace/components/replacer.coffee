class Replacer
  constructor: ->
    @promiseWaitTime = 3000

    ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\'
    @regexpCode = RegExp ":([^\\s#{ignore}][^#{ignore}]*[^\\s#{ignore}]):|:([^\\s#{ignore}]):", 'g'

  getEmojiTag: (emoji_code) ->
    "<img class='emojidex-emoji' src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{emoji_code}.png' title='#{@replaceUnderToSpace emoji_code}'></img>"

  getLoadingTag: (emoji_data, type) ->
    "<div class='emojidex-loading-icon' data-emoji='#{emoji_data}' data-type='#{type}'></div>"

  getLoadingElement: (element) ->
    $ element.find '.emojidex-loading-icon'

  setLoadingTag: (plugin) ->
    return new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: setLoadingTag - Timeout')
      , @promiseWaitTime

      plugin.element.find(":not(#{plugin.options.ignore})").andSelf().contents().filter (index, element) =>
        if element.nodeType is Node.TEXT_NODE and element.textContent.match(/\S/)
          replaced_text = @getTextWithLoadingTag element.textContent
          $(element).replaceWith replaced_text if replaced_text isnt element.textContent
          resolve()

  getTextWithLoadingTag: (text) ->
    text = text.replace @plugin.options.regexpUtf, (matched_string) =>
      @getLoadingTag matched_string, 'utf'
    text = text.replace @regexpCode, (matched_string) =>
      @getLoadingTag matched_string, 'code'
    return text

  reloadEmoji: ->
    queues = []
    dom_observer = new MutationObserver (mutations) =>
      for mutation in mutations
        if queues.indexOf(mutation.target) is -1
          queues.push mutation.target

    doQueue = (DO) =>
      # @plugin.options.useLoadingImg = false
      disconnect DO
      body = $('body')[0]
      if queues.indexOf(body) isnt -1
        console.count('reset queues')
        @plugin.replacer.loadEmoji()
        queues = []
      else
        queue_limit = @plugin.options.updateLimit
        queue_limit = 2
        while queues.length > 0 and queue_limit > 0
          console.count('replace')
          queue = queues.pop()
          @plugin.replacer.loadEmoji()
          queue_limit--
      # DomObserve DO

    DomObserve = (DO) =>
      console.count 'DomObserve:'
      config =
        childList: true
        subtree: true
        characterData: true
      DO.observe @plugin.element[0], config

    disconnect = (DO) ->
      console.count 'disconnect:'
      DO.disconnect()

    DomObserve dom_observer

    queueTimer = ->
      setTimeout ->
        # console.count 'start timer:'
        if queues.length > 0
          console.log 'queues.length:', queues.length
          doQueue dom_observer
        queueTimer()
      , 1000
    queueTimer()

  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji_code, match = true) ->
    emoji_tag = undefined
    if match
      emoji_tag = $(@getEmojiTag emoji_code).hide()
    else
      emoji_tag = emoji_code

    return new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: fadeOutLoadingTag_fadeInEmojiTag - Timeout')
      , @promiseWaitTime

      element.fadeOut
        duration: 'normal'
        done: =>
          element.after emoji_tag
          element.remove()
          if match
            emoji_tag.fadeIn
              duration: "fast"
              done: =>
                resolve()
          else
            resolve()

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'

  replaceUnderToSpace: (string) ->
    string.replace /_/g, ' '
