class Replacer {
  constructor(plugin) {
    this.plugin = plugin;
    this.targets = [];
    this.wip_count = 0;

    return new Promise((resolve, reject) => {
      if (typeof this.plugin.element !== null) {
        this.scanAndReplace(this.plugin.element[0]);

        this.wip_count = this.targets.length;
        for(target of this.targets) {
          const target_node = target;
          this.plugin.EC.Util.emojifyToHTML(target_node.data).then((new_text) => {
            $(target_node).replaceWith(new_text);
            if(--this.wip_count === 0) {
              resolve()
            }
          });
        }
      }
    });
  }


  scanAndReplace(node) {
    let child;

    if (!(node.parentNode && node.parentNode.isContentEditable)) {
      child = node.firstChild;
      while (child) {
        switch (child.nodeType) {
          case Node.ELEMENT_NODE:
            if ($(child).is(this.plugin.options.ignore)) {
              break;
            }
            if (child.isContentEditable) {
              break;
            }
            this.scanAndReplace(child);
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
