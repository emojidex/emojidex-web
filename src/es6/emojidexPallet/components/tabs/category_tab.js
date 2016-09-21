class CategoryTab {
  constructor(pallet, category, length) {
    this.pallet = pallet;
    this.initialized = false;
    this.sort_type = 'score';
    this.category_name = category.code;
    this.tab_list = $(`<li id='tab-${category.code}' data-code='${category.code}'><a href='#tab-content-${category.code}' data-toggle='pill'><i class='emjdx-${category.code}'></a></li>`);
    this.tab_list.click(e => {
      return this.setCategory($(e.currentTarget).data('code'));
    }
    );

    this.tab_content = $(`<div class='tab-pane' id='tab-content-${category.code}'></div>`);
  }

  setCategory(category_name) {
    if (this.tab_data != null) {
      return this.pallet.EC.Categories.called_data = this.tab_data;
    } else {
      return this.setCategoryTabContent(category_name);
    }
  }

  setCategoryTabContent(category_name){
    this.initialized = true;
    this.category_name = category_name;
    return this.pallet.EC.Categories.getEmoji(
      category_name,
      (result_emoji, called_data) => {
        this.tab_data = called_data;
        this.tab_content.children().remove();

        this.tab_content.append(this.pallet.setEmojiList('category', result_emoji));

        let cur_page = this.pallet.EC.Categories.meta.total_count === 0 ? 0 : this.pallet.EC.Categories.cur_page;
        let max_page = Math.floor(this.pallet.EC.Categories.meta.total_count / this.pallet.EC.options.limit);
        if (this.pallet.EC.Categories.meta.total_count % this.pallet.EC.options.limit > 0) { max_page++; }
        let prev_func = () => this.pallet.EC.Categories.prev();
        let next_func = () => this.pallet.EC.Categories.next();
        let pagination = this.pallet.getPagination('category', prev_func, next_func, cur_page, max_page);
        pagination.append(this.pallet.getSorting(this));
        return this.tab_content.append(pagination);
      }
      ,
      {sort: this.sort_type}
    );
  }

  resetTabContent() {
    return this.setCategoryTabContent(this.category_name);
  }
}
