/* eslint-disable no-undef */
describe('emojidexPalette:Base', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  it('created emojidexPalette button in input', done => {
    expect($('.emojidex-palette-button').length).toBe(1)
    done()
  })

  it('show emojidexPalette', done => {
    expect($('.ui-dialog')).toHaveCss({ display: 'none' })

    showPalette().then(() => {
      expect($('.ui-dialog')).toHaveCss({ display: 'block' })
      done()
    })
  })

  // FIXME: this example isn't correct.
  // it 'emoji button click', ->
  //   clipboard = new Clipboard '.emoji-btn'
  //   clipboard_text = $($('#tab-content-cosmos').find('.emoji-btn')[0]).attr('data-clipboard-text')
  //   $($('#tab-content-cosmos').find('.emoji-btn')[0]).click()
  //   expect(clipboard.clipboardAction.selectedText).toBe clipboard_text

  it('close emojidexPalette', () => {
    $('button.pull-right[aria-label="Close"]').click()
    expect($('.ui-dialog')).toHaveCss({ display: 'none' })
  })
})
/* eslint-enable no-undef */
