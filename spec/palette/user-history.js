/* eslint-disable no-undef */
describe('emojidexPalette:User:History', () => {
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
      it('show history tab', async done => {
        await showPalette()
        await tryLoginUser(userInfo.auth_user, userInfo.password)
        await watchDOM('#tab-content-user', {
          trigger: () => {
            $('#tab-user-history a').click()
          },
          regex: /history-emoji-list/
        })
        expect($('#tab-content-user-history').find('img').length).toBeTruthy()
        done()
      })

      it('cannot switches to the prev/next page', done => {
        const pagers = $('.history-pagination').find('.palette-pager')
        expect(pagers[0]).toHaveClass('disabled')
        expect(pagers[1]).toHaveClass('disabled')
        done()
      })
    })
  }

  if (hasPremiumAccount()) {
    describe('premium user [Require a premium user info]', () => {
      it('show history tab', async done => {
        await logout()
        await tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
        await watchDOM('#tab-content-user', {
          trigger: () => {
            $('#tab-user-history a').click()
          },
          regex: /history-emoji-list/
        })
        expect($('#tab-content-user-history').find('img').length).toBeTruthy()
        done()
      })

      it('switches to the next page [Requires many history]', async done => {
        await watchDOM('#tab-content-user-history', {
          trigger: () => {
            $('#tab-content-user-history').find('.pagination .palette-pager')[1].click()
          }
        })
        expect($('.history-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
        done()
      })

      it('switches to the previous page [Requires many history]', async done => {
        await watchDOM('#tab-content-user-history', {
          trigger: () => {
            $('#tab-content-user-history').find('.pagination .palette-pager')[0].click()
          }
        })
        expect($('.history-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
        done()
      })
    })
  }
})
/* eslint-enable no-undef */
