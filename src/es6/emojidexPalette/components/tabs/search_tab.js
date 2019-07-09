export default class SearchTab {
  constructor(palette) {
    this.palette = palette;
    this.initialized = false;
    this.sort_type = 'score';
    this.tab_list = "<li id='tab-search' class='pull-right'><a href='#tab-content-search' data-toggle='pill'><i class='emjdx-search'></a></li>";
    this.tab_content = this.getTabContent();
  }

  getTabContent() {
    let tab_content = $('<div class="tab-pane" id="tab-content-search"><div class="input-group"><input type="text" name="search" id="palette-emoji-search-input" class="form-control" placeholder="Search emoji"><span class="input-group-btn"></span></div></div>');
    tab_content.find('#palette-emoji-search-input').keypress(e => {
      if (e.keyCode === 13) {
        return this.searchEmojiInput();
      }
    }
    );

    let search_btn = $('<div class="btn btn-primary" id="palette-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></div>');
    search_btn.click(() => {
      return this.searchEmojiInput();
    }
    );
    tab_content.find('.input-group-btn').append(search_btn);

    return tab_content;
  }

  searchEmojiInput() {
    this.initialized = true;
    let search_word = $('#palette-emoji-search-input').val();
    if (search_word.length > 0) {
      return this.search(search_word);
    }
  }

  search(search_word) {
    this.search_word = search_word;
    return this.palette.EC.Search.search(search_word, result_emoji => {
      $('.search-emoji-list').remove();
      $('.search-pagination').remove();
      this.tab_content.append(this.palette.setEmojiList('search', result_emoji));

      let cur_page = this.palette.EC.Search.meta.total_count === 0 ? 0 : this.palette.EC.Search.cur_page;
      let max_page = Math.floor(this.palette.EC.Search.meta.total_count / this.palette.EC.options.limit);
      if (this.palette.EC.Search.meta.total_count % this.palette.EC.options.limit > 0) { max_page++; }
      let prev_func = () => this.palette.EC.Search.prev();
      let next_func = () => this.palette.EC.Search.next();
      let pagination = this.palette.getPagination('search', prev_func, next_func, cur_page, max_page);
      pagination.append(this.palette.getSorting(this));
      return this.tab_content.append(pagination);
    }
    , {sort: this.sort_type});
  }

  resetTabContent() {
    return this.search(this.search_word);
  }
}
