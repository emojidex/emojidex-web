/* eslint-disable no-undef */
describe('emojidexPalette:User:Followers', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  if (hasUserAccount()) {
    describe('general user [Requires a user info]', () => {
      it('cannot show followers tab', async done => {
        await showPalette()
        await tryLoginUser(userInfo.auth_user, userInfo.password)
        expect($('#tab-user-followers').length).toBe(0)
        done()
      })
    })
  }

  if (hasPremiumAccount()) {
    describe('premium user [Requires a premium user info and followers user]', () => {
      it('show followers tab', async done => {
        await logout()
        await tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
        await watchDOM('#follow-followers', {
          trigger: () => {
            $('#tab-user-followers a').click()
          },
          regex: /btn btn-default/
        })
        expect($('#follow-followers .users .btn').length).toBeTruthy()
        done()
      })

      it('show followers user info', async done => {
        await watchDOM('#follow-followers .user-info', {
          trigger: () => {
            $($('#follow-followers .users .btn')[0]).click()
          },
          properties: 'display',
          regex: /block/
        })
        expect($('#follow-followers .user-info.on .emoji-btn').length).toBeTruthy()
        done()
      })

      it('show followers user emoji next', async done => {
        const selectorCurrentUserInfo = '#follow-followers .user-info.on'
        await watchDOM(selectorCurrentUserInfo, {
          trigger: () => {
            $($(`${selectorCurrentUserInfo} .palette-pager`)[1]).click()
          },
          regex: /user-emoji-list/
        })
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('2')
        done()
      })

      it('show followers user emoji previous', async done => {
        const selectorCurrentUserInfo = '#follow-followers .user-info.on'
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
