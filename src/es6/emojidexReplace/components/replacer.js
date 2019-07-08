export default class Replacer {
  constructor(plugin) {
    this.plugin = plugin
    this.targets = []
    this.wipCount = 0
  }

  loadEmoji(element) {
    if (element) {
      this.setTargets(element)
    } else if (this.plugin.element !== null) {
      this.setTargets(this.plugin.element[0])
    }

    this.wipCount = this.targets.length
    return new Promise(resolve => {
      if (this.wipCount === 0) {
        resolve()
      }

      while (this.targets.length !== 0) {
        const targetNode = this.targets.pop()
        this.plugin.EC.Util.emojifyToHTML(targetNode.data).then(newText => {
          $(targetNode).replaceWith(newText) // eslint-disable-line no-undef
          if (--this.wipCount === 0) {
            resolve()
          }
        })
      }
    }).catch(() => {
    })
  }

  tagEscape(string) {
    return string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  setTargets(node) {
    let child
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.data.match(/\S/)) {
        this.targets.push(node)
      }
    } else if (!(node.parentNode && node.parentNode.isContentEditable)) {
      child = node.firstChild
      while (child) {
        switch (child.nodeType) {
          case Node.ELEMENT_NODE:
            // check if node an ignored type [black-listed] and if not that it is in the selector list [white-listed]
            if ($(child).is(this.plugin.options.ignore) || !$(child).is(this.plugin.options.selector)) { // eslint-disable-line no-undef
              break
            }

            if (this.plugin.options.ignoreContentEditable && child.isContentEditable) {
              break
            }

            this.setTargets(child)
            break
          case Node.TEXT_NODE:
            if (child.data.match(/\S/)) {
              child.data = this.tagEscape(child.data)
              this.targets.push(child)
            }

            break
          default:
            break
        }

        child = child.nextSibling
      }
    }
  }
}
