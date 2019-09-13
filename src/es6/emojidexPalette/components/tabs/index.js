export default class IndexTab {
  constructor(palette) {
    this.palette = palette
    this.initialized = false
    this.sortType = 'score'
    this.tabList = $('<li id=\'tab-index\' class=\'active\'><a href=\'#tab-content-index\' data-toggle=\'pill\'><i class=\'emjdx-all\'></a></li>') // eslint-disable-line no-undef
    this.tabContent = $('<div class=\'tab-pane active\' id=\'tab-content-index\'></div>') // eslint-disable-line no-undef
    this.setTabContent()
  }

  async setTabContent() {
    this.initialized = true

    const response = await this.palette.EC.Indexes.index({ sort: this.sortType })
    this.createIndexPage(response)
  }

  createIndexPage(response) {
    this.tabContent.children().remove()
    this.tabContent.append('<div class="emojidex-category-name emjdx-all">Index</div>')
    this.tabContent.append(this.palette.setEmojiList('index', response))

    const curPage = this.palette.EC.Indexes.meta.total_count === 0 ? 0 : this.palette.EC.Indexes.curPage
    const maxPage = curPage === 0 ? 0 : this.palette.EC.Indexes.maxPage

    const prevFunc = async () => {
      const response = await this.palette.EC.Indexes.prev()
      this.createIndexPage(response)
    }

    const nextFunc = async () => {
      const response = await this.palette.EC.Indexes.next()
      this.createIndexPage(response)
    }

    const pagination = this.palette.getPagination('index', prevFunc, nextFunc, curPage, maxPage)
    pagination.append(this.palette.getSorting(this))
    this.tabContent.append(pagination)
  }

  resetTabContent() {
    this.setTabContent()
  }
}
