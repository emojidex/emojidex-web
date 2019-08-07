import FavoriteTab from './userTabs/favorite'
import FollowersTab from './userTabs/followers'
import FollowingTab from './userTabs/following'
import HistoryTab from './userTabs/history'

/* eslint-disable no-undef */
export default class UserTab {
  constructor(palette) {
    this.palette = palette
    this.tabList = '<li id=\'tab-user\' class=\'pull-right\'><a href=\'#tab-content-user\' data-toggle=\'pill\'><i class=\'emjdx-user\'></a></li>'
    this.tabContent = this.getTabContent()
    this.historyTab = new HistoryTab(this)
    this.favoriteTab = new FavoriteTab(this)
    this.followingTab = new FollowingTab(this)
    this.followersTab = new FollowersTab(this)
  }

  getTabContent() {
    const tabContent = $('<div class="tab-pane" id="tab-content-user"><input type="text" class="form-control" id="palette-emoji-username-input" placeholder="Username"><input type="password" class="form-control mt-m" id="palette-emoji-password-input" placeholder="Password"></div>')
    tabContent.find('#palette-emoji-password-input').keypress(e => {
      if (e.keyCode === 13) {
        return this.checkInput()
      }
    })

    const loginButton = $('<div class="btn btn-primary btn-block mt-m" id="palette-emoji-login-submit">Login</div>')
    loginButton.click(() => {
      return this.checkInput()
    })
    tabContent.append(loginButton)

    const authInfo = this.palette.EC.Data.authInfo()
    if (authInfo.token) {
      this.login(authInfo.user, authInfo.token, 'token')
    }

    return tabContent
  }

  checkInput() {
    $('#login-error').remove()

    const username = $('#palette-emoji-username-input').val()
    const password = $('#palette-emoji-password-input').val()
    if (username.length && password.length) {
      return this.login(username, password, 'plain')
    }
  }

  async login(username, password, type) {
    let authInfo
    if (type === 'plain') {
      authInfo = await this.palette.EC.User.plainAuth(username, password)
    } else {
      authInfo = await this.palette.EC.User.tokenAuth(username, password)
    }

    if (authInfo.status === 'verified') {
      this.hideLoginForm()
      this.setUserTab()
      this.setHistoryTab()
      this.setFavoriteTab()
      this.setFollowingTab()
      if (this.palette.EC.User.isSubscriber()) {
        this.setFollowersTab()
      }

      return this.palette.toggleSorting()
    }

    return this.showError(authInfo)
  }

  showError() {
    // TODO: error text localization
    return this.tabContent.prepend($('<div id="login-error"><span style="color:red">Login failed. Please check your username and password or <a href="https://www.emojidex.com/users/sign_in">login here</a>.</span><div>'))
  }

  hideLoginForm() {
    $('#palette-emoji-username-input').val('')
    $('#palette-emoji-password-input').val('')
    $('#palette-emoji-username-input').hide()
    $('#palette-emoji-password-input').hide()
    return $('#palette-emoji-login-submit').hide()
  }

  showLoginForm() {
    $('#palette-emoji-username-input').show()
    $('#palette-emoji-password-input').show()
    return $('#palette-emoji-login-submit').show()
  }

  setUserTab() {
    const usertabList = $('<ul class="nav nav-tabs mb-m mt-m" id="user-tab-list"></ul>')
    usertabList.append($('<li id="tab-user-favorite" class="active"><a href="#tab-content-user-favorite" data-toggle="tab">Favorite</a></li>'))
    usertabList.append($('<li id="tab-user-history"><a href="#tab-content-user-history" data-toggle="tab">History</a></li>'))
    usertabList.append($('<li id="tab-user-following"><a href="#follow-following" data-toggle="tab">Following</a></li>'))
    if (this.palette.EC.User.isSubscriber()) {
      usertabList.append($('<li id="tab-user-followers"><a href="#follow-followers" data-toggle="tab">Followers</a></li>'))
    }

    const logoutButton = $('<button class="btn btn-default btm-sm pull-right" id="palette-emoji-logout">LogOut</button>')
    logoutButton.click(() => {
      this.palette.EC.User.logout()

      $('#user-tab-list').remove()
      $('#user-tab-content').children().removeClass('active')
      this.favoriteTab.tabPane.addClass('active')
      $('#user-tab-content').remove()
      this.showLoginForm()
      return this.palette.toggleSorting()
    })
    usertabList.append(logoutButton)

    this.userTabContent = $('<div class="tab-content mt-m" id="user-tab-content"></div>')

    this.tabContent.append(usertabList)
    return this.tabContent.append(this.userTabContent)
  }

  async setHistoryTab() {
    const content = await this.historyTab.createTabContent()
    return this.userTabContent.append(content)
  }

  async setFavoriteTab() {
    const content = await this.favoriteTab.createTabContent()
    return this.userTabContent.append(content)
  }

  setFollowingTab() {
    this.userTabContent.append(this.followingTab.tabPane)
    this.followingTab.init()
  }

  setFollowersTab() {
    this.userTabContent.append(this.followersTab.tabPane)
    this.followersTab.init()
  }
}
/* eslint-enable no-undef */
