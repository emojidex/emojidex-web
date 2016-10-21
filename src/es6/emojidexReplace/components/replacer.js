class Replacer {
  constructor(plugin) {
    this.plugin = plugin;

    // Initial replacement
    if (typeof this.plugin.element !== null)
      this.scanAndReplace(this.plugin.element);
  }

  replace(node) {
    console.log("replace");
    console.log(node);
    if ($(node.nodeType).is(this.plugin.options.ignore)) {
      console.log("ignored type");
      return;
    }
    switch (node.nodeType) {
      case Node.ELEMENT_NODE:
        //if (child.isContentEditable) {
        //  break;
        //}
        console.log("element");
        break;
      case Node.TEXT_NODE:
        //if (child.data.indexOf('function(') === -1) {
          //if (child.data.match(/\S/)) { this.targets.push(child); }
        //}
        console.log("text");
        break;
    }
  }

  scanAndReplace(node) {
    console.log("setting targets");
    console.log(node);
    for (child in node.children)
      scanAndReplace(child);

    this.replace(node);
  }
}
