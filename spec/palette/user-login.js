/* eslint-disable no-undef */
describe('emojidexPalette:User:Login', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('login (Failure)', done => {
    showPalette().then(() => {
      return tryLoginUser('aaa', 'aaa')
    }).then(() => {
      expect($('#login-error span').text()).toBe('Login failed. Please check your username and password or login here.')
      done()
    })
  })

  if (userInfo) {
    it('user login [Requires a user account]', done => {
      tryLoginUser(userInfo.auth_user, userInfo.password).then(() => {
        expect($('#tab-user-favorite').length).toBeTruthy()
        done()
      })
    })

    it('logout', done => {
      logout().then(() => {
        expect($('#palette-emoji-username-input')).toHaveCss({ display: 'block' })
        done()
      })
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

  if (hasPremiumAccount) {
    it('premium user login [Require a premium user info]', done => {
      tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password).then(() => {
        expect($('#tab-user-favorite').length).toBeTruthy()
        done()
      })
    })

    it('logout', done => {
      logout().then(() => {
        expect($('#palette-emoji-username-input')).toHaveCss({ display: 'block' })
        done()
      })
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

  if (userInfo || premiumUserInfo) {
    let user = userInfo ? userInfo : premiumUserInfo
    it('login with storage data', done => {
      tryLoginUser(user.auth_user, user.password).then(() => {
        $('#palette-btn').removeData().unbind()
        $('#emojidex-emoji-palette, .emojidex-palette-div').remove()

        $('#palette-btn').emojidexPalette({
          onComplete: () => {
            showPalette().then(() => {
              return watchDOM('#tab-content-user', {trigger: () => {
                $('#tab-user a').click()
              }})
            }).then(() => {
              expect($('#tab-user-favorite').length).toBeTruthy()
              done()
            })
          }
        })
      })
    })
  }
})
/* eslint-enable no-undef */
