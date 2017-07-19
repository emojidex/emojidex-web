describe("emojidexPalette:User:Following", () => {
  beforeAll(done => {
    clearStorage().then(() => {
      helperBefore();
      let limitForSpec = 1;
      $("#palette-btn").emojidexPalette({
        paletteEmojisLimit: limitForSpec,
        onComplete: () => {
          $("#palette-input").emojidexPalette({
            paletteEmojisLimit: limitForSpec,
            onComplete: () => { done(); }
          });
        }
      });
    });
  });

  afterAll(() => {
    closePalette();
    helperAfter();
  });

  it('show following tab [Requires a user account and following user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }

    $('#tab-content-user').watch({
      id: 'watcher',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data, i) {
        specTimer(1000).then(() => {
          removeWatch($('#tab-content-user'), 'watcher');

          $('#follow-following').watch({
            id: "watcher",
            properties: 'attr_class',
            callback(data, i) {
              expect($('#follow-following .users .btn').length).toBeTruthy();
              removeWatch($('#follow-following'), 'watcher');
              done();
            }
          });

          $('#tab-user-following a').click();
        });
      }
    });

    $('.ui-dialog').watch({
      id: 'dialog',
      properties: 'display',
      callback() {
        removeWatch($('.ui-dialog'), 'dialog');

        $('#tab-user a').click();
        $('#palette-emoji-username-input').val(user_info.auth_user);
        $('#palette-emoji-password-input').val(user_info.password);
        $('#palette-emoji-login-submit').click();
      }
    });
    $('.emojidex-palette-button')[0].click();
  });

  it('show following user info [Requires a user account and following user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }
    $('#follow-following .user-info').watch({
      id: "watcher",
      properties: 'attr_class',
      callback(data, i) {
        expect($('#follow-following .user-info.on .emoji-btn').length).toBeTruthy();
        removeWatch($('.user-info'), 'watcher');
        done();
      }
    });

    specTimer(1000).then(() => {
      $($('#follow-following .users .btn')[0]).click();
    });
  });

  it('show following user emoji next [Requires a user account and following user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }
    const selectorCurrentUserInfo = '#follow-following .user-info.on';
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

  it('show following user emoji previous [Requires a user account and following user]', done => {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }
    const selectorCurrentUserInfo = '#follow-following .user-info.on';
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
