const keyboard = Keysim.Keyboard.US_ENGLISH;

describe("emojidexAutocomplete", () => {
  beforeAll(() => helperBefore());

  afterAll(() => helperAfter());

  it('show autocomplete view (If this spec failed, test in browser.) ' +
    'and inserts a text emoji code in an element marked as emojidex-plain_text', done => {
    let plain_text = $('.emojidex-plain_text').emojidexAutocomplete({
      onComplete: () => {
        expect($('.dropdown-textarea').css('display')).toEqual('none');
  
        plain_text.caret('pos', 5);
        keyboard.dispatchEventsForInput(':face', plain_text[0]);
        specTimer(3000).then(() => {
          expect($('.dropdown-textarea').css('display')).toEqual('block');
  
          let target = $('.dropdown-textarea li a')[0];
          let text = `:${$(target).text().trim()}:`;
          simulateMouseEvent(target);
          expect($('textarea.emojidex-plain_text').val()).toBe(text);
          done();
        });
      }
    });
  });

  it('inserts an emoji image in an element marked as emojidex-content_editable', done => {
    let content_editable = $('.emojidex-content_editable').emojidexAutocomplete({
      onComplete: () => {
        content_editable.caret('pos', 5);
        keyboard.dispatchEventsForInput(':face', content_editable[0]);
        specTimer(3000).then(() => {
          let target = $('.dropdown-contenteditable li a')[0];
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
