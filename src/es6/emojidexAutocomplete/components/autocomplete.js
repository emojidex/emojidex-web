class AutoComplete {
  constructor(plugin) {
    this.plugin = plugin;
    this.searching_num = 0;
    this.EC = new EmojidexClient({
      onReady: EC => {
        this.EC.User.login('session');
        return this.setAutoComplete();
      }
    });
  }

  setAutoComplete() {
    let setAtwho = at_options => {
      $(this.plugin.element).atwho(at_options).on('reposition.atwho', e => $(e.currentTarget).atwho(at_options)
      ).on('hidden.atwho', e => $(e.currentTarget).atwho(at_options)
      );
      if (typeof this.plugin.options.onComplete === "function") {
        return this.plugin.options.onComplete(this.plugin.element);
      }
    };

    let setSearchedEmojiData = (at_obj, match_string) => {
      let updateAtwho = function(search_results, at_bak) {
        let at_options = {
          data: search_results,
          callbacks: {
            highlighter: onHighlighter,
            matcher(flag, subtext, should_startWithSpace) {
              let match;
              return match = getMatchString(subtext, getRegexp(flag, should_startWithSpace));
            }
          }
        };

        return at_bak.$inputor.atwho('destroy').atwho($.extend({}, at_bak.setting, at_options)).atwho('run');
      };

      // start: setSearchedEmojiData --------
      let num = ++this.searching_num;
      this.EC.Search.search(match_string, response => {

        let search_results = [];
        for (let i = 0; i < this.EC.Search.results.length; i++) {
          let emoji = this.EC.Search.results[i];
          search_results.push({
            code: emoji.code.replace(/\s/g, '_'),
            img_url: `${this.EC.cdn_url}${this.EC.size_code}/${emoji.code.replace(/\s/g, '_')}.png`,
            insert_tag: this.EC.Util.emojiToHTML(emoji)
          });
        }

        if (this.searching_num === num) {
          if (search_results.length) { updateAtwho(search_results, at_obj); }
          return this.searching_num = 0;
        }
      }
      );

      return match_string;
    };

    var getRegexp = function(flag, should_startWithSpace) {
      return regexp = new RegExp(`[：${flag}]([^：:;@&#~\!\$\+\?\%\*\f\n\r\\\/]+)$`,'gi');
    };

    var getMatchString = function(subtext, regexp) {
      let match = regexp.exec(subtext);
      match = match ? match[2] || match[1] : null;
      return match;
    };

    var onHighlighter = function(li, query) {
      if (!query) { return li; }
      let regexp = new RegExp(`>\\s*([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*?)(${query.replace(/(\(|\))/g, '\\$1')})([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*)\\s*<`, 'ig');
      return li.replace(regexp, (str, $1, $2, $3) => `> ${$1}<strong>${$2}</strong>${$3} <`);
    };

    // start: setAutoComplete --------
    let at_init = {
      at: ':',
      suffix: '',
      limit: this.plugin.options.listLimit,
      search_key: "code",
      tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20'></img>${code}</li>",
      insert_tpl: this.plugin.options.insertImg ? "${insert_tag}" : ":${code}:",
      callbacks: {
        highlighter: onHighlighter,
        matcher(flag, subtext, should_startWithSpace) {
          let match = getMatchString(subtext, getRegexp(flag, should_startWithSpace));
          if (match) { return setSearchedEmojiData(this, match); }
        }
      }
    };

    return setAtwho(at_init);
  }
}
