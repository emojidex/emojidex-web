/* eslint-disable no-undef */
describe('emojidexPalette:User:Favorite', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  if (hasPremiumAccount) {
    it('show favorite tab [Requires a premium user account]', done => {
      showPalette().then(() => {
        return watchDOM('#emoji-palette', {trigger: () => {
            tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
          }, regex: /favorite-emoji-list/
        })
      }).then(() => {
        expect($('#tab-content-user-favorite').find('img').length).toBeTruthy()
        done()
      })
    })

    it('switches to the next page [Requires a premium user account and many favorites]', done => {
      watchDOM('#tab-content-user-favorite', {regex: /palette-num/}).then(() => {
        expect($('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
        done()
      })
      $('#tab-content-user-favorite').find('.pagination .palette-pager')[1].click()
    })

    it('switches to the previous page [Requires a premium user account and many favorites]', done => {
      watchDOM('#tab-content-user-favorite', {regex: /palette-num/}).then(() => {
        expect($('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
        done()
      })
      $('#tab-content-user-favorite').find('.pagination .palette-pager')[0].click()
    })
  }
})
/* eslint-enable no-undef */
