/* eslint-disable no-undef */
const keyboard = Keysim.Keyboard.US_ENGLISH

describe('emojidexAutocomplete', () => {
  beforeAll(() => helperBefore())

  afterAll(() => helperAfter())

  it('show autocomplete view (If this spec failed, test in browser.) ' +
    'and inserts a text emoji code in an element marked as emojidex-plain_text', async done => {
    const plainText = $('.emojidex-plain_text').emojidexAutocomplete()
    await plainText.data().plugin_emojidexAutocomplete.autocomplete
    expect($('.dropdown-textarea').css('display')).toEqual('none')

    plainText.caret('pos', 5)
    keyboard.dispatchEventsForInput(':face', plainText[0])
    await specTimer(3000)
    expect($('.dropdown-textarea').css('display')).toEqual('block')

    const target = $('.dropdown-textarea li a')[0]
    const text = `:${$(target).text().trim()}:`
    simulateMouseEvent(target)
    expect($('textarea.emojidex-plain_text').val()).toBe(text)
    done()
  })

  it('inserts an emoji image in an element marked as emojidex-content_editable', async done => {
    const contentEditable = $('.emojidex-content_editable').emojidexAutocomplete()
    await contentEditable.data().plugin_emojidexAutocomplete.autocomplete
    contentEditable.caret('pos', 5)
    keyboard.dispatchEventsForInput(':face', contentEditable[0])
    await specTimer(3000)
    const target = $('.dropdown-contenteditable li a')[0]
    const text = `${$(target).text().trim()}.png`
    simulateMouseEvent(target)
    const src = contentEditable.find('img').attr('src').split('/')
    expect(src[src.length - 1]).toBe(text)
    done()
  })
})
/* eslint-enable no-undef */
