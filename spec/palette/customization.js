/* eslint-disable no-undef */
describe('emojidexPalette:Customization', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('changes to a customization tab', done => {
    showPalette().then(() => {
      return watchDOM('#tab-content-customization', {trigger: () => {
        $('#tab-customization a').click()
      },
      regex: /customization-emoji-list/})
    }).then(() => {
      expect($('#tab-customization')).toHaveClass('active')
      expect($('#tab-content-customization')).toHaveClass('active')
      expect($('#tab-content-customization').find('img').length).toBeTruthy()
      done()
    })
  })

  it('switches to the next page', done => {
    watchDOM('#tab-content-customization').then((data) => {
      expect($(data.vals[0]).find('ul.pagination li.disabled span').text().substr(0, 1)).toBe('2')
      done()
    })
    $('#tab-content-customization').find('.pagination .palette-pager')[1].click()
  })

  it('switches to the previous page', done => {
    watchDOM('#tab-content-customization').then((data) => {
      expect($(data.vals[0]).find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
      done()
    })
    $('#tab-content-customization').find('.pagination .palette-pager')[0].click()
  })

  it('open the customization content', done => {
    watchDOM('#tab-content-customization', {regex: /customization-info/}).then((data) => {
      expect($(data.vals[0]).find('.customization-preview').length).toBeTruthy()
      expect($(data.vals[0]).find('.customization-select').length).toBeTruthy()
      return watchDOM('.customization-preview')
    }).then((data) => {
      expect($(data.vals[0]).find('img').length).toBeTruthy()
      done()
    })
    specTimer(1000).then(() => {
      $($('.customization-emoji-list .emoji-btn')[0]).click()
    })
  })
})
/* eslint-enable no-undef */
