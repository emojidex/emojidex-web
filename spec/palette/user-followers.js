/* eslint-disable no-undef */
describe('emojidexPalette:User:Followers', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  if (hasPremiumAccount()) {
    it('show followers tab [Requires a premium user account and followers user]', done => {
      showPalette().then(() => {
        return watchDOM('#emoji-palette', {trigger: () => {
            tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
          }, regex: /favorite-emoji-list/
        })
      }).then(() => {
        return watchDOM('#follow-followers', {trigger: () => {
          $('#tab-user-followers a').click()
        }, regex: /btn btn-default/})
      }).then(() => {
        expect($('#follow-followers .users .btn').length).toBeTruthy()
        done()
      })
    })

    it('show followers user info [Requires a premium user account and followers user]', done => {
      watchDOM('#follow-followers .user-info', {regex: /emoji-btn btn btn-default/}).then((data) => {
        expect($('#follow-followers .user-info.on .emoji-btn').length).toBeTruthy()
        done()
      })
      $($('#follow-followers .users .btn')[0]).click()
    })

    it('show followers user emoji next [Requires premium a user account and followers user]', done => {
      const selectorCurrentUserInfo = '#follow-followers .user-info.on'
      watchDOM(selectorCurrentUserInfo).then(() => {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('2')
        done()
      })
      $($(`${selectorCurrentUserInfo} .palette-pager`)[1]).click()
    })

    it('show followers user emoji previous [Requires a premium user account and followers user]', done => {
      const selectorCurrentUserInfo = '#follow-followers .user-info.on'
      watchDOM(selectorCurrentUserInfo).then(() => {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('1')
        done()
      })
      $($(`${selectorCurrentUserInfo} .palette-pager`)[0]).click()
    })
  }
})
/* eslint-enable no-undef */
