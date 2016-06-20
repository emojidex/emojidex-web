class Observer
  constructor: (@plugin)->
    @dom_observer = undefined
    @queues = []
    @replacer = new ReplacerSearch @plugin
    @flagReEntry = true

  doQueue: ->
    return new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: doQueue - Timeout')
      , @replacer.promiseWaitTime


      body = $('body')[0]
      if @queues.indexOf(body) isnt -1
        @queues = []
        @replacer.loadEmoji($(body)).then ->
          resolve()
      else
        queue_limit = 300
        checkComplete = =>
          if @queues.length > 0 and queue_limit-- > 0
            queue = @queues.pop()
            @replacer.loadEmoji($(queue)).then ->
              checkComplete()
          else
            resolve()
        checkComplete()

  domObserve: ->
    config =
      childList: true
      subtree: true
      characterData: true
    @dom_observer.observe @plugin.element[0], config

  disconnect: ->
    @dom_observer.disconnect()

  reloadEmoji: ->
    @replacer.loadEmoji().then =>
      @plugin.options.onComplete? @plugin.element

      @dom_observer = new MutationObserver (mutations) =>
        if @flagReEntry
          @disconnect()
          @flagReEntry = false
          for mutation in mutations
            if mutation.type == 'childList'
              if mutation.addedNodes
                for addedNode in mutation.addedNodes
                  if @queues.indexOf(addedNode) is -1
                    @queues.push addedNode

          @doQueue().then =>
            @domObserve()
          @flagReEntry = true

      @domObserve()
