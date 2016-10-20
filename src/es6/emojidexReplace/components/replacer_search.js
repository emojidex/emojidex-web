class ReplacerSearch extends Replacer {
  constructor(plugin) {
    this.plugin = plugin;
    super(...arguments);
  }

  loadEmoji(target_element) {
    // for useLoadingImg: true --------
    let searchEmoji_setEmojiTag = element => {
      let replaceToEmojiIconOrRollback = loading_element => {
        return new Promise((resolve, reject) => {
          let emoji_code = loading_element.dataset.emoji;
          let timeout = setTimeout(() => {
            this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), emoji_code, false);
            return reject(new Error('emojidex: replaceToEmojiIconOrRollback - Timeout'));
          }
          , this.promiseWaitTime);

          return this.plugin.EC.Search.find(emoji_code, emoji => {
            if (emoji.statusText === 'Not Found') {
              return this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), emoji_code, false).then(() => resolve());
            } else if (emoji.r18 === true && this.plugin.EC.User.auth_info.r18 === false) {
              return this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), emoji.code, false).then(() => resolve());
            } else {
              return this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), emoji).then(() => resolve());
            }
          }
          );
        }
        );
      };

      // start: searchEmoji_setEmojiTag --------
      return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject(new Error('emojidex: searchEmoji_setEmojiTag - Timeout'))
        , this.promiseWaitTime);

        let loading_elements = $('.emojidex-loading-icon');
        if (loading_elements.length) {
          let checker = new CountChecker(loading_elements.length, () => resolve()
          );
          return loading_elements.map((loading_element) =>
            (() => { switch (loading_element.dataset.type) {
              case 'code':
                let item = replaceToEmojiIconOrRollback(loading_element).then(() => checker.check());
                break;
              case 'utf':
                item = (() => {
                  let result = [];
                  for (let emoji in this.plugin.options.utfEmojiData) {
                    let item1;
                    if (emoji === loading_element.dataset.emoji) {
                      item1 = this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), this.plugin.options.utfEmojiData[emoji]).then(() => checker.check());
                    }
                    result.push(item1);
                  }
                  return result;
                })();
                break;
            } })());
        } else {
          return resolve();
        }
      }
      );
    };

    // for useLoadingImg: false --------
    let setEmojiTag = element => {
      let replaced_text = element.textContent.replace(this.plugin.options.regexpUtf, matched_string => {
        for (let emoji in this.plugin.options.utfEmojiData) {
          if (emoji === matched_string) {
            this.emoji_tags++;
            let emoji_tag = this.getEmojiTag(this.plugin.options.utfEmojiData[emoji]);
            return emoji_tag;
          }
        }
      }
      );

      let matched_codes = replaced_text.match(this.regexpCode);
      let replaced_promise = new Promise((resolve, reject) => {
        if (__guard__(matched_codes, x => x.length)) {
          let code_only;
          let timeout = setTimeout(() => reject(new Error('emojidex: setEmojiTag - Timeout'))
          , this.promiseWaitTime);

          let checker = new CountChecker(matched_codes.length, () => resolve()
          );

          return matched_codes.map((code) =>
            (code_only = code.replace(/\:/g, ''),


            this.plugin.EC.Search.find(code_only, emoji=> {
              if (emoji.r18 === true && this.plugin.EC.User.auth_info.r18 === false) {
                resolve();
                return;
              }

              let emoji_image = $(`<img src='${this.plugin.EC.cdn_url}px8/${this.replaceSpaceToUnder(code_only)}.png' data-code='${code_only}'></img>`);
              emoji_image.on('load', e => {
                replaced_text = replaced_text.replace(`:${e.currentTarget.dataset.code}:`, this.getEmojiTag(emoji));
                return checker.check();
              }
              );
              return emoji_image.on('error', e => {
                return checker.check();
              }
              );
            }
            )));
        } else {
          return resolve();
        }
      }
      );

      return replaced_promise.then(() => $(element).replaceWith(replaced_text));
    };

    // start: loadEmoji --------
    let element = target_element || this.plugin.element;
    if (this.plugin.options.useLoadingImg) {
      return this.setLoadingTag(element).then(() => {
        return searchEmoji_setEmojiTag(element);
      }
      );
    } else {
      return new Promise((resolve, reject) => {
        let timeout = setTimeout(() => reject(new Error('emojidex: loadEmoji useLoadingImg: false - Timeout'))
        , this.promiseWaitTime);

        this.targets = [];
        this.setTargets(element[0]);

        if (this.targets.length) {
          let checker = new CountChecker(this.targets.length, () => resolve()
          );
          return this.targets.map((target) =>
            setEmojiTag(target).then(e => {
              return checker.check();
            }
            ));
        } else {
          return resolve();
        }
      }
      );
    }
  }
}

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
