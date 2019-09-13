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
      const userInfo = this.setUserInfo(userName)
      this.setUserButton(userName, userInfo)
    }
  }

  setUserButton(userName, userInfo) {
    const userEmojiTab = new UserEmojiTab(this, userInfo, userName)
    const userButton = $(`<div class='btn btn-default'>${userName}</div>`).click(async () => {
      if (!userEmojiTab.initialized) {
        await userEmojiTab.init()
      }

      $(this.selectorTabPane).find(`#follower-${userName}`).addClass('on')
    })
    $(this.selectorUsers).append(userButton)
  }

  setUserInfo(userName) {
    const userInfo = $(`
      <div id='follower-${userName}' class='user-info'>
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

    return userInfo
  }
}
/* eslint-enable no-undef */
