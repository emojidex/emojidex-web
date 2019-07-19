/* eslint-disable no-undef */
describe('emojidexPalette:Search', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('search tab', done => {
    showPalette().then(() => {
      $('#tab-search a').click()
      $('#palette-emoji-search-input').val('test')
      return watchDOM('#tab-content-search', {trigger: () => {
        $('#palette-emoji-search-submit').click()
      }, regex: /search-emoji-list/})
    }).then(() => {
      expect($($('#tab-content-search').find('img')[0]).attr('title')).toContain('test')
      done()
    })
  })
})
/* eslint-enable no-undef */
