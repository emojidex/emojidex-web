export default class IndexTab {
  constructor(palette) {
    this.palette = palette
    this.initialized = false
    this.sortType = 'score'
    this.tabList = $('<li id=\'tab-index\' class=\'active\'><a href=\'#tab-content-index\' data-toggle=\'pill\'><i class=\'emjdx-all\'></a></li>') // eslint-disable-line no-undef
    this.tabContent = $('<div class=\'tab-pane active\' id=\'tab-content-index\'></div>') // eslint-disable-line no-undef
    this.setTabContent()
  }

  setTabContent() {
    this.initialized = true
    return this.palette.EC.Indexes.index(
      (resultEmoji, calledData) => {
        this.tabData = calledData
        this.tabContent.children().remove()

        this.tabContent.append('<div class="emojidex-category-name emjdx-all">Index</div>')
        this.tabContent.append(this.palette.setEmojiList('index', resultEmoji))

        const curPage = this.palette.EC.Indexes.meta.total_count === 0 ? 0 : this.palette.EC.Indexes.curPage
        let maxPage = Math.floor(this.palette.EC.Indexes.meta.total_count / this.palette.EC.options.limit)
        if (this.palette.EC.Indexes.meta.total_count % this.palette.EC.options.limit > 0) {
          maxPage++
        }

        const prevFunc = () => this.palette.EC.Indexes.prev()
        const nextFunc = () => this.palette.EC.Indexes.next()
        const pagination = this.palette.getPagination('index', prevFunc, nextFunc, curPage, maxPage)
        pagination.append(this.palette.getSorting(this))
        return this.tabContent.append(pagination)
      }
      ,
      { sort: this.sortType }
    )
  }

  resetTabContent() {
    return this.setTabContent()
  }
}
