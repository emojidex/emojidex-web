class Palette {
  constructor(plugin) {
    this.plugin = plugin;
    this.active_input_area = null;
    this.tabs = [];
    this.EC = new EmojidexClient({
      limit: this.plugin.options.paletteEmojisLimit,
      onReady: EC => {
        // start main --------
        $('input, textarea, [contenteditable="true"]').on('focus keyup mouseup', e => {
          return this.active_input_area = $(e.currentTarget);
        });

        this.createDialog();
        this.setPalette(this.plugin.element);
        if ($(this.plugin.element).attr('type') === 'text' || $(this.plugin.element).prop('tagName') === 'TEXTAREA') {
          this.addButton(this.plugin.element);
        } else {
          this.addPaletteToElement(this.plugin.element);
        }

        if (typeof this.plugin.options.onComplete === "function") {
          this.plugin.options.onComplete();
        }
      }
    });
  }

  createDialog() {
    if ($('#emojidex-dialog-content').length !== 0) return;

    this.dialog = $('<div id="emojidex-dialog-content"></div>');
    return this.dialog.dialog({
      classes: {
        'ui-dialog': 'emojidex-ui-dialog'
      },
      autoOpen: false,
      width: 557,
      title: 'emojidex',

      create(e) {
        $('.ui-dialog-titlebar-close').hide();

        let close_btn = $('<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        close_btn.click(e => $('#emojidex-dialog-content').dialog('close'));

        $('.ui-dialog-titlebar').append(close_btn);
        $('.ui-dialog-title').html('<a target="_blank" href="https://www.emojidex.com"><img src="https://cdn.emojidex.com/logo-hdpi.png" alt="emojidex" /></a>');
        return $('.emojidex-ui-dialog').wrap('<span id="emojidex-emoji-palette"></span>');
      },

      open(e) {
        $('.ui-dialog :button').blur();
        return $('.nav.nav-pills a').blur();
      }
    });
  }

  setPalette(element) {
    if ($('#emoji-palette').length !== 0) return;

    let tab_list = $('<ul class="nav nav-pills"></ul>');
    let tab_content = $('<div class="tab-content"></div>');

    return this.EC.Categories.sync(categories => {
      this.tabs.push(new IndexTab(this));
      for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        this.tabs.push(new CategoryTab(this, category, tab_list[0].children.length));
      }

      this.tabs.push(new UserTab(this));
      this.tabs.push(new SearchTab(this));

      for (let j = 0; j < this.tabs.length; j++) {
        let tab = this.tabs[j];
        tab_list.append(tab.tab_list);
        tab_content.append(tab.tab_content);
      }

      this.emoji_palette = $('<div id="emoji-palette" class="emoji-palette"></div>');
      this.emoji_palette.append(tab_list.add(tab_content));
      this.emoji_palette.find('ul').after('<hr>');

      return this.dialog.append(this.emoji_palette);
    });
  }

  setEmojiList(kind, emoji_list) {
    let emoji_divs = $(`<div class='${kind}-emoji-list clearfix'></div>`);
    for (let i = 0; i < emoji_list.length; i++) {
      let emoji = emoji_list[i];
      let emoji_button = $('<button>',
        {class: 'emoji-btn btn btn-default pull-left'});
      emoji_button.prop('emoji_data', emoji);

      let emoji_button_image = $('<img>', {
        alt: `${emoji.code}`,
        title: `${emoji.code}`,
        class: 'img-responsive center-block',
        src: `${this.EC.cdn_url}px32/${emoji.code.replace(/\s/g, '_')}.png`
      }
      );

      emoji_button.append(emoji_button_image);
      emoji_button.click(e=> {
        return this.insertEmojiAtCaret($(e.currentTarget).prop('emoji_data'));
      }
      );
      emoji_divs.append(emoji_button);
    }
    return emoji_divs;
  }

  mojiOrCode(emoji) {
    if (emoji.moji !== null && emoji.moji !== '') { return emoji.moji; } else { return `:${emoji.code}:`; }
  }

  insertEmojiAtCaret(emoji) {
    let code = this.mojiOrCode(emoji);
    if (this.clipboard) { this.clipboard.destroy(); }

    if (this.EC.User.auth_info.token !== null) {
      this.EC.User.History.set(emoji.code.replace(/\s/g, '_'));
    }

    if (this.active_input_area === null) {
      this.clipboard = new Clipboard('.emoji-btn', {
        text(e) {
          return code;
        }
      }
      );
      return;
    }

    let elem = this.active_input_area;
    if (elem.is('[contenteditable="true"]')) {
      elem.focus();
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);

      let tag = $.parseHTML(this.EC.Util.emojiToHTML(emoji));
      range.insertNode(tag[0]);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);

      return elem.change();
    } else {
      let pos = elem.caret('pos');
      let txt = elem.val();
      let startTxt = txt.substring(0,  pos);
      let stopTxt = txt.substring(pos, txt.length);
      elem.val(startTxt + code + stopTxt);
      elem.focus();
      return elem.caret('pos', pos + code.length);
    }
  }

  getPagination(kind, prev_func, next_func, cur_page, max_page) {
    let pagination = $(`<div class='${kind}-pagination text-center'><ul class='pagination mb-0'></ul></div>`);

    pagination.find('.pagination')
      .append($(`<li class="palette-pager${(cur_page > 1) ? '' : ' disabled'}"><span>&laquo;</span></li>`).click(() => {
        if (cur_page > 1) return prev_func();
    }));
    pagination.find('.pagination').append($(`<li class='palette-num disabled'><span>${cur_page} / ${max_page}</span></li>`));
    pagination.find('.pagination')
      .append($(`<li class="palette-pager${(cur_page < max_page) ? ' ' : ' disabled'}"><span>&raquo;</span></li>`).click(() => {
        if (cur_page < max_page) return next_func();
    }));

    return pagination;
  }

  toggleSorting() {
    if (this.EC.User.auth_info.premium) {
      return (() => {
        let result = [];
        let iterable = this.getInitializedTabs();
        for (let i = 0; i < iterable.length; i++) {
          let tab = iterable[i];
          let item;
          if (!tab.tab_content.find('#sort-selector').length) {
            item = tab.tab_content.find('ul.pagination').after(this.getSorting(tab));
          }
          result.push(item);
        }
        return result;
      })();
    } else {
      return this.getInitializedTabs().map((tab) =>
        this.removeSorting(tab));
    }
  }

  getInitializedTabs() {
    let initialized_tabs = [];
    for (let i = 0; i < this.tabs.length; i++) {
      let tab = this.tabs[i];
      if (tab.initialized) { initialized_tabs.push(tab); }
    }
    return initialized_tabs;
  }

  getSorting(target_tab) {
    if (!this.EC.User.auth_info.premium) { return ''; }
    let sort_selector = $('<select id="sort-selector" class="form-control pull-right"></select>');
    sort_selector.append($('<option value="score">Score</option>'));
    sort_selector.append($('<option value="newest">Newest</option>'));
    sort_selector.append($('<option value="liked">Most Liked</option>'));
    sort_selector.val(target_tab.sort_type);
    sort_selector.change(function() {
      target_tab.sort_type = sort_selector.val();
      return target_tab.resetTabContent();
    });
    return sort_selector;
  }

  removeSorting(target_tab) {
    target_tab.tab_content.find('#sort-selector').remove();
    return target_tab.resetTabContent();
  }

  openDialog() {
    return $('#emojidex-dialog-content').dialog('open');
  }

  addButton(element) {
    const reposition = (e) => {
      margin = 5;
      position = $(element).position();
      position.top += margin;
      position.left += $(element).outerWidth() - palette_button.outerWidth() - margin;
      palette_button.css(position);
    }

    let palette_button = $('<i class="emojidex-palette-button emjdx-faces">');
    palette_button.click(() => { this.openDialog(); });

    $(element).addClass('with-emojidex-palette');
    $(element).hover(reposition);
    $(element).focus(reposition);
    reposition();

    return $(element).after(palette_button);
  }

  addPaletteToElement(element) {
    return $(element).click(() => { this.openDialog(); });
  }
}
