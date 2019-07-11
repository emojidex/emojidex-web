export default class HistoryTab {
  constructor(userTab) {
    this.EC = userTab.palette.EC
    this.palette = userTab.palette
    this.tabPane = $('<div class=\'tab-pane\' id=\'tab-content-user-history\'></div>') // eslint-disable-line no-undef
  }

  createTabContent() {
    return this.EC.User.History.get().then(response => {
      return this.setHistoryEmoji(response)
    })
  }

  setHistoryEmoji(history) {
    this.tabPane.children().remove()
    this.tabPane.append(this.palette.setEmojiList('history', history))
    return this.createPagination()
  }

  createPagination() {
    const { meta } = this.EC.User.History
    const curPage = meta.total_count === 0 ? 0 : meta.page
    let maxPage = curPage === 0 ? 0 : Math.ceil(meta.total_count / this.EC.limit)
    if (!this.EC.User.authInfo.premium && !this.EC.User.authInfo.pro) {
      maxPage = 1
    }

    const callback = response => {
      this.tabPane.children().remove()
      this.tabPane.append(this.setHistoryEmoji(response))
    }

    const prevFunc = () => this.EC.User.History.prev(callback)
    const nextFunc = () => this.EC.User.History.next(callback)

    return this.tabPane.append(this.palette.getPagination('history', prevFunc, nextFunc, curPage, maxPage))
  }
}
