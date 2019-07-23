export default class FavoriteTab {
  constructor(userTab) {
    this.EC = userTab.palette.EC
    this.palette = userTab.palette
    this.tabPane = $('<div class=\'tab-pane active\' id=\'tab-content-user-favorite\'></div>') // eslint-disable-line no-undef
  }

  createTabContent() {
    return this.EC.User.Favorites.get().then(response => {
      return this.setFavoriteEmoji(response)
    })
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
    if (!this.EC.User.authInfo.premium && !this.EC.User.authInfo.pro) {
      maxPage = 1
    }

    const callback = response => {
      this.tabPane.children().remove()
      this.tabPane.append(this.setFavoriteEmoji(response))
    }

    const prevFunc = () => this.EC.User.Favorites.prev(callback)
    const nextFunc = () => this.EC.User.Favorites.next(callback)

    return this.tabPane.append(this.palette.getPagination('favorite', prevFunc, nextFunc, curPage, maxPage))
  }
}
