describe("emojidexPalette:Base", () => {
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

  afterAll(() => helperAfter());

  it("created emojidexPalette button in input", done => {
    expect($('.emojidex-palette-button').length).toBe(1);
    done();
  })

  it("show emojidexPalette", done => {
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
    specTimer(1000).then(() => {
      $('.emojidex-palette-button')[0].click();
    })
  });

  // FIXME: this example isn't correct.
  // it 'emoji button click', ->
  //   clipboard = new Clipboard '.emoji-btn'
  //   clipboard_text = $($('#tab-content-cosmos').find('.emoji-btn')[0]).attr('data-clipboard-text')
  //   $($('#tab-content-cosmos').find('.emoji-btn')[0]).click()
  //   expect(clipboard.clipboardAction.selectedText).toBe clipboard_text

  it('close emojidexPalette', () => {
    $('button.pull-right[aria-label="Close"]').click();
    expect($('.ui-dialog')).toHaveCss({display: 'none'});
  });
});
