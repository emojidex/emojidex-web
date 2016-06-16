class Observer
  constructor: (@plugin)->
    @dom_observer = undefined
    @queues = []
    @replacer = new ReplacerSearch @plugin

  doQueue: ->
    return new Promise (resolve, reject) =>
      console.log '@promiseWaitTime', @replacer.promiseWaitTime
      timeout = setTimeout ->
        reject new Error('emojidex: doQueue - Timeout')
      , @replacer.promiseWaitTime

      body = $('body')[0]
      if @queues.indexOf(body) isnt -1
        console.log '@queues.indexOf(body) isnt -1: true ---'
        @queues = []
        @replacer.loadEmoji($(body)).then ->
          resolve()
      else
        console.log '@queues.indexOf(body) isnt -1: false ---'
        queue_limit = 3
        checkComplete = =>
          if @queues.length > 0 and queue_limit-- > 0
            queue = @queues.pop()
            console.log 'checkComplete---', queue
            @replacer.loadEmoji($(queue)).then ->
              checkComplete()
          else
            resolve()
        checkComplete()

  domObserve: ->
    console.count 'DomObserve:'
    config =
      childList: true
      subtree: true
      characterData: true
    @dom_observer.observe @plugin.element[0], config

  disconnect: ->
    console.count 'disconnect:'
    @dom_observer.disconnect()

  startQueueTimer: ->
    setTimeout =>
      console.count 'start timer:'
      @queues.length
      if @queues.length > 0
        console.log '@queues.length:', @queues.length, @queues
        @disconnect()
        @doQueue().then =>
          @domObserve()
          @startQueueTimer()
      else
        @startQueueTimer()
    , 1000

  reloadEmoji: ->

    @replacer.loadEmoji().then =>
      console.log 'first replace END ---'
      @startQueueTimer()

      @dom_observer = new MutationObserver (mutations) =>
        for mutation in mutations
          if @queues.indexOf(mutation.target) is -1 and @queues.length - 1 < 10
            # unless $(mutation.target).hasClass('js-macaw-cards-iframe-container')
            @queues.push mutation.target
      @domObserve()
