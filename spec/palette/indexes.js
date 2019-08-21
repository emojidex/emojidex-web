/* eslint-disable no-undef */
describe('emojidexPalette:Indexes', () => {
  beforeAll(done => {
    beforePalette(done)
  })

  afterAll(done => {
    afterPalette(done)
  })

  // if (hasPremiumAccount()) {
  //   it('show sort selector [Requires a premium user account]', done => {
      // TODO: indexesタブを修正したら追加する
    //   showPalette().then(() => {
    //     return watchDOM('#emoji-palette', {trigger: () => {
    //         tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
    //       }, regex: /favorite-emoji-list/
    //     })
    //   }).then(() => {
    //     return watchDOM('#tab-content-index', {
    //       trigger: () => {
    //         $('#tab-index a').click()
    //       },
    //       properties: 'display'
    //       regex: /block/
    //     })
    //   }).then(() => {
    //     expect($('#tab-content-index .index-pagination .sort-selector').length).toBeTruthy()
    //     done()
    //   })
  //   })
  // }
})
/* eslint-enable no-undef */
