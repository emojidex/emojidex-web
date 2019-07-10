/* eslint-disable no-undef */
describe('emojidexReplace', () => {
  beforeEach(() => helperBefore())

  afterAll(() => helperAfter())

  it('replace to emojidex-emoji', done =>
    $('body').emojidexReplace({
      onComplete() {
        expect($('.emojidex_replace')).toContainElement('img.emojidex-emoji')
        done()
      }
    })
  )
})
/* eslint-enable no-undef */
