/* eslint-disable no-undef */
describe('emojidexPalette:User:Following', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('show following tab [Requires a user account and following user]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#tab-content-user').watch({
      id: 'watcher',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback() {
        removeWatch($('#tab-content-user'), 'watcher')

        specTimer(3000).then(() => {
          $('#tab-user-following a').click()
          return specTimer(1000)
        }).then(() => {
          expect($('#follow-following .users .btn').length).toBeTruthy()
          done()
        })
      }
    })

    showPalette(() => {
      loginUser(userInfo.auth_user, userInfo.password)
    })
  })

  it('show following user info [Requires a user account and following user]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#follow-following .user-info').watch({
      id: 'watcher',
      properties: 'attr_class',
      callback() {
        expect($('#follow-following .user-info.on .emoji-btn').length).toBeTruthy()
        removeWatch($('.user-info'), 'watcher')
        done()
      }
    })

    specTimer(1000).then(() => {
      $($('#follow-following .users .btn')[0]).click()
    })
  })

  it('show following user emoji next [Requires a user account and following user]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    const selectorCurrentUserInfo = '#follow-following .user-info.on'
    $(selectorCurrentUserInfo).watch({
      id: 'watcher',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback() {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('2')
        removeWatch($('.user-info'), 'watcher')
        done()
      }
    })

    $($(`${selectorCurrentUserInfo} .palette-pager`)[1]).click()
  })

  it('show following user emoji previous [Requires a user account and following user]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    const selectorCurrentUserInfo = '#follow-following .user-info.on'
    $(selectorCurrentUserInfo).watch({
      id: 'watcher',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback() {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('1')
        removeWatch($('.user-info'), 'watcher')
        done()
      }
    })

    $($(`${selectorCurrentUserInfo} .palette-pager`)[0]).click()
  })
})
/* eslint-enable no-undef */
