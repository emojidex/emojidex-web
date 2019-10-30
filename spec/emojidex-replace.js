/* eslint-disable no-undef */
describe('emojidexReplace', () => {
  afterEach(async () => await helperAfterForReplace())

  it('replace to emojidex-emoji', async done => {
    await helperBefore()
  
    $('body').emojidexReplace()
    await $('body').data().plugin_emojidexReplace
    expect($('.emojidex_replace')).toContainElement('img.emojidex-emoji')
    done()
  })

  it('replace to emojidex-emoji (use 3D option)', async done => {
    await helperBeforeForThreed()

    $('body').emojidexReplace({ threed: true })
    await $('body').data().plugin_emojidexReplace
    await specTimer(5000)
    expect($('.threed-container')).toContainElement('div.emojidex-scene')
    done()
  })
})
/* eslint-enable no-undef */
