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
    return this.palette.EC.Search.search('family', result_emoji => {
      $('.customization-emoji-list').remove();
      // $('.customization-pagination').remove();
      this.tab_content.append(this.palette.setEmojiList('customization', result_emoji));

      // let cur_page = this.palette.EC.Search.meta.total_count === 0 ? 0 : this.palette.EC.Search.cur_page;
      // let max_page = Math.floor(this.palette.EC.Search.meta.total_count / this.palette.EC.options.limit);
      // if (this.palette.EC.Search.meta.total_count % this.palette.EC.options.limit > 0) { max_page++; }
      // let prev_func = () => this.palette.EC.Search.prev();
      // let next_func = () => this.palette.EC.Search.next();
      // let pagination = this.palette.getPagination('customization', prev_func, next_func, cur_page, max_page);
      // pagination.append(this.palette.getSorting(this));
      // return this.tab_content.append(pagination);
    });
  }
}
