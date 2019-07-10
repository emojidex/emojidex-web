/* eslint-disable no-undef */
describe('emojidexPalette:Customization', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('changes to a customization tab', done => {
    $('#tab-content-customization').watch({
      id: 'content_customization',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        if (data.vals[0].match(/customization-emoji-list/)) {
          expect($('#tab-customization')).toHaveClass('active')
          expect($('#tab-content-customization')).toHaveClass('active')
          expect($('#tab-content-customization').find('img').length).toBeTruthy()
          removeWatch($('#tab-content-customization'), 'content_customization')
          done()
        }
      }
    })

    showPalette(() => {
      $('#tab-customization a').click()
    })
  })

  it('switches to the next page', done => {
    $('#tab-content-customization').watch({
      id: 'content_customization',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        expect($(data.vals[0]).find('ul.pagination li.disabled span').text().substr(0, 1)).toBe('2')
        removeWatch($('#tab-content-customization'), 'content_customization')
        done()
      }
    })
    $('#tab-content-customization').find('.pagination .palette-pager')[1].click()
  })

  it('switches to the previous page', done => {
    $('#tab-content-customization').watch({
      id: 'content_customization',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        expect($(data.vals[0]).find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
        removeWatch($('#tab-content-customization'), 'content_customization')
        done()
      }
    })
    $('#tab-content-customization').find('.pagination .palette-pager')[0].click()
  })

  it('open the customization content', done => {
    $('#tab-content-customization').watch({
      id: 'content_customization',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data) {
        if (data.vals[0].match(/customization-info/)) {
          expect($(data.vals[0]).find('.customization-preview').length).toBeTruthy()
          expect($(data.vals[0]).find('.customization-select').length).toBeTruthy()
          removeWatch($('#tab-content-customization'), 'content_customization')
          $('.customization-preview').watch({
            id: 'customization_preview',
            properties: 'prop_innerHTML',
            watchChildren: true,
            callback(data) {
              expect($(data.vals[0]).find('img').length).toBeTruthy()
              removeWatch($('.customization-preview'), 'customization_preview')
              done()
            }
          })
        }
      }
    })

    specTimer(1000).then(() => {
      $($('.customization-emoji-list .emoji-btn')[0]).click()
    })
  })
})
/* eslint-enable no-undef */
