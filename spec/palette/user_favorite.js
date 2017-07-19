describe("emojidexPalette:User:Favorite", () => {
  beforeAll(done => {
    clearStorage().then(() => {
      helperBefore();
      preparePaletteButtons(done);
    });
  });

  afterAll(() => {
    closePalette();
    helperAfter();
  });

  describe('user tab', () => {
    it('show favorite tab [Requires a premium user account]', done => {
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

      showPalette(() => {
        loginUser(user_info.auth_user, user_info.password);
      });
    });

    it('switches to the next page [Requires a premium user account and many favorites]', done => {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#user-tab-content').watch({
        id: "content_user_next",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          specTimer(1000).then(() => {
            expect($(data.vals[0]).find('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2');
            removeWatch($('#user-tab-content'), 'content_user_next');
            done();
          });
        }
      });
      $('#tab-content-user-favorite').find('.pagination .palette-pager')[1].click();
    });

    it('switches to the previous page [Requires a premium user account and many favorites]', done => {
      if (typeof user_info === 'undefined' || user_info === null) { pending(); }
      $('#user-tab-content').watch({
        id: "content_user_prev",
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i, mutations) {
          specTimer(1000).then(() => {
            expect($(data.vals[0]).find('.favorite-pagination ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1');
            removeWatch($('#user-tab-content'), 'content_user_prev');
            done();
          });
        }
      });
      $('#tab-content-user-favorite').find('.pagination .palette-pager')[0].click();
    });
  });
});
