class AutoComplete {
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
    $(this.plugin.element).textcomplete(
      [{
        match: /\B\s:([\-+\w]*)$/,
        search: (term, callback) => {
          this.EC.Search.search(term, (response) => {
            callback($.map(response, (emoji) => {
              return emoji.code.indexOf(term) !== -1 ? emoji : null;
            }));
          });
        },
        template: (emoji) => {
          let emoji_tag_string = this.EC.Util.emojiToHTML(emoji, 'mdpi')
          let emoji_tag = $(emoji_tag_string)[0];
          if(emoji_tag.nodeName == 'A') {
            emoji_tag_string = emoji_tag.innerHTML;
          }
          return `${emoji_tag_string} ${emoji.code.replace(/\s/g, '_')}`;
        },
        replace: (emoji) => {
          if (this.plugin.element.contentEditable === 'true' && this.plugin.options.content_editable.insertImg) {
            return ` ${this.EC.Util.emojiToHTML(emoji, 'mdpi')} `
          } else {
            return ` :${emoji.code.replace(/\s/g, '_')}: `;
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
