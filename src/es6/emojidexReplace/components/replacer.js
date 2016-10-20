class Replacer {
  constructor() {
    this.promiseWaitTime = 5000;

    let ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\';
    this.regexpCode = RegExp(`:([^\\s${ignore}][^${ignore}]*[^${ignore}]):|:([^${ignore}]):`, 'g');

    this.targets = [];
    this.complete_num = 0;
  }

  setTargets(node) {
    if (!node.parentNode || !node.parentNode.isContentEditable) {
      let child = node.firstChild;
      return (() => {
        let result = [];
        while (child) {
          switch (child.nodeType) {
            case Node.ELEMENT_NODE:
              if ($(child).is(this.plugin.options.ignore)) {
                break;
              }
              if (child.isContentEditable) {
                break;
              }
              this.setTargets(child);
              break;
            case Node.TEXT_NODE:
              if (child.data.indexOf('function(') === -1) {
                if (child.data.match(/\S/)) { this.targets.push(child); }
              }
              break;
          }
          result.push(child = child.nextSibling);
        }
        return result;
      })();
    }
  }

  getEmojiTag(emoji) {
    let get_image_tag = emoji_code => {
      return `<img class='emojidex-emoji' src='${this.plugin.EC.cdn_url}${this.plugin.EC.size_code}/${this.replaceSpaceToUnder(emoji_code)}.png' title='${this.replaceUnderToSpace(emoji_code)}'></img>`;
    };

    let emoji_code = (emoji.code != null) ? emoji.code : emoji;
    if (emoji.link != null) {
      return `<a href='${emoji.link}'>${get_image_tag(emoji_code)}</a>`;
    } else {
      return get_image_tag(emoji_code);
    }
  }

  getLoadingTag(emoji_data, type) {
    return `<span class='emojidex-loading-icon' data-emoji='${emoji_data}' data-type='${type}'></span>`;
  }

  getLoadingElement(element) {
    return $(element.find('.emojidex-loading-icon'));
  }

  setLoadingTag(element) {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => reject(new Error('emojidex: setLoadingTag - Timeout'))
      , this.promiseWaitTime);

      this.targets = [];
      this.setTargets(element[0]);

      if (this.targets.length) {
        let checker = new CountChecker(this.targets.length, () => resolve()
        );
        return this.targets.map((target) =>
          ($(target).replaceWith(this.getAddedLoadingTagText(target)),
          checker.check()));
      } else {
        return resolve();
      }
    }
    );
  }

  getAddedLoadingTagText(target_element) {
    let replaced_text = target_element.data;
    replaced_text = replaced_text.replace(this.plugin.options.regexpUtf, matched_string => {
      return this.getLoadingTag(matched_string, 'utf');
    }
    );
    replaced_text = replaced_text.replace(this.regexpCode, matched_string => {
      return this.getLoadingTag(matched_string.replace(/:/g, ''), 'code');
    }
    );
    return replaced_text;
  }

  fadeOutLoadingTag_fadeInEmojiTag(element, emoji, match = true) {
    let emoji_tag = undefined;
    if (match) {
      emoji_tag = $(this.getEmojiTag(emoji)).hide();
    } else {
      emoji_tag = `:${emoji}:`;
    }

    return new Promise((resolve, reject) => {
      let timeout = setTimeout(() => reject(new Error('emojidex: fadeOutLoadingTag_fadeInEmojiTag - Timeout'))
      , this.promiseWaitTime);

      return element.fadeOut({
        duration: 'normal',
        done: () => {
          element.after(emoji_tag);
          element.remove();
          if (match) {
            return emoji_tag.fadeIn({
              duration: "fast",
              done: () => {
                return resolve();
              }
            });
          } else {
            return resolve();
          }
        }
      });
    }
    );
  }

  replaceSpaceToUnder(string) {
    return string.replace(/\s/g, '_');
  }

  replaceUnderToSpace(string) {
    return string.replace(/_/g, ' ');
  }
}
