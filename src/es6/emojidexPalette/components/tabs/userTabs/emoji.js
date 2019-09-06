import EmojidexUserEmoji from 'emojidex-client/src/es6/components/user/emoji'

export default class UserEmojiTab {
  constructor(parentTab, container, userName) {
    this.palette = parentTab.palette
    this.EUE = new EmojidexUserEmoji(parentTab.palette.EC)
    this.userName = userName
    this.container = container
  }

  async init() {
    await this.createTabContent()
    await this.createPagination()
  }

  async createTabContent() {
    const response = await this.EUE.get(this.userName)
    return this.container.find('.user-emoji-list').append(this.palette.setEmojiList('user-emoji', response))
  }

  createPagination() {
    const curPage = this.EUE.meta.total_count === 0 ? 0 : this.EUE.curPage
    const maxPage = curPage === 0 ? 0 : this.EUE.maxPage

    const resetEmoji = response => {
      this.container.find('.user-emoji-list').children().remove()
      this.container.find('.user-emoji-pagination').remove()
      this.container.find('.user-emoji-list').append(this.palette.setEmojiList('user-emoji', response))
      this.createPagination()
    }

    const prevFunc = async () => {
      const response = await this.EUE.prev()
      resetEmoji(response)
    }

    const nextFunc = async () => {
      const response = await this.EUE.next()
      resetEmoji(response)
    }

    return this.container.append(this.palette.getPagination('user-emoji', prevFunc, nextFunc, curPage, maxPage))
  }
}
