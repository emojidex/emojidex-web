describe("emojidexPalette", function() {
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

  afterAll(() => helperAfter());

  it("created emojidexPalette button in input", (done) => {
    expect($('.emojidex-palette-button').length).toBe(1);
    done();
  })

  it("show emojidexPalette", function(done) {
    expect($('.ui-dialog')).toHaveCss({display: 'none'});

    $('.ui-dialog').watch({
      id: 'dialog',
      properties: 'display',
      callback() {
        expect($('.ui-dialog')).toHaveCss({display: 'block'});
        removeWatch($('.ui-dialog'), 'dialog');
        done();
      }
    });
    spec_timer({
      time: 1000,
      callback: () => { $('.emojidex-palette-button')[0].click(); }
    })
  });

  describe('category tab', function() {
    it("changes to a specific category", function(done) {
      $('#tab-content-faces').watch({
        id: 'content_faces',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          if (data.vals[0].match(/category-emoji-list/)) {
            expect($('#tab-content-faces').find('img').length).toBeTruthy();
            removeWatch($('#tab-content-faces'), 'content_faces');
            done();
          }
        }
      });

      $('#tab-faces a').click();
      expect($('#tab-faces')).toHaveClass('active');
      expect($('#tab-content-faces')).toHaveClass('active');
    });

    it('switches to the next page', function(done) {
      $('#tab-content-faces').watch({
        id: "content_faces",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          expect($(data.vals[0]).find('ul.pagination li.disabled span').text().substr(0, 1)).toBe('2');
          removeWatch($('#tab-content-faces'), 'content_faces');
          done();
        }
      });

      $('#tab-content-faces').find('.pagination .palette-pager')[1].click();
    });

    it('switches to the previous page', function(done) {
      $('#tab-content-faces').watch({
        id: "content_faces",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          expect($(data.vals[0]).find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1');
          removeWatch($('#tab-content-faces'), 'content_faces');
          done();
        }
      });
      $('#tab-content-faces').find('.pagination .palette-pager')[0].click();
    });
  });

  // FIXME: this example isn't correct.
  // it 'emoji button click', ->
  //   clipboard = new Clipboard '.emoji-btn'
  //   clipboard_text = $($('#tab-content-cosmos').find('.emoji-btn')[0]).attr('data-clipboard-text')
  //   $($('#tab-content-cosmos').find('.emoji-btn')[0]).click()
  //   expect(clipboard.clipboardAction.selectedText).toBe clipboard_text

  it('search tab', function(done){
    $('#tab-content-search').watch({
      id: 'content_search',
      properties: 'prop_innerHTML',
      watchChildren: true,
      callback(data, i) {
        if (data.vals[0].match(/search-emoji-list/)) {
          expect($($('#tab-content-search').find('img')[0]).attr('title')).toContain('test');
          removeWatch($('#tab-content-search'), 'content_search');
          done();
        }
      }
    });

    $('#tab-search a').click();
    $('#palette-emoji-search-input').val('test');
    return $('#palette-emoji-search-submit').click();
  }
  );

  describe('user tab', function() {
    it('login (Failure)', function(done) {
      $('#tab-content-user').watch({
        id: 'content_user',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          if (data.vals[0].match(/login-error/)) {
            // TODO: english text
            expect($('#login-error span').text()).toBe('Login failed. Please check your username and password or login here.');
            removeWatch($('#tab-content-user'), 'content_user');
            done();
          }
        }
      });

      $('#tab-user a').click();
      $('#palette-emoji-username-input').val('aaa');
      $('#palette-emoji-password-input').val('aaa');
      $('#palette-emoji-login-submit').click();
    }
    );

    it('premium user login [Requires a premium user account]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#tab-content-user').watch({
        id: 'content_user',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          if (data.vals[0].match(/favorite-emoji-list/)) {
            $('#tab-user-favorite a').click();
            expect($('#tab-content-user-favorite').find('img').length).toBeTruthy();
            removeWatch($('#tab-content-user'), 'content_user');
            done();
          }
        }
      });

      $('#tab-user a').click();
      $('#palette-emoji-username-input').val(user_info.auth_user);
      $('#palette-emoji-password-input').val(user_info.password);
      $('#palette-emoji-login-submit').click();
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

    it('show history tab [Requires a premium user account]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#tab-content-user').watch({
        id: 'content_user_history',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          if (data.vals[0].match(/history-emoji-list/)) {
            expect($('#tab-content-user-history').find('img').length).toBeTruthy();
            removeWatch($('#tab-content-user'), 'content_user_history');
            done();
          }
        }
      });

      $('#tab-user-history a').click();
    });

    it('switches to the next page [Requires a premium user account and many history]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#user-tab-content').watch({
        id: "content_user_history_next",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          spec_timer({
            time: 1000,
            callback() {
              expect($(data.vals[0]).find('.history-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2');
              removeWatch($('#user-tab-content'), 'content_user_history_next');
              done();
            }
          });
        }
      });

      $('#tab-content-user-history').find('.pagination .palette-pager')[1].click();
    });

    it('switches to the previous page [Requires a premium user account and many history]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#user-tab-content').watch({
        id: "content_user_history_prev",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          spec_timer({
            time: 1000,
            callback() {
              expect($(data.vals[0]).find('.history-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1');
              removeWatch($('#user-tab-content'), 'content_user_history_prev');
              done();
            }
          });
        }
      });

      $('#tab-content-user-history').find('.pagination .palette-pager')[0].click();
    });

    // following tab --------
    it('show following tab [Requires a user account and following user]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
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

    it('show following user info [Requires a user account and following user]', function(done) {
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

      $($('#follow-following .users .btn')[0]).click();
    });

    it('show following user emoji next [Requires a user account and following user]', function(done) {
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

    it('show following user emoji previous [Requires a user account and following user]', function(done) {
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

    // followers tab --------
    it('show followers tab [Requires a premium user account and followers user]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
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

      $($('#follow-followers .users .btn')[0]).click();
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

   // it 'premium user can see the newest/popular emoji', (done) ->
   //   pending() unless premium_user_info?
   //   timer_option =
   //     callback: ->
   //       if $('#tab-content-user-newest').length
   //         $('#tab-user-newest a').click()
   //         expect($('#tab-content-user-newest').find('img').length).toBeTruthy()
   //         done()
   //       else
   //         spec_timer timer_option
   //   spec_timer timer_option

    it('logout', function(done) {
      if (typeof premium_user_info === 'undefined' || premium_user_info === null) { pending(); }
      $('#tab-content-user').watch({
        id: 'content_user',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          expect($('#palette-emoji-username-input')).toHaveCss({display: 'block'});
          removeWatch($('#tab-content-user'), 'content_user');
          done();
        }
      });
      $('#palette-emoji-logout').click();
    });

    it('general user login [Require user info]', function(done) {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#tab-content-user').watch({
        id: 'content_user',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          if (data.vals[0].match(/favorite-emoji-list/)) {
            expect($('#tab-content-user-favorite').find('img').length).toBeTruthy();
            removeWatch($('#tab-content-user'), 'content_user');
            done();
          }
        }
      });
      $('#tab-user a').click();
      $('#palette-emoji-username-input').val(user_info.auth_user);
      $('#palette-emoji-password-input').val(user_info.password);
      $('#palette-emoji-login-submit').click();
    });
  });

   // it 'general user can not see the newest/popular emoji', (done) ->
   //   pending() unless user_info?
   //   timer_option =
   //     callback: ->
   //       if $('#tab-content-user-newest').length
   //         $('#tab-user-newest a').click()
   //         expect($('#tab-content-user-newest').find('a').text()).toBe 'Premium/Pro user only.'
   //         done()
   //       else
   //         spec_timer timer_option
   //   spec_timer timer_option

  it('close emojidexPalette', function() {
    $('button.pull-right[aria-label="Close"]').click();
    expect($('.ui-dialog')).toHaveCss({display: 'none'});
  });

  it('login with storage data', function(done) {
    if (typeof user_info === 'undefined' || user_info === null) { pending(); }
    $('#palette-btn').removeData().unbind();
    $('#emojidex-emoji-palette, .emojidex-palette-div').remove();

    $("#palette-btn").emojidexPalette({
      onComplete: () => {
        spec_timer({
          time: 1000,
          callback: () => {
            $('.ui-dialog').watch({
              id: 'dialog_2',
              properties: 'display',
              callback() {
                removeWatch($('.ui-dialog'), 'dialog_2');

                $('#tab-content-user').watch({
                  id: 'content_user',
                  properties: 'prop_innerHTML',
                  watchChildren: true,
                  callback(data, i) {
                    if (data.vals[0].match(/favorite-emoji-list/)) {
                      expect($('#tab-content-user-favorite').find('img').length).toBeTruthy();
                      $('button.pull-right[aria-label="Close"]').click();
                      removeWatch($('#tab-content-user'), 'content_user');
                      return done();
                    }
                  }
                });
                $('#tab-user a').click();
              }
            });
            $("#palette-btn").click();
          }
        })
      }
    });
  });
});
