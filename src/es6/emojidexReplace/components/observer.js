class Observer {
  constructor(plugin){
    this.plugin = plugin;
    this.dom_observer = undefined;
    this.queues = [];
    this.replacer = new ReplacerSearch(this.plugin);
    this.flagReEntry = true;
  }

  doQueue() {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => reject(new Error('emojidex: doQueue - Timeout'))
      , this.replacer.promiseWaitTime);

      let body = $('body')[0];
      if (this.queues.indexOf(body) !== -1) {
        this.queues = [];
        return this.replacer.loadEmoji($(body)).then(() => resolve());
      } else {
        let queue_limit = 100;
        let checkComplete = () => {
          if (this.queues.length > 0 && queue_limit-- > 0) {
            let queue = this.queues.pop();
            return this.replacer.loadEmoji($(queue)).then(() => checkComplete());
          } else {
            return resolve();
          }
        };
        return checkComplete();
      }
    }
    );
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
    return this.dom_observer.disconnect();
  }

  reloadEmoji() {
    return this.replacer.loadEmoji().then(() => {
      __guardFunc__(this.plugin.options.onComplete, f => f(this.plugin.element));

      this.dom_observer = new MutationObserver(mutations => {
        if (this.flagReEntry) {
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
            return this.domObserve();
          }
          );
          return this.flagReEntry = true;
        }
      }
      );

      return this.domObserve();
    }
    );
  }
}

function __guardFunc__(func, transform) {
  return typeof func === 'function' ? transform(func) : undefined;
}