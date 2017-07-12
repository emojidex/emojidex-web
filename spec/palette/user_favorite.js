describe("emojidexPalette:User:Favorite", function() {
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

  describe('user tab', function() {
    it('show favorite tab [Requires a premium user account]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#tab-content-user').watch({
        id: 'content_user_favorite',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          if (data.vals[0].match(/favorite-emoji-list/)) {
            expect($('#tab-content-user-favorite').find('img').length).toBeTruthy();
            removeWatch($('#tab-content-user'), 'content_user_favorite');
            done();
          }
        }
      });

      $('#tab-content-user').watch({
        id: 'content_user',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          removeWatch($('#tab-content-user'), 'content_user');
          $('#tab-user-favorite a').click();
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

    it('switches to the next page [Requires a premium user account and many favorites]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#user-tab-content').watch({
        id: "content_user_next",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          spec_timer({
            time: 1000,
            callback() {
              expect($(data.vals[0]).find('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2');
              removeWatch($('#user-tab-content'), 'content_user_next');
              done();
            }
          });
        }
      });
      $('#tab-content-user-favorite').find('.pagination .palette-pager')[1].click();
    });

    it('switches to the previous page [Requires a premium user account and many favorites]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#user-tab-content').watch({
        id: "content_user_prev",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          spec_timer({
            time: 1000,
            callback() {
              expect($(data.vals[0]).find('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1');
              removeWatch($('#user-tab-content'), 'content_user_prev');
              done();
            }
          });
        }
      });
      $('#tab-content-user-favorite').find('.pagination .palette-pager')[0].click();
    });
  });
});
