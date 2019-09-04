/* eslint-disable no-undef */
describe('emojidexPalette:Indexes', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })
  
  it('index tab', async done => {
    await showPalette()
    expect($('#tab-content-index').find('img').length).toBeTruthy()
    done()
  })

  it('if not puremium user, cannot sorting', done => {
    const selector = $('#tab-content-index').find('.sort-selector')
    expect(selector.length).toEqual(0)
    done()
  })

  if (hasPremiumAccount()) {
    it('show sort selector [Requires a premium user info]', async done => {
      await tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
      await watchDOM('#tab-content-index')
      const selector = $('#tab-content-index').find('.sort-selector')
      expect(selector.length).toEqual(1)
      done()
    })

    it('sort', async done => {
      const firstEmojiBeforeSort = $($('#tab-content-index').find('img')[0]).attr('title')
      await watchDOM('#tab-content-index', {
        trigger: () => {
          $('#tab-content-index').find('.sort-selector').val('newest')
          $('#tab-content-index').find('.sort-selector').change()
        },
        regex: /index-emoji-list/
      })
      expect($($('#tab-content-index').find('img')[0]).attr('title')).not.toEqual(firstEmojiBeforeSort)
      done()
    })
  }
})
/* eslint-enable no-undef */
