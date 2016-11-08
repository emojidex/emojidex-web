class Replacer {
  constructor(plugin) {
    this.plugin = plugin;
    this.targets = [];
    this.wip_count = 0;
  }

  loadEmoji(element) {
    if (element) {
      this.setTargets(element);
    } else if (typeof this.plugin.element !== null) {
      this.setTargets(this.plugin.element[0]);
    }
    this.wip_count = this.targets.length;
    return new Promise((resolve, reject) => {
      if (this.wip_count === 0) { resolve() }
      while (this.targets.length !== 0) {
        const target_node = this.targets.pop();
        this.plugin.EC.Util.emojifyToHTML(target_node.data).then((new_text) => {
          $(target_node).replaceWith(new_text);
          if (--this.wip_count === 0) {
            resolve()
          }
        });
      }
    }).catch(() => {
    });
  }

  setTargets(node) {
    let child;
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.data.match(/\S/)) {
        this.targets.push(node);
      }
    } else if (!(node.parentNode && node.parentNode.isContentEditable)) {
      child = node.firstChild;
      while (child) {
        switch (child.nodeType) {
          case Node.ELEMENT_NODE:
            //check if node an ignored type [black-listed] and if not that it is in the selector list [white-listed]
            if ($(child).is(this.plugin.options.ignore) || ($(child).is(this.plugin.options.selector) == false)) {
              break;
            }
            if (this.plugin.options.ignoreContentEditable && child.isContentEditable) {
              break;
            }
            this.setTargets(child);
            break;
          case Node.TEXT_NODE:
            if (child.data.match(/\S/)) {
              this.targets.push(child);
            }
            break;
        }
        child = child.nextSibling;
      }
    }
  }
}
