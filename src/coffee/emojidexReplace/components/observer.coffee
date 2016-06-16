class Observer
  constructor: ->
    console.log 'I am Observer...'

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
          promise = @plugin.replacer.loadEmoji()
          console.log promise
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
