/* eslint-disable no-undef */
describe('emojidexPalette:Category', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  it('changes to a specific category', async done => {
    await showPalette()
    await watchDOM('#tab-content-faces', {
      trigger: () => {
        $('#tab-faces a').click()
      },
      regex: /category-emoji-list/
    })
    expect($('#tab-faces')).toHaveClass('active')
    expect($('#tab-content-faces')).toHaveClass('active')
    expect($('#tab-content-faces').find('img').length).toBeTruthy()
    done()
  })

  it('switches to the next page', async done => {
    await watchDOM('#tab-content-faces', {
      trigger: () => {
        $('#tab-content-faces').find('.pagination .palette-pager')[1].click()
      }
    })
    expect($('#tab-content-faces').find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
    done()
  })

  it('switches to the previous page', async done => {
    await watchDOM('#tab-content-faces', {
      trigger: () => {
        $('#tab-content-faces').find('.pagination .palette-pager')[0].click()
      }
    })
    expect($('#tab-content-faces').find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
    done()
  })

  it('if not puremium user, cannot sorting', done => {
    const selector = $('#tab-content-faces').find('.sort-selector')
    expect(selector.length).toEqual(0)
    done()
  })

  if (hasPremiumAccount()) {
    describe('premium user', () => {
      it('show sort selector', async done => {
        await tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
        await watchDOM('#tab-content-faces')
        const selector = $('#tab-content-faces').find('.sort-selector')
        expect(selector.length).toEqual(1)
        done()
      })

      it('sort', async done => {
        const firstEmojiBeforeSort = $($('#tab-content-faces').find('img')[0]).attr('title')
        await watchDOM('#tab-content-faces', {
          trigger: () => {
            $('#tab-content-faces').find('.sort-selector').val('newest')
            $('#tab-content-faces').find('.sort-selector').change()
          },
          regex: /category-emoji-list/
        })
        expect($($('#tab-content-faces').find('img')[0]).attr('title')).not.toEqual(firstEmojiBeforeSort)
        done()
      })
    })
  }
})
/* eslint-enable no-undef */
