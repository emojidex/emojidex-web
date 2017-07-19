describe("emojidexAutocomplete", () => {
  beforeAll(() => helperBefore());

  afterAll(() => helperAfter());

  it('show autocomplete view (If this spec failed, test in browser.)', done => {
    let plain_text = $('.emojidex-plain_text').emojidexAutocomplete({
      onComplete: () => {
        expect($('.textcomplete-dropdown').length).toEqual(0);

        simulateTypingIn(plain_text);
        specTimer(3000).then(() => {
          expect($('.textcomplete-dropdown').css('display')).toEqual('block');
          done();
        });
      }
    });
  });

  it('inserts a text emoji code in an element marked as emojidex-plain_text', () => {
    let target = $('.textcomplete-dropdown li a')[0];
    let text = `:${$(target).text().trim()}:`;
    simulateMouseEvent(target);
    expect($('textarea.emojidex-plain_text').val()).toBe(text);

    $('.textcomplete-dropdown').remove();
  });

  it('inserts an emoji image in an element marked as emojidex-content_editable', done => {
    let content_editable = $('.emojidex-content_editable').emojidexAutocomplete({
      onComplete: () => {
        simulateTypingIn(content_editable);
        specTimer(3000).then(() => {
          let target = $('.textcomplete-dropdown li a')[0];
          let text = `${$(target).text().trim()}.png`;
          simulateMouseEvent(target);

          let src = content_editable.find('img').attr('src').split('/');
          expect(src[src.length - 1]).toBe(text);
          done();
        });
      }
    });
  });
});
