describe("emojidexPalette:Search", () => {
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

  it('search tab', done => {
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

    $('.ui-dialog').watch({
      id: 'dialog',
      properties: 'display',
      callback() {
        removeWatch($('.ui-dialog'), 'dialog');

        $('#tab-search a').click();
        $('#palette-emoji-search-input').val('test');
        $('#palette-emoji-search-submit').click();
      }
    });
    $('.emojidex-palette-button')[0].click();
  });
});
