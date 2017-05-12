describe("emojidexAutocomplete", function() {
  beforeAll(() => helperBefore());

  afterAll(() => helperAfter());

  it('show autocomplete view (If this spec failed, test in browser.)', function(done) {
    let plain_text = $('.emojidex-plain_text').emojidexAutocomplete({
      onComplete: () => {
        let autocomplete_view = $('.textcomplete-dropdown');
        expect(autocomplete_view.length).toEqual(0);

        simulateTypingIn(plain_text);
        spec_timer({
          time: 3000,
          callback() {
            autocomplete_view = $('.textcomplete-dropdown');
            expect(autocomplete_view.css('display')).toEqual('block');
            done();
          }
        });
      }
    });
  });

  it('inserts a text emoji code in an element marked as emojidex-plain_text', function() {
    let target = $($('.textcomplete-dropdown li a')[0])
    let text = ':' + target.text().trim() + ':';
    let mde = document.createEvent("MouseEvents");
    mde.initMouseEvent("mousedown", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    $('.textcomplete-dropdown li a')[0].dispatchEvent(mde);
    expect($('textarea.emojidex-plain_text').val()).toBe(text);

    $('.textcomplete-dropdown').remove();
  });

  // TODO:
  it('inserts an emoji image in an element marked as emojidex-content_editable', function(done) {
    let content_editable = $('.emojidex-content_editable').emojidexAutocomplete({
      onComplete: () => {
        simulateTypingIn(content_editable);
        spec_timer({
          time: 3000,
          callback() {
            let text = $($('.textcomplete-dropdown li')[0]).data('value');
            text = `${text.slice(1, text.length - 1)}.png`;
            $($('.textcomplete-dropdown li')[0]).click();

            let src = $('.emojidex-content_editable').find('img').attr('src');
            src = src.split('/');
            expect(src[src.length - 1]).toBe(text);
            done();
          }
        });
      }
    });
  });
}
);
