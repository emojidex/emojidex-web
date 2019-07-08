export default class CategoryTab {
  constructor(palette, category,) {
    this.palette = palette
    this.initialized = false
    this.sortType = 'score'
    this.categoryName = category.code
    this.tabList = $(`<li id='tab-${category.code}' data-code='${category.code}'><a href='#tab-content-${category.code}' data-toggle='pill'><i class='emjdx-${category.code}'></a></li>`) // eslint-disable-line no-undef
    this.tabList.click(e => {
      return this.setCategory($(e.currentTarget).data('code')) // eslint-disable-line no-undef
    })

    this.tabContent = $(`<div class='tab-pane' id='tab-content-${category.code}'></div>`) // eslint-disable-line no-undef
  }

  setCategory(categoryName) {
    if (this.tabData !== null) {
      this.palette.EC.Categories.calledData = this.tabData
      return this.palette.EC.Categories.calledData
    }

    return this.setCategoryTabContent(categoryName)
  }

  setCategoryTabContent(categoryName) {
    this.initialized = true
    this.categoryName = categoryName
    return this.palette.EC.Categories.getEmoji(
      categoryName,
      (resultEmoji, calledData) => {
        this.tabData = calledData
        this.tabContent.children().remove()

        const capitalizedCategory = this.palette.capitalize(this.categoryName)
        this.tabContent.append(`<div class="emojidex-category-name emjdx-${this.categoryName}">${capitalizedCategory}</div>`)
        this.tabContent.append(this.palette.setEmojiList('category', resultEmoji))

        const curPage = this.palette.EC.Categories.meta.total_count === 0 ? 0 : this.palette.EC.Categories.curPage
        let maxPage = Math.floor(this.palette.EC.Categories.meta.total_count / this.palette.EC.options.limit)
        if (this.palette.EC.Categories.meta.total_count % this.palette.EC.options.limit > 0) {
          maxPage++
        }

        const prevFunc = () => this.palette.EC.Categories.prev()
        const nextFunc = () => this.palette.EC.Categories.next()
        const pagination = this.palette.getPagination('category', prevFunc, nextFunc, curPage, maxPage)
        pagination.append(this.palette.getSorting(this))
        return this.tabContent.append(pagination)
      }
      ,
      { sort: this.sortType }
    )
  }

  resetTabContent() {
    return this.setCategoryTabContent(this.categoryName)
  }
}
