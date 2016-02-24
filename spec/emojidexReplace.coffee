describe "emojidexReplace", ->
  beforeEach ->
    jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
    loadFixtures('index.html')
    @jquery = new $

  it 'replace to emojix-emoji', (done) ->
    $('body').emojidexReplace
      onComplete: (element) ->
        expect($('.emojidex_replace')).toContainElement('img.emojidex-emoji')
        done()
