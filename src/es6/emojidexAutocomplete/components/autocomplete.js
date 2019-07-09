import EmojidexClient from 'emojidex-client/src/es6/client.js'
import { Textcomplete, Textarea } from 'textcomplete'
import Contenteditable from 'textcomplete.contenteditable'

export default class AutoComplete {
  constructor(plugin) {
    this.plugin = plugin
    this.EC = new EmojidexClient({
      onReady: () => {
        this.EC.User.login('session')
        this.setAutoComplete()
      }
    })
  }

  setAutoComplete() {
    let editor
    let className = 'dropdown-menu textcomplete-dropdown '
    if (this.plugin.element.isContentEditable) {
      className += 'dropdown-contenteditable'
      editor = new Contenteditable(this.plugin.element)
      editor.applySearchResult = function (searchResult) {
        const before = this.getBeforeCursor()
        const after = this.getAfterCursor()
        if (before !== null && after !== null) {
          const replace = searchResult.replace(before, after)
          if (Array.isArray(replace)) {
            const range = this.getRange()
            range.selectNode(range.startContainer)
            this.document.execCommand('insertHTML', false, replace[0] + replace[1])
            range.collapse(false)
          }
        }
      }
    } else {
      className += 'dropdown-textarea'
      editor = new Textarea(this.plugin.element)
    }

    const textcomplete = new Textcomplete(editor, { dropdown: { className } })
    textcomplete.register(
      [{
        match: /[：:]([^ ：:;@&#~\/\!\$\+\?\%\*\f\n\r]+)$/, // eslint-disable-line no-useless-escape
        search: (term, callback) => {
          this.EC.Search.search(term, response => {
            const replacedTerm = term.replace(/_/g, ' ')
            callback($.map(response, emoji => { // eslint-disable-line no-undef
              return emoji.code.indexOf(replacedTerm) === -1 ? null : emoji
            }))
          })
        },
        template: emoji => {
          let emojiTagString = this.EC.Util.emojiToHTML(emoji)
          const emojiTag = $(emojiTagString)[0] // eslint-disable-line no-undef
          if (emojiTag.nodeName === 'A') {
            emojiTagString = emojiTag.innerHTML
          }

          return `${emojiTagString} ${emoji.code.replace(/\s/g, '_')}`
        },
        replace: emoji => {
          this.EC.Data.storage.updateCache('emojidex').then(() => {
            const authInfo = this.EC.Data.storage.get('emojidex.auth_info')
            if (authInfo !== null && authInfo.token !== null) {
              this.EC.User.syncUserData()
              this.EC.User.History.set(emoji.code.replace(/\s/g, '_'))
            }
          })
          if (this.plugin.element.isContentEditable && this.plugin.options.contentEditable.insertImg) {
            return `${this.EC.Util.emojiToHTML(emoji)} `
          }

          return `:${emoji.code.replace(/\s/g, '_')}:`
        },
        index: 1
      }],
      {
        maxCount: this.plugin.options.listLimit
      }
    )
    if (typeof this.plugin.options.onComplete === 'function') {
      this.plugin.options.onComplete(this.plugin.element)
    }
  }
}
