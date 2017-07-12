describe("emojidexPalette:User:Followers", function() {
  beforeAll(function(done) {
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

  it('show followers tab [Requires a premium user account and followers user]', function(done) {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }

    $('#tab-content-user').watch({
      id: 'watcher',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data, i) {
        spec_timer({
          time: 1000,
          callback() {
            removeWatch($('#tab-content-user'), 'watcher');

            $('#follow-followers').watch({
              id: "watcher",
              properties: 'attr_class',
              callback(data, i) {
                expect($('#follow-followers .users .btn').length).toBeTruthy();
                removeWatch($('#follow-followers'), 'watcher');
                done();
              }
            });

            $('#tab-user-followers a').click();
          }
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

  it('show followers user info [Requires a premium user account and followers user]', function(done) {
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

  it('show followers user emoji next [Requires premium a user account and followers user]', function(done) {
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

  it('show followers user emoji previous [Requires a premium user account and followers user]', function(done) {
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
