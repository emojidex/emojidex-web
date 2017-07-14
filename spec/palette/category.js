describe("emojidexPalette:Category", function() {
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

  describe('category tab', function() {
    it("changes to a specific category", function(done) {
      $('#tab-content-faces').watch({
        id: 'content_faces',
        properties: 'prop_innerHTML',
        watchChildren: true,
        callback(data, i) {
          if (data.vals[0].match(/category-emoji-list/)) {
            expect($('#tab-faces')).toHaveClass('active');
            expect($('#tab-content-faces')).toHaveClass('active');
            expect($('#tab-content-faces').find('img').length).toBeTruthy();
            removeWatch($('#tab-content-faces'), 'content_faces');
            done();
          }
        }
      });

      $('.ui-dialog').watch({
        id: 'dialog',
        properties: 'display',
        callback() {
          removeWatch($('.ui-dialog'), 'dialog');
          $('#tab-faces a').click();
        }
      });
      $('.emojidex-palette-button')[0].click();
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
});
