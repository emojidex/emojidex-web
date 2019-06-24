describe("emojidexPalette:Search", () => {
  beforeAll(done => {
    beforePalette(done)
  });

  afterAll(done =>{
    afterPalette(done)
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

    showPalette(() => {
      $('#tab-search a').click();
      $('#palette-emoji-search-input').val('test');
      $('#palette-emoji-search-submit').click();
    });
  });
});
