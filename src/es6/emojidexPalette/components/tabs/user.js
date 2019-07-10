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

    if (this.palette.EC.Data.storage.hubCache.emojidex.auth_info !== undefined &&
      this.palette.EC.Data.storage.hubCache.emojidex.auth_info.status === 'verified') {
      const authInfo = this.palette.EC.Data.storage.hubCache.emojidex.auth_info
      this.login(authInfo.user, authInfo.token, 'token')
    }

    return tabContent
  }

  checkInput() {
    $('#login-error').remove()

    const username = $('#palette-emoji-username-input').val()
    const password = $('#palette-emoji-password-input').val()
    if (username.length > 0 && password.length > 0) {
      return this.login(username, password, 'plain')
    }
  }

  login(username, password, type) {
    const callback = authInfo => {
      if (authInfo.status === 'verified') {
        this.hideLoginForm()
        this.setUserTab(authInfo)
        this.setHistoryTab()
        this.setFavoriteTab()
        this.setFollowingTab()
        if (authInfo.premium) {
          this.setFollowersTab()
        }

        return this.palette.toggleSorting()
      }

      return this.showError(authInfo)
    }

    if (type === 'plain') {
      return this.palette.EC.User.plainAuth(username, password, authInfo => callback(authInfo))
    }

    return this.palette.EC.User.tokenAuth(username, password, authInfo => callback(authInfo))
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

  setUserTab(authInfo) {
    const usertabList = $('<ul class="nav nav-tabs mb-m mt-m" id="user-tab-list"></ul>')
    usertabList.append($('<li id="tab-user-favorite" class="active"><a href="#tab-content-user-favorite" data-toggle="tab">Favorite</a></li>'))
    usertabList.append($('<li id="tab-user-history"><a href="#tab-content-user-history" data-toggle="tab">History</a></li>'))
    usertabList.append($('<li id="tab-user-following"><a href="#follow-following" data-toggle="tab">Following</a></li>'))
    if (authInfo.premium) {
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

  setHistoryTab() {
    return this.historyTab.createTabContent().then(content => {
      return this.userTabContent.append(content)
    })
  }

  setFavoriteTab() {
    return this.favoriteTab.createTabContent().then(content => {
      return this.userTabContent.append(content)
    })
  }

  setFollowingTab() {
    this.userTabContent.append(this.followingTab.tabPane)
    this.followingTab.init()
  }

  setFollowersTab() {
    this.userTabContent.append(this.followersTab.tabPane)
    this.followersTab.init()
  }

  setPremiumData(response, kind) {
    const tabPane = $(`<div class='tab-pane' id='tab-content-user-${kind}'></div>`)
    if (response.statusText === 'Payment Required') {
      // TODO: text localization
      tabPane.append($('<p style="margin-top:15px;"><a class="btn btn-primary" href="https://www.emojidex.com/profile" target="_blank">Premium/Pro user only.</a></p>'))
    } else {
      tabPane.append(this.palette.setEmojiList(kind, response))
    }

    return this.userTabContent.append(tabPane)
  }
}
/* eslint-enable no-undef */
