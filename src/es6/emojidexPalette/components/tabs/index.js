import EmojidexClientIndexes from 'emojidex-client/src/es6/components/indexes'

export default class IndexTab {
  constructor(palette) {
    this.ECI = new EmojidexClientIndexes(palette.EC)
    this.palette = palette
    this.initialized = false
    this.sortType = 'score'
    this.tabList = $('<li id=\'tab-index\' class=\'active\'><a href=\'#tab-content-index\' data-toggle=\'pill\'><i class=\'emjdx-all\'></a></li>') // eslint-disable-line no-undef
    this.tabContent = $('<div class=\'tab-pane active\' id=\'tab-content-index\'></div>') // eslint-disable-line no-undef
    this.setTabContent()
  }

  setTabContent() {
    this.initialized = true
    return this.ECI.index(
      resultEmoji => {
        this.tabContent.children().remove()

        this.tabContent.append('<div class="emojidex-category-name emjdx-all">Index</div>')
        this.tabContent.append(this.palette.setEmojiList('index', resultEmoji))

        const curPage = this.ECI.meta.total_count === 0 ? 0 : this.ECI.curPage
        let maxPage = Math.floor(this.ECI.meta.total_count / this.palette.EC.options.limit)
        if (this.ECI.meta.total_count % this.palette.EC.options.limit > 0) {
          maxPage++
        }

        const prevFunc = () => this.ECI.prev()
        const nextFunc = () => this.ECI.next()
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
