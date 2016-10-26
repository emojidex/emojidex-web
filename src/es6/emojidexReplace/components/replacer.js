class Replacer {
  constructor(plugin) {
    this.plugin = plugin;

    // Initial replacement
    if (typeof this.plugin.element !== null)
      this.scanAndReplace(this.plugin.element);
  }

  replace(node) {
    if ($(node.nodeType).is(this.plugin.options.ignore)) { return; }
    if (node.nodeType == Node.ELEMENT_NODE) {
        element = $(node);
        if (typeof element.text !== 'function' || element.text() === '') { return; }

        // Perform replacement on node
        this.plugin.EC.Util.emojifyToHTML(element.html()).then((new_text) => {
          $(node).html(new_text);
        });
    }
  }

  scanAndReplace(node) {
    var children = $(node).children();
    if (children.length == 0) {
      this.replace(node);
      return;
    }

    for (var i = 0; i < children.length; i++) {
      this.scanAndReplace(children[i]);
    }
  }
}
