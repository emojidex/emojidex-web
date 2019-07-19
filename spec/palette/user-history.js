/* eslint-disable no-undef */
describe('emojidexPalette:User:History', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  if (premiumUserInfo) {
    it('show history tab [Requires a premium user account]', done => {
      showPalette().then(() => {
        return watchDOM('#emoji-palette', {trigger: () => {
            tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
          }, regex: /favorite-emoji-list/
        })
      }).then(() => {
        return watchDOM('#tab-content-user', {trigger: () => {
          $('#tab-user-history a').click()
        }, regex: /history-emoji-list/})
      }).then(() => {
        expect($('#tab-content-user-history').find('img').length).toBeTruthy()
        done()
      })
    })

    it('switches to the next page [Requires a premium user account and many history]', done => {
      watchDOM('#tab-content-user-history').then(() => {
        expect($('.history-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
        done()
      })
      $('#tab-content-user-history').find('.pagination .palette-pager')[1].click()
    })

    it('switches to the previous page [Requires a premium user account and many history]', done => {
      watchDOM('#tab-content-user-history').then(() => {
        expect($('.history-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
        done()
      })
      $('#tab-content-user-history').find('.pagination .palette-pager')[0].click()
    })
  }
})
/* eslint-enable no-undef */
