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
    const { meta } = this.EC.User.Favorites
    const curPage = meta.total_count === 0 ? 0 : meta.page
    let maxPage = curPage === 0 ? 0 : Math.ceil(meta.total_count / this.EC.limit)
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
