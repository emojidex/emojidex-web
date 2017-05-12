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
        match: /\B:([\-+\w]*)$/,
        search: (term, callback) => {
          this.EC.Search.search(term, (response) => {
            callback($.map(response, (emoji) => {
              return emoji.code.indexOf(term) !== -1 ? emoji.code : null;
            }));
          });
        },
        template: (value) => {
          value = value.replace(/\s/g, '_');
          return `<img src='https://cdn.emojidex.com/emoji/mdpi/${value}.png'></img> ${value}`;
        },
        replace: (value) => {
          value = value.replace(/\s/g, '_');
          if (this.plugin.element.contentEditable === 'true' && this.plugin.options.content_editable.insertImage) {
            return `<img src='https://cdn.emojidex.com/emoji/mdpi/${value}.png'></img>`;
          } else {
            return `:${value}:`;
          }
        },
        index: 1,
      }],
      {
        maxCount: this.plugin.options.listLimit
      }
    );
  }
}
