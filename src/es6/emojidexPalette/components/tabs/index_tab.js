class IndexTab {
  constructor(palette) {
    this.palette = palette;
    this.initialized = false;
    this.sort_type = 'score';
    this.tab_list = $("<li id='tab-index' class='active'><a href='#tab-content-index' data-toggle='pill'><i class='emjdx-all'></a></li>");
    this.tab_content = $("<div class='tab-pane active' id='tab-content-index'></div>");
    this.setTabContent();
  }

  setTabContent() {
    this.initialized = true;
    return this.palette.EC.Indexes.index(
      (result_emoji, called_data) => {
        this.tab_data = called_data;
        this.tab_content.children().remove();

        this.tab_content.append(`<div class="emojidex-category-name emjdx-all">Index</div>`);
        this.tab_content.append(this.palette.setEmojiList('index', result_emoji));

        let cur_page = this.palette.EC.Indexes.meta.total_count === 0 ? 0 : this.palette.EC.Indexes.cur_page;
        let max_page = Math.floor(this.palette.EC.Indexes.meta.total_count / this.palette.EC.options.limit);
        if (this.palette.EC.Indexes.meta.total_count % this.palette.EC.options.limit > 0) { max_page++; }
        let prev_func = () => this.palette.EC.Indexes.prev();
        let next_func = () => this.palette.EC.Indexes.next();
        let pagination = this.palette.getPagination('index', prev_func, next_func, cur_page, max_page);
        pagination.append(this.palette.getSorting(this));
        return this.tab_content.append(pagination);
      }
      ,
      {sort: this.sort_type}
    );
  }

  resetTabContent() {
    return this.setTabContent();
  }
}
