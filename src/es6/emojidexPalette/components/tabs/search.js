/* eslint-disable no-undef */
export default class SearchTab {
  constructor(palette) {
    this.palette = palette
    this.initialized = false
    this.sortType = 'score'
    this.tabList = '<li id=\'tab-search\' class=\'pull-right\'><a href=\'#tab-content-search\' data-toggle=\'pill\'><i class=\'emjdx-search\'></a></li>'
    this.tabContent = this.getTabContent()
  }

  getTabContent() {
    const tabContent = $('<div class="tab-pane" id="tab-content-search"><div class="input-group"><input type="text" name="search" id="palette-emoji-search-input" class="form-control" placeholder="Search emoji"><span class="input-group-btn"></span></div></div>')
    tabContent.find('#palette-emoji-search-input').keypress(e => {
      if (e.keyCode === 13) {
        return this.searchEmojiInput()
      }
    })

    const searchButton = $('<div class="btn btn-primary" id="palette-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></div>')
    searchButton.click(() => {
      return this.searchEmojiInput()
    })
    tabContent.find('.input-group-btn').append(searchButton)

    return tabContent
  }

  searchEmojiInput() {
    this.initialized = true
    const searchWord = $('#palette-emoji-search-input').val()
    if (searchWord.length > 0) {
      return this.search(searchWord)
    }
  }

  search(searchWord) {
    this.searchWord = searchWord
    return this.palette.EC.Search.search(searchWord, resultEmoji => {
      $('.search-emoji-list').remove()
      $('.search-pagination').remove()
      this.tabContent.append(this.palette.setEmojiList('search', resultEmoji))

      const curPage = this.palette.EC.Search.meta.total_count === 0 ? 0 : this.palette.EC.Search.curPage
      let maxPage = Math.floor(this.palette.EC.Search.meta.total_count / this.palette.EC.options.limit)
      if (this.palette.EC.Search.meta.total_count % this.palette.EC.options.limit > 0) {
        maxPage++
      }

      const prevFunc = () => this.palette.EC.Search.prev()
      const nextFunc = () => this.palette.EC.Search.next()
      const pagination = this.palette.getPagination('search', prevFunc, nextFunc, curPage, maxPage)
      pagination.append(this.palette.getSorting(this))
      return this.tabContent.append(pagination)
    }
    , { sort: this.sortType })
  }

  resetTabContent() {
    return this.search(this.searchWord)
  }
}
/* eslint-enable no-undef */
