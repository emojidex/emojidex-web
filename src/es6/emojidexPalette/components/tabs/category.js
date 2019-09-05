export default class CategoryTab {
  constructor(palette, category) {
    this.palette = palette
    this.initialized = false
    this.sortType = 'score'
    this.category = category
    this.tabList = $(`<li id='tab-${category.code}' data-code='${category.code}'><a href='#tab-content-${category.code}' data-toggle='pill'><i class='emjdx-${category.code}'></a></li>`) // eslint-disable-line no-undef
    this.tabContent = $(`<div class='tab-pane' id='tab-content-${category.code}'></div>`) // eslint-disable-line no-undef
    this.tabList.click(() => {
      this.setCategory()
    })
  }

  setCategory() {
    if (!this.initialized) {
      this.initialized = true
      this.setCategoryTabContent()
    }
  }

  async setCategoryTabContent() {
    const response = await this.palette.EC.Categories.getEmoji(this.category.code, { sort: this.sortType })
    this.createCategoryPage(response)
  }

  createCategoryPage(response) {
    this.tabContent.children().remove()
    this.tabContent.append(`<div class="emojidex-category-name emjdx-${this.category.code}">${this.category.name}</div>`)
    this.tabContent.append(this.palette.setEmojiList('category', response))

    const curPage = this.palette.EC.Categories.meta.total_count === 0 ? 0 : this.palette.EC.Categories.curPage
    const maxPage = curPage === 0 ? 0 : this.palette.EC.Categories.maxPage

    const prevFunc = async () => {
      const response = await this.palette.EC.Categories.getEmoji(this.category.code, { page: curPage - 1, sort: this.sortType })
      this.createCategoryPage(response)
    }

    const nextFunc = async () => {
      const response = await this.palette.EC.Categories.getEmoji(this.category.code, { page: curPage + 1, sort: this.sortType })
      this.createCategoryPage(response)
    }

    const pagination = this.palette.getPagination('category', prevFunc, nextFunc, curPage, maxPage)
    pagination.append(this.palette.getSorting(this))
    this.tabContent.append(pagination)
  }

  resetTabContent() {
    this.setCategoryTabContent()
  }
}
