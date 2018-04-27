describe("emojidexPalette:Options", () => {
  beforeAll(done => {
    clearStorage().then(() => {
      helperBefore();
      done();
    });
  });

  afterAll(() => {
    closePalette();
    helperAfter();
  });

  it("check onEmojiButtonClicked option", done => {
    preparePaletteButtons(() => {
      showPalette(() => {
        $($('.emoji-btn.btn.btn-default.pull-left')[0]).click();
      })
    },
    {
      onEmojiButtonClicked: (clickedData) => {
        let emojiTitle = $($('.emoji-btn.btn.btn-default.pull-left')[0]).find('img').attr('title');
        expect(clickedData.imageTag).toEqual(`<img alt="${emojiTitle}" title="${emojiTitle}" class="emojidex-emoji" src="https://cdn.emojidex.com/emoji/px32/${emojiTitle.replace(/\s/g, '_')}.png">`);
        expect(clickedData.emojiCode).toEqual(`:${emojiTitle}:`);
        done();
      }
    });
  });
});
