/* eslint-disable no-undef */
describe('emojidexReplace', () => {
  beforeEach(() => helperBefore())

  afterAll(() => helperAfter())

  it('replace to emojidex-emoji', async done => {
    $('body').emojidexReplace()
    await $('body').data().plugin_emojidexReplace
    expect($('.emojidex_replace')).toContainElement('img.emojidex-emoji')
    done()
  })
})
/* eslint-enable no-undef */
