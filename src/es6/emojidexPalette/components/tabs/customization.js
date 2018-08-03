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
    this.tab_content.append(`<div class="user-info on">
      <div class="btn-close" aria-hidden="true"><i class="emjdx-abstract flip-vertical"></i></div>
      <div class="user-name">${emoji.base}</div>
      <div class="clearfix"></div>
      <hr>
      <div class="customization-emoji-list clearfix">aaa</div>
    </div>`);
  }
}
