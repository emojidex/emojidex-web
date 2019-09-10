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
      $('#tab-index a').click()
      const selector = $('#tab-content-index').find('.sort-selector')
      expect(selector.length).toEqual(1)
      done()
    })

    describe('sort', () => {
      const target = '#tab-content-index'
      for (let i = 0; i < sortTypes.length; i++) {
        const sortType = sortTypes[i]
        it(`sort: ${sortType}`, async done => {
          const emojiName = await getEmojiCodeFromIndexAPI(sortType)
          await changeSortSelector(target, sortType, /index-emoji-list/)
          expect($($(target).find('img')[0]).attr('title')).toEqual(emojiName)
          done()
        })
      }
    })
  }
})
/* eslint-enable no-undef */
