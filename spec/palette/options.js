/* eslint-disable no-undef */
describe('emojidexPalette:Options', () => {
  beforeAll(async done => {
    await clearStorage()
    await helperBefore()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  it('check onEmojiButtonClicked option', async done => {
    await preparePaletteButtons({
      onEmojiButtonClicked: clickedData => {
        const emojiTitle = $($('.emoji-btn.btn.btn-default.pull-left')[0]).find('img').attr('title')
        expect(clickedData.imageTag).toEqual(`<img alt="${emojiTitle}" title="${emojiTitle}" class="emojidex-emoji" src="https://cdn.emojidex.com/emoji/px32/${emojiTitle.replace(/\s/g, '_')}.png">`)
        expect(clickedData.emojiCode).toEqual(`:${emojiTitle}:`)
        done()
      }
    })
    await showPalette()
    $($('.emoji-btn.btn.btn-default.pull-left')[0]).click()
  })
})
/* eslint-enable no-undef */
