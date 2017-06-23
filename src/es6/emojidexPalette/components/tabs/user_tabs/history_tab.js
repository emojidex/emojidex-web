class HistoryTab {
  constructor(user_tab) {
    this.EC = user_tab.palette.EC;
    this.palette = user_tab.palette;
    this.tab_pane = $(`<div class='tab-pane' id='tab-content-user-history'></div>`);
  }

  createTabContent() {
    return this.EC.User.History.get().then(response => {
      return this.setHistoryEmoji(response);
    });
  }

  setHistoryEmoji(history) {
    this.tab_pane.append(this.palette.setEmojiList('history', history));
    return this.createPagination()
  }

  createPagination() {
    let meta = this.EC.User.History.meta
    let cur_page = meta.total_count === 0 ? 0 : meta.page;
    let max_page = cur_page === 0 ? 0 : Math.ceil(meta.total_count / this.EC.limit);
    if (!this.EC.User.auth_info.premium) {
      max_page = 1;
    }

    let callback = response => {
      this.tab_pane.children().remove();
      this.tab_pane.append(this.setHistoryEmoji(response));
    }
    let prev_func = () => this.EC.User.History.prev(callback);
    let next_func = () => this.EC.User.History.next(callback);

    return this.tab_pane.append(this.palette.getPagination('history', prev_func, next_func, cur_page, max_page));
  }
}
