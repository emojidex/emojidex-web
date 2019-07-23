/* eslint-disable no-undef */
describe('emojidexPalette:Category', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('changes to a specific category', done => {
    showPalette().then(() => {
      return watchDOM('#tab-content-faces', {trigger: () => {
        $('#tab-faces a').click()
      },regex: /category-emoji-list/})
    }).then(() => {
      expect($('#tab-faces')).toHaveClass('active')
      expect($('#tab-content-faces')).toHaveClass('active')
      expect($('#tab-content-faces').find('img').length).toBeTruthy()
      done()
    })
  })

  it('switches to the next page', done => {
    watchDOM('#tab-content-faces').then((data) => {
      expect($(data.vals[0]).find('ul.pagination li.disabled span').text().substr(0, 1)).toBe('2')
      done()
    })
    $('#tab-content-faces').find('.pagination .palette-pager')[1].click()
  })

  it('switches to the previous page', done => {
    watchDOM('#tab-content-faces').then((data) => {
      expect($(data.vals[0]).find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
      done()
    })
    $('#tab-content-faces').find('.pagination .palette-pager')[0].click()
  })
})
/* eslint-enable no-undef */
