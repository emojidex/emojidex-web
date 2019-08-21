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
    it('user login [Requires a user account]', async done => {
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

  // it 'general user can not see the newest/popular emoji', (done) ->
  //   pending() unless userInfo?
  //   timer_option =
  //     callback: ->
  //       if $('#tab-content-user-newest').length
  //         $('#tab-user-newest a').click()
  //         expect($('#tab-content-user-newest').find('a').text()).toBe 'Premium/Pro user only.'
  //         done()
  //       else
  //         spec_timer timer_option
  //   spec_timer timer_option

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

  // it 'premium user can see the newest/popular emoji', (done) ->
  //   pending() unless premiumUserInfo?
  //   timer_option =
  //     callback: ->
  //       if $('#tab-content-user-newest').length
  //         $('#tab-user-newest a').click()
  //         expect($('#tab-content-user-newest').find('img').length).toBeTruthy()
  //         done()
  //       else
  //         spec_timer timer_option
  //   spec_timer timer_option

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
