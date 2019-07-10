/* eslint-disable no-undef */
describe('emojidexPalette:User:Favorite', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('show favorite tab [Requires a premium user account]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#tab-content-user').watch({
      id: 'content_user_favorite',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        if (data.vals[0].match(/favorite-emoji-list/)) {
          expect($('#tab-content-user-favorite').find('img').length).toBeTruthy()
          removeWatch($('#tab-content-user'), 'content_user_favorite')
          done()
        }
      }
    })

    $('#tab-content-user').watch({
      id: 'content_user',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback() {
        removeWatch($('#tab-content-user'), 'content_user')
        $('#tab-user-favorite a').click()
      }
    })

    showPalette(() => {
      loginUser(userInfo.auth_user, userInfo.password)
    })
  })

  it('switches to the next page [Requires a premium user account and many favorites]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#user-tab-content').watch({
      id: 'content_user_next',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        specTimer(1000).then(() => {
          expect($(data.vals[0]).find('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
          removeWatch($('#user-tab-content'), 'content_user_next')
          done()
        })
      }
    })
    $('#tab-content-user-favorite').find('.pagination .palette-pager')[1].click()
  })

  it('switches to the previous page [Requires a premium user account and many favorites]', done => {
    if (typeof userInfo === 'undefined' || userInfo === null) {
      pending()
    }

    $('#user-tab-content').watch({
      id: 'content_user_prev',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        specTimer(1000).then(() => {
          expect($(data.vals[0]).find('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
          removeWatch($('#user-tab-content'), 'content_user_prev')
          done()
        })
      }
    })
    $('#tab-content-user-favorite').find('.pagination .palette-pager')[0].click()
  })
})
/* eslint-enable no-undef */
