describe("emojidexAutocomplete", function() {
  beforeAll(() => helperBefore());

  afterAll(() => helperAfter());

  it('show autocomplete view (If this spec failed, test in browser.)', function(done) {
    let plain_text = $('.emojidex-plain_text').emojidexAutocomplete({
      onComplete: () => {
        let atwho_view = $('.atwho-view');
        expect(atwho_view.css('display')).toEqual('none');

        simulateTypingIn(plain_text);
        spec_timer({
          time: 3000,
          callback() {
            atwho_view = $('.atwho-view');
            expect(atwho_view.css('display')).toEqual('block');
            done();
          }
        });
      }
    });
  }
  );

  it('inserts a text emoji code in an element marked as emojidex-plain_text', function() {
    let text = $($('.atwho-view ul li')[0]).data('value');
    $($('.atwho-view ul li')[0]).click();
    expect($('textarea.emojidex-plain_text').val()).toBe(text);

    $('.atwho-container').remove();
  });

  it('inserts an emoji image in an element marked as emojidex-content_editable', function(done) {
    let content_editable = $('.emojidex-content_editable').emojidexAutocomplete({
      onComplete: () => {
        simulateTypingIn(content_editable);
        spec_timer({
          time: 3000,
          callback() {
            let text = $($('.atwho-view ul li')[0]).data('value');
            text = `${text.slice(1, text.length - 1)}.png`;
            $($('.atwho-view ul li')[0]).click();

            let src = $('.emojidex-content_editable').find('img').attr('src');
            src = src.split('/');
            expect(src[src.length - 1]).toBe(text);
            done();
          }
        });
      }
    });
  }
  );
}
);
