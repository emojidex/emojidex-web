class CustomizationTab {
  constructor(palette) {
    this.palette = palette;
    this.initialized = false;
    this.tab_list = "<li id='tab-customization' class='pull-right'><a href='#tab-content-customization' data-toggle='pill'><i class='emjdx-customization'></a></li>";
    this.tab_content = this.getTabContent();
    this.getBaseEmoji();
  }

  getTabContent() {
    return $('<div class="tab-pane" id="tab-content-customization"><div class="emojidex-category-name emjdx-customization">Customization</div></div>');
  }

  getBaseEmoji() {
    // TODO APIができたら変更する。
    const familyJson = JSON.parse( '{"code":"family","moji":"👪","unicode":"1f46a","category":"people","tags":[],"link":null,"base":"family","variants":["family(wh)","family(p)","family(ye)","family(br)","family(bk)","family"],"score":36,"r18":false,"customizations":[{"base":"family","component_layer_order":[0,1,2,3,4],"components":[["man","man(wh)","man(p)","man(ye)","man(br)","man(bk)","woman","woman(wh)","woman(p)","woman(ye)","woman(br)","woman(bk)"],["woman","woman(wh)","woman(p)","woman(ye)","woman(br)","woman(bk)","man","man(wh)","man(p)","man(ye)","man(br)","man(bk)",""],["boy","boy(wh)","boy(p)","boy(ye)","boy(br)","boy(bk)","girl","girl(wh)","girl(p)","girl(ye)","girl(br)","girl(bk)",""],["girl","girl(wh)","girl(p)","girl(ye)","girl(br)","girl(bk)","boy","boy(wh)","boy(p)","boy(ye)","boy(br)","boy(bk)",""],["baby","baby(wh)","baby(p)","baby(ye)","baby(br)","baby(bk)",""]]}],"combinations":[]}');

    const button = $('<button class="emoji-btn btn btn-default pull-left"><img alt="family" title="family" class="img-responsive center-block" src="https://cdn.emojidex.com/emoji/px32/family.png"></button>');
    button.click(() => {
      this.createEditView(familyJson);
    });
    const emojiList = $('<div class="customization-emoji-list clearfix"></div>');
    this.tab_content.append(emojiList.append(button));

    // return this.palette.EC.Search.search('family', result_emoji => {
    //   $('.customization-emoji-list').remove();
    //   $('.customization-pagination').remove();
    //   this.tab_content.append(this.palette.setEmojiList('customization', result_emoji));
    //
    //   let cur_page = this.palette.EC.Search.meta.total_count === 0 ? 0 : this.palette.EC.Search.cur_page;
    //   let max_page = Math.floor(this.palette.EC.Search.meta.total_count / this.palette.EC.options.limit);
    //   if (this.palette.EC.Search.meta.total_count % this.palette.EC.options.limit > 0) { max_page++; }
    //   let prev_func = () => this.palette.EC.Search.prev();
    //   let next_func = () => this.palette.EC.Search.next();
    //   let pagination = this.palette.getPagination('customization', prev_func, next_func, cur_page, max_page);
    //   pagination.append(this.palette.getSorting(this));
    //   return this.tab_content.append(pagination);
    // });
  }

  createEditView(emoji) {
    const content = $(`<div class="customization-info on">
      <div class="btn-close" aria-hidden="true"><i class="emjdx-abstract flip-vertical"></i></div>
      <div class="emoji-name">${emoji.customizations[0].base}</div>
      <div class="clearfix"></div>
      <hr>
      <div class="customization-emoji mt-m">
        <div class="customization-preview pull-left text-center"></div>
        <div class="customization-select pull-right"></div>
        <div class="clearfix"></div>
        <div class="text-center mt-m"><button class="insert-button btn btn-default">Insert</button></div>
      </div>
    </div>`);

    content.find('.insert-button').click(() => {
      if ($('.customization-preview').children()) {
        // TODO:
        console.log('!!!!!')
      }
    });
    content.find('.btn-close').click(() => { $('.customization-info').remove(); });

    this.tab_content.append(content);
    this.createSelect(emoji);
  }

  createSelect(emoji) {
    const components = emoji.customizations[0].components;
    const selectPromises = [];
    for (let i = 0; i < components.length; i++) {
      selectPromises.push(new Promise((selectResolve, selectReject) => {
        // create options
        const component = components[i];
        const optionPromises = [];
        for (let j = 0; j < component.length; j++ ) {
          if (component[j]) {
            optionPromises.push(new Promise((optionResolve, optionReject) => {
              this.palette.EC.Search.find(component[j], (result) => {
                const url = `https://${this.palette.EC.env.cdn_addr}/emoji/px32/${emoji.customizations[0].base}/${i}/${this.palette.EC.Util.escapeTerm(result.code)}.png`;
                optionResolve({ order: j, element: $(`<option value="${result.moji}" data-url="${url}">${result.code}</option>`) });
              });
            }));
          } else {
            optionPromises.push(new Promise((optionResolve, optionReject) => {
              optionResolve({ order: j, element: $(`<option></option>`) });
            }));
          }
        }

        // set options to select-tag
        Promise.all(optionPromises).then((options) => {
          const select = $('<select class="form-control zwj-selects"></select>');
          options.sort((a, b) => { return a.order < b.order ? -1 : 1; });
          options.forEach((option) => { select.append(option.element); });
          selectResolve({ order: i, element: $(`<div class="mt-m"></div>`).append(select) });
        });
      }));
    }

    // set selects to div-tag
    Promise.all(selectPromises).then((selects) => {
      selects.sort((a, b) => { return a.order < b.order ? -1 : 1; });
      selects.forEach((select) => { $('.customization-select').append(select.element); });
      this.setZWJEmojis();
      this.setIconSelectMenu();
    });
  }

  setZWJEmojis() {
    $('.customization-preview').empty();

    const values = [];
    $('.zwj-selects').each((i, select) => { values.push($(select).val()); });
    this.palette.EC.Util.emojifyToHTML(values.join('\u{200d}')).then((result) => {
      $('.customization-preview').append(result);
    });
  }

  setIconSelectMenu() {
    $.widget('custom.iconselectmenu', $.ui.selectmenu, {
      _renderItem: function( ul, item ) {
        const span = $('<span class="ui-icon"></span>');
        if (item.element.data('url')) span.append(`<img src=${item.element.data('url')} />`);

        const wrapper = $('<div>', { text: item.label });
        wrapper.append(span);

        return $('<li>').append(wrapper).appendTo(ul);
      }
    });

    $('.zwj-selects').each((i, element) => {
      $(element).iconselectmenu({
        appendTo: '#tab-content-customization',
        change: (event, ui) => { this.setZWJEmojis(); }
      }).iconselectmenu('menuWidget')
        .addClass('ui-menu-icons');
    });
  }
}
