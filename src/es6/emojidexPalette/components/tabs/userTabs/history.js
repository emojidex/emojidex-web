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
    const { meta } = this.EC.User.History
    const curPage = meta.total_count === 0 ? 0 : meta.page
    let maxPage = curPage === 0 ? 0 : Math.ceil(meta.total_count / this.EC.limit)
    if (!this.EC.User.isSubscriber() && maxPage > 1) {
      maxPage = 1
    }

    const resetEmoji = response => {
      this.tabPane.children().remove()
      this.tabPane.append(this.setHistoryEmoji(response))
    }

    const prevFunc = async () => {
      const response = await this.EC.User.History.prev()
      resetEmoji(response)
    }

    const nextFunc = async () => {
      const response = this.EC.User.History.next()
      resetEmoji(response)
    }

    return this.tabPane.append(this.palette.getPagination('history', prevFunc, nextFunc, curPage, maxPage))
  }
}
