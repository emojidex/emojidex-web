import Replacer from './replacer'

export default class Observer {
  constructor(plugin){
    this.plugin = plugin;
    this.dom_observer = undefined;
    this.queues = [];
    this.replacer = new Replacer(plugin);
    this.flagReEntry = true;
  }

  doQueue() {
    return new Promise((resolve, reject) => {
      let body = $('body')[0];
      if (this.queues.indexOf(body) !== -1) {
        this.queues = [];
        this.replacer.loadEmoji($(body)).then(() => resolve());
      } else {
        let queue_limit = 100;
        let checkComplete = () => {
          if (this.queues.length > 0 && queue_limit-- > 0) {
            let queue = this.queues.pop();
            this.replacer.loadEmoji(queue).then(() => {
              checkComplete()
            });
          } else {
            resolve();
          }
        };
        checkComplete();
      }
    });
  }

  domObserve() {
    let config = {
      childList: true,
      subtree: true,
      characterData: true
    };
    return this.dom_observer.observe(this.plugin.element[0], config);
  }

  disconnect() {
    this.dom_observer.disconnect();
  }

  reloadEmoji() {
    this.replacer.loadEmoji().then(() => {
      if (typeof this.plugin.options.onComplete === "function") {
        this.plugin.options.onComplete(this.plugin.element);
      }

      this.dom_observer = new MutationObserver(mutations => {
        if(this.flagReEntry) {
          this.disconnect();
          this.flagReEntry = false;
          for (let i = 0; i < mutations.length; i++) {
            let mutation = mutations[i];
            if (mutation.type === 'childList') {
              if (mutation.addedNodes) {
                for (let j = 0; j < mutation.addedNodes.length; j++) {
                  let addedNode = mutation.addedNodes[j];
                  if (this.queues.indexOf(addedNode) === -1) {
                    this.queues.push(addedNode);
                  }
                }
              }
            }
          }
          this.doQueue().then(() => {
            this.flagReEntry = true;
            this.domObserve();
          });
        }
      });
      this.domObserve();
    });
  }
}
