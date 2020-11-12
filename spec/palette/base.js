/* eslint-disable no-undef */
describe('emojidexPalette:Base', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  it('created emojidexPalette button in input', done => {
    expect($('.emojidex-palette-button').length).toBe(1)
    done()
  })

  xit('show emojidexPalette', async done => {
    expect($('.ui-dialog')).toHaveCss({ display: 'none' })

    await showPalette()
    expect($('.ui-dialog')).toHaveCss({ display: 'block' })
    done()
  })

  xit('copy emoji code to clipboard', done => {
    const clipboard = new Clipboard('.emoji-btn', {
      text: trigger => {
        return $(trigger).find('img').attr('title')
      }
    })
    const clipboardText = $($('#tab-content-index').find('img')[0]).attr('title')
    $($('#tab-content-index').find('.emoji-btn')[0]).click()
    expect(clipboard.clipboardAction.selectedText).toBe(clipboardText)
    done()
  })

  xit('close emojidexPalette', () => {
    $('button.pull-right[aria-label="Close"]').click()
    expect($('.ui-dialog')).toHaveCss({ display: 'none' })
  })
})
/* eslint-enable no-undef */
