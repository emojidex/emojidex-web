import Replacer from './replacer'

export default class Observer {
  constructor(plugin) {
    this.plugin = plugin
    this.domObserver = undefined
    this.queues = []
    this.replacer = new Replacer(plugin)
    this.flagReEntry = true
  }

  doQueue() {
    return new Promise(resolve => {
      const body = $('body')[0] // eslint-disable-line no-undef
      if (this.queues.indexOf(body) === -1) {
        let queueLimit = 100
        const checkComplete = () => {
          if (this.queues.length > 0 && queueLimit-- > 0) {
            const queue = this.queues.pop()
            this.replacer.loadEmoji(queue).then(() => {
              checkComplete()
            })
          } else {
            resolve()
          }
        }

        checkComplete()
      } else {
        this.queues = []
        this.replacer.loadEmoji($(body)).then(() => resolve()) // eslint-disable-line no-undef
      }
    })
  }

  domObserve() {
    const config = {
      childList: true,
      subtree: true,
      characterData: true
    }
    return this.domObserver.observe(this.plugin.element[0], config)
  }

  disconnect() {
    this.domObserver.disconnect()
  }

  reloadEmoji() {
    this.replacer.loadEmoji().then(() => {
      if (typeof this.plugin.options.onComplete === 'function') {
        this.plugin.options.onComplete(this.plugin.element)
      }

      this.domObserver = new MutationObserver(mutations => {
        if (this.flagReEntry) {
          this.disconnect()
          this.flagReEntry = false
          for (let i = 0; i < mutations.length; i++) {
            const mutation = mutations[i]
            if (mutation.type === 'childList') {
              if (mutation.addedNodes) {
                for (let j = 0; j < mutation.addedNodes.length; j++) {
                  const addedNode = mutation.addedNodes[j]
                  if (this.queues.indexOf(addedNode) === -1) {
                    this.queues.push(addedNode)
                  }
                }
              }
            }
          }

          this.doQueue().then(() => {
            this.flagReEntry = true
            this.domObserve()
          })
        }
      })
      this.domObserve()
    })
  }
}
