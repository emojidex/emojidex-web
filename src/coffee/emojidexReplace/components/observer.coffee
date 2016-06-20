class Observer
  constructor: (@plugin)->
    @dom_observer = undefined
    @queues = []
    @replacer = new ReplacerSearch @plugin
    @flagReEntry = true

  doQueue: ->
    return new Promise (resolve, reject) =>
      console.log '@promiseWaitTime', @replacer.promiseWaitTime
      timeout = setTimeout ->
        reject new Error('emojidex: doQueue - Timeout')
      , @replacer.promiseWaitTime

      console.log '@queues', @queues.length, @queues

      body = $('body')[0]
      if @queues.indexOf(body) isnt -1
        @queues = []
        @replacer.loadEmoji($(body)).then ->
          resolve()
      else
        queue_limit = 50
        checkComplete = =>
          if @queues.length > 0 and queue_limit-- > 0
            queue = @queues.pop()
            console.log queue
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

  reloadEmoji: ->
    @replacer.loadEmoji().then =>
      console.log 'first replace END ---'
      @plugin.options.onComplete? @plugin.element

      @dom_observer = new MutationObserver (mutations) =>
        console.log 'OBSERVE=================='
        if @flagReEntry
          @disconnect()
          @flagReEntry = false
          for mutation in mutations
            if mutation.type == 'childList'
              if mutation.addedNodes
                for addedNode in mutation.addedNodes
                  if @queues.indexOf(addedNode) is -1
                    unless $(addedNode).is @plugin.options.ignore
                      @queues.push addedNode

          console.log 'OBSERVE:doQueue=================='
          @doQueue().then =>
            @domObserve()
          @flagReEntry = true

      @domObserve()
