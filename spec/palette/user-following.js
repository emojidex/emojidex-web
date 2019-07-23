/* eslint-disable no-undef */
describe('emojidexPalette:User:Following', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  if (hasPremiumAccount()) {
    it('show following tab [Requires a user account and following user]', done => {
      showPalette().then(() => {
        return watchDOM('#emoji-palette', {trigger: () => {
            tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
          }, regex: /favorite-emoji-list/
        })
      }).then(() => {
        return watchDOM('#follow-following', {trigger: () => {
          $('#tab-user-following a').click()
        }, regex: /btn btn-default/})
      }).then(() => {
        expect($('#follow-following .users .btn').length).toBeTruthy()
        done()
      })
    })

    it('show following user info [Requires a user account and following user]', done => {
      watchDOM('#follow-following .user-info', {regex: /emoji-btn btn btn-default/}).then((data) => {
        expect($('#follow-following .user-info.on .emoji-btn').length).toBeTruthy()
        done()
      })
      $($('#follow-following .users .btn')[0]).click()
    })

    it('show following user emoji next [Requires a user account and following user]', done => {
      const selectorCurrentUserInfo = '#follow-following .user-info.on'
      watchDOM(selectorCurrentUserInfo).then(() => {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('2')
        done()
      })
      $($(`${selectorCurrentUserInfo} .palette-pager`)[1]).click()
    })

    it('show following user emoji previous [Requires a user account and following user]', done => {
      const selectorCurrentUserInfo = '#follow-following .user-info.on'
      watchDOM(selectorCurrentUserInfo).then(() => {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('1')
        done()
      })
      $($(`${selectorCurrentUserInfo} .palette-pager`)[0]).click()
    })
  }
})
/* eslint-enable no-undef */
