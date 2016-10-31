describe("emojidexReplace", function() {
  beforeEach(() => helperBefore());

  afterAll(() => helperAfter());

  it('replace to emojidex-emoji', done =>
    $('body').emojidexReplace({
      onComplete(element) {
        console.log(111)
        expect($('.emojidex_replace')).toContainElement('img.emojidex-emoji');
        done();
      }
    })
  );
});
