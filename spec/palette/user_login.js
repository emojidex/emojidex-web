/* eslint-disable no-undef */
describe('emojidexPalette:User:Login', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('login (Failure)', done => {
    $('#tab-content-user').watch({
      id: 'content_user',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        if (data.vals[0].match(/login-error/)) {
          // TODO: english text
          expect($('#login-error span').text()).toBe('Login failed. Please check your username and password or login here.')
          removeWatch($('#tab-content-user'), 'content_user')
          done()
        }
      }
    })

    showPalette(() => {
      loginUser('aaa', 'aaa')
    })
  })

  it('premium user login [Requires a premium user account]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#tab-content-user').watch({
      id: 'content_user',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        if (data.vals[0].match(/favorite-emoji-list/)) {
          $('#tab-user-favorite a').click()
          expect($('#tab-content-user-favorite').find('img').length).toBeTruthy()
          removeWatch($('#tab-content-user'), 'content_user')
          done()
        }
      }
    })

    loginUser(userInfo.auth_user, userInfo.password)
  })

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

  it('logout', done => {
    if (typeof premiumUserInfo === 'undefined' || premiumUserInfo === null) {
      pending()
    }

    $('#tab-content-user').watch({
      id: 'content_user',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback() {
        expect($('#palette-emoji-username-input')).toHaveCss({ display: 'block' })
        removeWatch($('#tab-content-user'), 'content_user')
        done()
      }
    })
    $('#palette-emoji-logout').click()
  })

  it('general user login [Require user info]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#tab-content-user').watch({
      id: 'content_user',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        if (data.vals[0].match(/favorite-emoji-list/)) {
          expect($('#tab-content-user-favorite').find('img').length).toBeTruthy()
          removeWatch($('#tab-content-user'), 'content_user')
          done()
        }
      }
    })
    loginUser(userInfo.auth_user, userInfo.password)
  })

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

  it('login with storage data', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#palette-btn').removeData().unbind()
    $('#emojidex-emoji-palette, .emojidex-palette-div').remove()

    $('#palette-btn').emojidexPalette({
      onComplete: () => {
        specTimer(1000).then(() => {
          $('.ui-dialog').watch({
            id: 'dialog_2',
            properties: 'display',
            callback() {
              removeWatch($('.ui-dialog'), 'dialog_2')

              $('#tab-content-user').watch({
                id: 'content_user',
                properties: 'prop_innerHTML',
                watchChildren: true,
                callback(data) {
                  if (data.vals[0].match(/favorite-emoji-list/)) {
                    expect($('#tab-content-user-favorite').find('img').length).toBeTruthy()
                    $('button.pull-right[aria-label="Close"]').click()
                    removeWatch($('#tab-content-user'), 'content_user')
                    return done()
                  }
                }
              })
              $('#tab-user a').click()
            }
          })
          $('#palette-btn').click()
        })
      }
    })
  })
})
/* eslint-enable no-undef */
