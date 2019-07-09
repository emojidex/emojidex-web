describe("emojidexPalette:User:Followers", () => {
  beforeAll(done => {
    beforePalette(done)
  });

  afterAll(done =>{
    afterPalette(done)
  });

  it('show followers tab [Requires a premium user account and followers user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }

    $('#tab-content-user').watch({
      id: 'watcher',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data, i) {
        removeWatch($('#tab-content-user'), 'watcher');

        specTimer(3000).then(() => {
          $('#tab-user-followers a').click();
          return specTimer(1000)
        }).then(() => {
          expect($('#follow-followers .users .btn').length).toBeTruthy();
          done();
        });
      }
    });

    showPalette(() => {
      loginUser(user_info.auth_user, user_info.password);
    });
  });

  it('show followers user info [Requires a premium user account and followers user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }
    $('#follow-followers .user-info').watch({
      id: "watcher",
      properties: 'attr_class',
      callback(data, i) {
        expect($('#follow-followers .user-info.on .emoji-btn').length).toBeTruthy();
        removeWatch($('.user-info'), 'watcher');
        done();
      }
    });

    specTimer(1000).then(() => {
      $($('#follow-followers .users .btn')[0]).click();
    });
  });

  it('show followers user emoji next [Requires premium a user account and followers user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }
    const selectorCurrentUserInfo = '#follow-followers .user-info.on';
    $(selectorCurrentUserInfo).watch({
      id: "watcher",
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data, i) {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('2');
        removeWatch($('.user-info'), 'watcher');
        done();
      }
    });

    $($(`${selectorCurrentUserInfo} .palette-pager`)[1]).click();
  });

  it('show followers user emoji previous [Requires a premium user account and followers user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }
    const selectorCurrentUserInfo = '#follow-followers .user-info.on';
    $(selectorCurrentUserInfo).watch({
      id: "watcher",
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data, i) {
        expect($(`${selectorCurrentUserInfo} .palette-num span`).text().charAt(0)).toBe('1');
        removeWatch($('.user-info'), 'watcher');
        done();
      }
    });

    $($(`${selectorCurrentUserInfo} .palette-pager`)[0]).click();
  });
});
