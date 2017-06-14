class FavoriteTab {
  constructor(user_tab) {
    this.EC = user_tab.palette.EC;
    this.palette = user_tab.palette;
    this.tab_pane = $(`<div class='tab-pane active' id='tab-content-user-favorite'></div>`);
  }

  createTabContent() {
    return this.EC.User.Favorites.get().then(response => {
      return this.setFavoriteEmoji(response.emoji);
    });
  }

  setFavoriteEmoji(favorites) {
    this.tab_pane.append(this.palette.setEmojiList('favorite', favorites));
    return this.createPagination()
  }

  createPagination() {
    let meta = this.EC.User.Favorites.meta;
    let cur_page = meta.total_count === 0 ? 0 : meta.page;
    let max_page = cur_page === 0 ? 0 : Math.ceil(meta.total_count / this.EC.limit);
    if (!this.EC.User.auth_info.premium) {
      max_page = 1;
    }

    let callback = response => {
      this.tab_pane.children().remove();
      this.tab_pane.append(this.setFavoriteEmoji(response));
    }
    let prev_func = () => this.EC.User.Favorites.prev(callback);
    let next_func = () => this.EC.User.Favorites.next(callback)

    return this.tab_pane.append(this.palette.getPagination('favorite', prev_func, next_func, cur_page, max_page));
  }
}
