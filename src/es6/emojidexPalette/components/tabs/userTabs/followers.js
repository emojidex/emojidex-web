/* eslint-disable no-undef */
export default class FollowersTab {
  constructor(userTab) {
    this.EC = userTab.palette.EC
    this.palette = userTab.palette

    this.selectorTabPane = '#emojidex-emoji-palette #follow-followers'
    this.selectorUsers = `${this.selectorTabPane} > .users`

    this.tabPane = $(`
      <div id='follow-followers' class='tab-pane'>
        <div class='users'></div>
      </div>
    `)
  }

  init() {
    $(this.selectorUsers).children().remove()
    $(`${this.selectorTabPane} > .user-info`).remove()

    this.EC.User.Follow.getFollowers(followers => {
      for (const userName of followers) {
        this.setUserButton(userName)
        this.setUserInfo(userName)
      }
    })
  }

  setUserButton(userName) {
    const userButton = $(`<div class='btn btn-default'>${userName}</div>`).click(e => {
      $(this.selectorTabPane).find(`#${$(e.currentTarget).text()}`).addClass('on')
    })
    $(this.selectorUsers).append(userButton)
  }

  setUserInfo(userName) {
    const userInfo = $(`
      <div id='${userName}' class='user-info'>
        <div class='btn-close' aria-hidden='true'><i class='emjdx-abstract flip-vertical'></i></div>
        <div class='user-name'>${userName}</div>
        <div class="clearfix"/>
        <hr>
        <div class="user-emoji-list clearfix">
        </div>
      </div>
    `).click(e => {
      e.stopPropagation()
    })
    userInfo.find('.btn-close').click(() => {
      $(this.selectorTabPane).find('*').removeClass('on')
    })
    $(this.selectorTabPane).append(userInfo)

    this.setUserEmojisInfo(userInfo)
  }

  setUserEmojisInfo(userInfo, option = {}) {
    const userName = userInfo.attr('id')
    return this.EC.Indexes.user(userName, undefined, option).then(response => {
      userInfo.data(response.meta)
      userInfo.data({ userName, maxPage: Math.ceil(response.meta.total_count / this.EC.limit ? response.meta.total_count / this.EC.limit : 1) })

      userInfo.find('.user-emoji-list').children().remove()
      userInfo.find('.followers-pagination').remove()

      userInfo.find('.user-emoji-list').append(this.palette.setEmojiList('followers', response.emoji))
      this.setPagination(userInfo)
    })
  }

  setPagination(userInfo) {
    const meta = userInfo.data()

    const prevFunc = () => {
      const option = { page: meta.page - 1 }
      if (option.page > 0) {
        this.setUserEmojisInfo(userInfo, option)
      }
    }

    const nextFunc = () => {
      const option = { page: meta.page + 1 }
      if (option.page <= meta.maxPage) {
        this.setUserEmojisInfo(userInfo, option)
      }
    }

    userInfo.append(this.palette.getPagination('followers', prevFunc, nextFunc, meta.page, meta.maxPage))
  }
}
/* eslint-enable no-undef */
