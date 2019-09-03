/* eslint-disable no-undef */
import UserEmojiTab from './emoji'

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

  async init() {
    $(this.selectorUsers).children().remove()
    $(`${this.selectorTabPane} > .user-info`).remove()

    const followers = await this.EC.User.Follow.getFollowers()
    for (const userName of followers) {
      this.setUserButton(userName)
      this.setUserInfo(userName)
    }
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

  setUserEmojisInfo(userInfo) {
    const userEmojiTab = new UserEmojiTab(this, userInfo, userInfo.attr('id'))
    userEmojiTab.init()
  }
}
/* eslint-enable no-undef */
