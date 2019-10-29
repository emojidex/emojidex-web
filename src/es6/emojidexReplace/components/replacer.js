export default class Replacer {
  constructor(plugin) {
    this.plugin = plugin
    this.targets = []
    this.limit = 16
    this.count = 0
  }

  async loadEmoji(element) {
    if (element) {
      this.setTargets(element)
    } else if (this.plugin.element !== null) {
      this.setTargets(this.plugin.element[0])
    }

    if (this.targets.length === 0) {
      return
    }

    for (let i = 0; i < this.targets.length; i++) {
      const targetNode = this.targets[i]
      let newText
      if (this.plugin.options.threed && this.count < this.limit) {
        newText = await this.plugin.EC.Util.emojifyToThreed(targetNode.data, this.count === 0) // eslint-disable-line no-await-in-loop
        this.count += newText.split('emojidex-scene').length - 1
      } else {
        newText = await this.plugin.EC.Util.emojifyToHTML(targetNode.data) // eslint-disable-line no-await-in-loop
      }

      $(targetNode).replaceWith(newText) // eslint-disable-line no-undef
    }

    this.targets = []

    if (this.plugin.options.threed) {
      this.plugin.EC.Threed.initialize($('#emojidex-canvas')[0]) // eslint-disable-line no-undef

      const elements = $('.emojidex-scene') // eslint-disable-line no-undef
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        this.plugin.EC.Threed.addScene(element.dataset.code, element.dataset.address, element)
      }
    }
  }

  tagEscape(string) {
    return string.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  setTargets(node) {
    let child
    if (node.nodeType === Node.TEXT_NODE && node.data.match(/\S/)) {
      this.targets.push(node)
      return
    }

    if (node.parentNode && node.parentNode.isContentEditable) {
      return
    }

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
