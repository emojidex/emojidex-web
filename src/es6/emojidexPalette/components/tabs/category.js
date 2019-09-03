import EmojidexClientCategories from 'emojidex-client/src/es6/components/categories'

export default class CategoryTab {
  constructor(palette, category) {
    this.palette = palette
    this.initialized = false
    this.sortType = 'score'
    this.categoryName = category.code
    this.tabList = $(`<li id='tab-${category.code}' data-code='${category.code}'><a href='#tab-content-${category.code}' data-toggle='pill'><i class='emjdx-${category.code}'></a></li>`) // eslint-disable-line no-undef
    this.tabContent = $(`<div class='tab-pane' id='tab-content-${category.code}'></div>`) // eslint-disable-line no-undef

    // TODO: CategoryTabの数だけcategories.syncが行われるので何とかしたい
    new EmojidexClientCategories(palette.EC).then(ECC => {
      this.ECC = ECC
      this.tabList.click(e => {
        return this.setCategory($(e.currentTarget).data('code')) // eslint-disable-line no-undef
      })
    })
  }

  setCategory(categoryName) {
    if (!this.initialized) {
      return this.setCategoryTabContent(categoryName)
    }
  }

  setCategoryTabContent(categoryName) {
    this.initialized = true
    this.categoryName = categoryName
    return this.ECC.getEmoji(
      categoryName,
      resultEmoji => {
        this.tabContent.children().remove()

        const capitalizedCategory = this.palette.capitalize(this.categoryName)
        this.tabContent.append(`<div class="emojidex-category-name emjdx-${this.categoryName}">${capitalizedCategory}</div>`)
        this.tabContent.append(this.palette.setEmojiList('category', resultEmoji))

        const curPage = this.ECC.meta.total_count === 0 ? 0 : this.ECC.curPage
        let maxPage = Math.floor(this.ECC.meta.total_count / this.palette.EC.options.limit)
        if (this.ECC.meta.total_count % this.palette.EC.options.limit > 0) {
          maxPage++
        }

        const prevFunc = () => this.ECC.prev()
        const nextFunc = () => this.ECC.next()
        const pagination = this.palette.getPagination('category', prevFunc, nextFunc, curPage, maxPage)
        pagination.append(this.palette.getSorting(this))
        return this.tabContent.append(pagination)
      },
      { sort: this.sortType }
    )
  }

  resetTabContent() {
    return this.setCategoryTabContent(this.categoryName)
  }
}
