/* eslint-disable no-undef */
describe('emojidexPalette:User:Following', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  if (hasPremiumAccount() || hasUserAccount()) {
    const user = premiumUserInfo || userInfo

    describe('Requires a user info and following user', () => {
      it('show following tab', async done => {
        await showPalette()
        await tryLoginUser(user.auth_user, user.password)
        await watchDOM('#follow-following', {
          trigger: () => {
            $('#tab-user-following a').click()
          },
          regex: /btn btn-default/
        })
        expect($('#follow-following .users .btn').length).toBeTruthy()
        done()
      })

      it('show following user info', async done => {
        await watchDOM('#follow-following .user-info', {
          trigger: () => {
            $($('#follow-following .users .btn')[0]).click()
          },
          properties: 'display',
          regex: /block/
        })
        expect($('#follow-following .user-info.on .emoji-btn').length).toBeTruthy()
        done()
      })

      it('show following user emoji next', async done => {
        const selectorCurrentUserInfo = '#follow-following .user-info.on'
        await watchDOM(selectorCurrentUserInfo, {
          trigger: () => {
            $($(`${selectorCurrentUserInfo} .palette-pager`)[1]).click()
          },
          regex: /user-emoji-list/
        })
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('2')
        done()
      })

      it('show following user emoji previous', async done => {
        const selectorCurrentUserInfo = '#follow-following .user-info.on'
        await watchDOM(selectorCurrentUserInfo, {
          trigger: () => {
            $($(`${selectorCurrentUserInfo} .palette-pager`)[0]).click()
          },
          regex: /user-emoji-list/
        })
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('1')
        done()
      })
    })
  }
})
/* eslint-enable no-undef */
