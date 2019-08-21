/* eslint-disable no-undef */
describe('emojidexPalette:User:Favorite', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  if (hasUserAccount()) {
    describe('general user [Requires a user account]', () => {
      it('show favorite tab', async done => {
        await showPalette()
        await tryLoginUser(userInfo.auth_user, userInfo.password)
        expect($('#tab-content-user-favorite').find('img').length).toBeTruthy()
        done()
      })

      it('cannot switches to the prev/next page', done => {
        const pagers = $('.favorite-pagination').find('.palette-pager')
        expect(pagers[0]).toHaveClass('disabled')
        expect(pagers[1]).toHaveClass('disabled')
        done()
      })
    })
  }

  if (hasPremiumAccount()) {
    describe('premium user [Require a premium user info]', () => {
      it('show favorite tab', async done => {
        await logout()
        await tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
        expect($('#tab-content-user-favorite').find('img').length).toBeTruthy()
        done()
      })

      it('switches to the next page [Requires many favorites]', async done => {
        await watchDOM('#tab-content-user-favorite', {
          trigger: () => {
            $('#tab-content-user-favorite').find('.pagination .palette-pager')[1].click()
          },
          regex: /palette-num/
        })
        expect($('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
        done()
      })

      it('switches to the previous page [Requires many favorites]', async done => {
        await watchDOM('#tab-content-user-favorite', {
          trigger: () => {
            $('#tab-content-user-favorite').find('.pagination .palette-pager')[0].click()
          },
          regex: /palette-num/
        })
        expect($('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
        done()
      })
    })
  }
})
/* eslint-enable no-undef */
