/* eslint-disable no-undef */
describe('emojidexPalette:User:Login', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  it('login (Failure)', async done => {
    await showPalette()
    await tryLoginUser('aaa', 'aaa', false)
    expect($('#login-error span').text()).toBe('Login failed. Please check your username and password or login here.')
    done()
  })

  if (hasUserAccount()) {
    it('user login [Requires a user info]', async done => {
      await tryLoginUser(userInfo.auth_user, userInfo.password)
      expect($('#tab-user-favorite').length).toBeTruthy()
      done()
    })

    it('logout', async done => {
      await logout()
      expect($('#palette-emoji-username-input')).toHaveCss({ display: 'block' })
      done()
    })
  }

  if (hasPremiumAccount()) {
    it('premium user login [Require a premium user info]', async done => {
      await tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
      expect($('#tab-user-favorite').length).toBeTruthy()
      done()
    })

    it('logout', async done => {
      await logout()
      expect($('#palette-emoji-username-input')).toHaveCss({ display: 'block' })
      done()
    })
  }

  if (hasUserAccount() || hasPremiumAccount()) {
    const user = userInfo ? userInfo : premiumUserInfo
    it('login with storage data', async done => {
      await tryLoginUser(user.auth_user, user.password)
      $('#palette-btn').removeData().unbind()
      $('#emojidex-emoji-palette, .emojidex-palette-div').remove()

      $('#palette-btn').emojidexPalette({ paletteEmojisLimit: 1 })
      await $('#palette-btn').data().plugin_emojidexPalette
      await showPalette()
      await watchDOM('#tab-content-user', {
        trigger: () => {
          $('#tab-user a').click()
        },
        regex: /favorite-emoji-list/
      })
      expect($('#tab-user-favorite').length).toBeTruthy()
      done()
    })
  }
})
/* eslint-enable no-undef */
