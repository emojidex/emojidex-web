export default class FavoriteTab {
  constructor(userTab) {
    this.EC = userTab.palette.EC
    this.palette = userTab.palette
    this.tabPane = $('<div class=\'tab-pane active\' id=\'tab-content-user-favorite\'></div>') // eslint-disable-line no-undef
  }

  async createTabContent() {
    const response = await this.EC.User.Favorites.get()
    return this.setFavoriteEmoji(response)
  }

  setFavoriteEmoji(favorites) {
    this.tabPane.children().remove()
    this.tabPane.append(this.palette.setEmojiList('favorite', favorites))
    return this.createPagination()
  }

  createPagination() {
    const curPage = this.EC.User.Favorites.meta.total_count === 0 ? 0 : this.EC.User.Favorites.curPage
    let maxPage = curPage === 0 ? 0 : this.EC.User.Favorites.maxPage
    // NOTE: 現時点のAPIではlimitをいくつに設定していようと１ページ目しか返ってこないので、実質ページ移動が不可能である。
    if (!this.EC.User.isSubscriber() && maxPage > 1) {
      maxPage = 1
    }

    const prevFunc = async () => {
      const response = await this.EC.User.Favorites.prev()
      this.setFavoriteEmoji(response)
    }

    const nextFunc = async () => {
      const response = await this.EC.User.Favorites.next()
      this.setFavoriteEmoji(response)
    }

    return this.tabPane.append(this.palette.getPagination('favorite', prevFunc, nextFunc, curPage, maxPage))
  }
}
