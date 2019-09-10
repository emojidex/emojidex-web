export default class HistoryTab {
  constructor(userTab) {
    this.EC = userTab.palette.EC
    this.palette = userTab.palette
    this.tabPane = $('<div class=\'tab-pane\' id=\'tab-content-user-history\'></div>') // eslint-disable-line no-undef
  }

  async createTabContent() {
    const response = await this.EC.User.History.get()
    return this.setHistoryEmoji(response)
  }

  setHistoryEmoji(history) {
    this.tabPane.children().remove()
    this.tabPane.append(this.palette.setEmojiList('history', history))
    return this.createPagination()
  }

  createPagination() {
    const curPage = this.EC.User.History.meta.total_count === 0 ? 0 : this.EC.User.History.curPage
    let maxPage = curPage === 0 ? 0 : this.EC.User.History.maxPage
    // NOTE: 現時点のAPIではlimitをいくつに設定していようと１ページ目しか返ってこないので、実質ページ移動が不可能である。
    if (!this.EC.User.isSubscriber() && maxPage > 1) {
      maxPage = 1
    }

    const prevFunc = async () => {
      const response = await this.EC.User.History.prev()
      this.setHistoryEmoji(response)
    }

    const nextFunc = async () => {
      const response = await this.EC.User.History.next()
      this.setHistoryEmoji(response)
    }

    return this.tabPane.append(this.palette.getPagination('history', prevFunc, nextFunc, curPage, maxPage))
  }
}
