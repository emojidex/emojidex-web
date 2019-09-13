/* eslint-disable no-undef */
describe('emojidexPalette:Customization', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  it('changes to a customization tab', async done => {
    await showPalette()
    await watchDOM('#tab-content-customization', {
      trigger: () => {
        $('#tab-customization a').click()
      },
      regex: /customization-emoji-list/
    })
    expect($('#tab-customization')).toHaveClass('active')
    expect($('#tab-content-customization')).toHaveClass('active')
    expect($('#tab-content-customization').find('img').length).toBeTruthy()
    done()
  })

  it('switches to the next page', async done => {
    await watchDOM('#tab-content-customization', {
      trigger: () => {
        $('#tab-content-customization').find('.pagination .palette-pager')[1].click()
      }
    })
    expect($('.customization-pagination').find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
    done()
  })

  it('switches to the previous page', async done => {
    await watchDOM('#tab-content-customization', {
      trigger: () => {
        $('#tab-content-customization').find('.pagination .palette-pager')[0].click()
      }
    })
    expect($('.customization-pagination').find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
    done()
  })

  it('open the customization content', async done => {
    await watchDOM('#tab-content-customization', {
      trigger: () => {
        $($('.customization-emoji-list .emoji-btn')[0]).click()
      },
      regex: /customization-info/
    })
    expect($('.customization-preview').length).toBeTruthy()
    expect($('.customization-select').length).toBeTruthy()

    await watchDOM('.customization-preview')
    expect($('.customization-preview').find('img').length).toBeTruthy()
    done()
  })
})
/* eslint-enable no-undef */
