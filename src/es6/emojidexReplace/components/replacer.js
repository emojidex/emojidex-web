class Replacer {
  constructor(plugin) {
    this.plugin = plugin;

    if (typeof this.plugin.element !== null) {
      this.scanAndReplace(this.plugin.element[0]);
    }
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
              const target = child;
              this.plugin.EC.Util.emojifyToHTML(target.data).then((new_text) => {
                $(target).replaceWith(new_text);
              });
            }
            break;
        }
        child = child.nextSibling;
      }
    }
  }
}
