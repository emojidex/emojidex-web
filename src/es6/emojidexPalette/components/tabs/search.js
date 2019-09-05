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
        this.searchEmojiInput()
      }
    })

    const searchButton = $('<div class="btn btn-primary" id="palette-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></div>')
    searchButton.click(() => {
      this.searchEmojiInput()
    })
    tabContent.find('.input-group-btn').append(searchButton)

    return tabContent
  }

  searchEmojiInput() {
    this.initialized = true
    const searchWord = $('#palette-emoji-search-input').val()
    if (searchWord.length > 0) {
      this.search(searchWord)
    }
  }

  async search(searchWord) {
    this.searchWord = searchWord
    const response = await this.palette.EC.Search.search(searchWord, { sort: this.sortType })
    this.createSearchResultPage(response)
  }

  createSearchResultPage(response) {
    $('.search-emoji-list').remove()
    $('.search-pagination').remove()
    this.tabContent.append(this.palette.setEmojiList('search', response))

    const curPage = this.palette.EC.Search.meta.total_count === 0 ? 0 : this.palette.EC.Search.curPage
    let maxPage = Math.floor(this.palette.EC.Search.meta.total_count / this.palette.EC.options.limit)
    if (this.palette.EC.Search.meta.total_count % this.palette.EC.options.limit > 0) {
      maxPage++
    }

    const prevFunc = async () => {
      const response = await this.palette.EC.Search.prev()
      this.createSearchResultPage(response)
    }

    const nextFunc = async () => {
      const response = await this.palette.EC.Search.next()
      this.createSearchResultPage(response)
    }

    const pagination = this.palette.getPagination('search', prevFunc, nextFunc, curPage, maxPage)
    pagination.append(this.palette.getSorting(this))
    this.tabContent.append(pagination)
  }

  resetTabContent() {
    this.search(this.searchWord)
  }
}
/* eslint-enable no-undef */
