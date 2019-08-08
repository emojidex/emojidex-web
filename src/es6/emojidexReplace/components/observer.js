import Replacer from './replacer'

export default class Observer {
  constructor(plugin) {
    this.plugin = plugin
    this.domObserver = undefined
    this.queues = []
    this.replacer = new Replacer(plugin)
    this.flagReEntry = true
  }

  async doQueue() {
    const body = $('body')[0] // eslint-disable-line no-undef
    if (this.queues.indexOf(body) === -1) {
      // TODO: 処理が重くなるので現時点では最大100個まで変換する。いずれ100個ずつ全部変換するようにしたい
      const tasks = this.queues.slice(0, 100).map(queue => {
        return () => {
          return this.replacer.loadEmoji(queue)
        }
      })
      return Promise.all(tasks.map(task => task()))
    }

    this.queues = []
    await this.replacer.loadEmoji($(body))// eslint-disable-line no-undef
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

  async reloadEmoji() {
    await this.replacer.loadEmoji()

    this.domObserver = new MutationObserver(async mutations => {
      if (this.flagReEntry) {
        this.disconnect()
        this.flagReEntry = false
        for (let i = 0; i < mutations.length; i++) {
          const mutation = mutations[i]
          if (mutation.type !== 'childList' || !mutation.addedNodes) {
            continue
          }

          for (let j = 0; j < mutation.addedNodes.length; j++) {
            const addedNode = mutation.addedNodes[j]
            if (this.queues.indexOf(addedNode) === -1) {
              this.queues.push(addedNode)
            }
          }
        }
      }

      await this.doQueue()
      this.flagReEntry = true
      this.domObserve()
    })
    this.domObserve()
  }
}
