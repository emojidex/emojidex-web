import EmojidexClient from 'emojidex-client/src/es6/client.js'
import { Textcomplete, Textarea } from 'textcomplete'
import Contenteditable from 'textcomplete.contenteditable'

export default class AutoComplete {
  constructor(plugin) {
    this.plugin = plugin;
    this.EC = new EmojidexClient({
      onReady: (EC) => {
        this.EC.User.login('session');
        this.setAutoComplete();
      }
    });
  }

  setAutoComplete() {
    let editor;
    if (this.plugin.element.contentEditable === 'true') {
      editor = new Contenteditable(this.plugin.element);
      editor.applySearchResult = function(searchResult) {
        const before = this.getBeforeCursor();
        const after = this.getAfterCursor();
        if (before != null && after != null) {
          const replace = searchResult.replace(before, after);
          if (Array.isArray(replace)) {
            const range = this.getRange();
            range.selectNode(range.startContainer);
            this.document.execCommand('insertHTML', false, replace[0] + replace[1]);
            range.collapse(false);
          }
        }
      }
    } else {
      editor = new Textarea(this.plugin.element);
    }
    const textcomplete = new Textcomplete(editor);
    textcomplete.register(
      [{
        match: /[：:]([^ ：:;@&#~\/\!\$\+\?\%\*\f\n\r]+)$/,
        search: (term, callback) => {
          this.EC.Search.search(term, (response) => {
            let replaced_term = term.replace(/_/g, ' ');
            callback($.map(response, (emoji) => {
              return emoji.code.indexOf(replaced_term) !== -1 ? emoji : null;
            }));
          });
        },
        template: (emoji) => {
          let emoji_tag_string = this.EC.Util.emojiToHTML(emoji)
          let emoji_tag = $(emoji_tag_string)[0];
          if(emoji_tag.nodeName == 'A') {
            emoji_tag_string = emoji_tag.innerHTML;
          }
          return `${emoji_tag_string} ${emoji.code.replace(/\s/g, '_')}`;
        },
        replace: (emoji) => {
          this.EC.Data.storage.update_cache('emojidex').then(() => {
            if (this.EC.Data.storage.get('emojidex.auth_info') != null) {
              this.EC.User.syncUserData();
              this.EC.User.History.set(emoji.code.replace(/\s/g, '_'));
            }
          })
          if (this.plugin.element.contentEditable === 'true' && this.plugin.options.content_editable.insertImg) {
            return `${this.EC.Util.emojiToHTML(emoji)} `
          } else {
            return `:${emoji.code.replace(/\s/g, '_')}:`;
          }
        },
        index: 1,
      }],
      {
        maxCount: this.plugin.options.listLimit
      }
    );
    if (typeof this.plugin.options.onComplete === "function") {
      this.plugin.options.onComplete(this.plugin.element);
    }
  }
}
