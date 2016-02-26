describe "emojidexReplace", ->
  beforeEach ->
    helperBefore()
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

  it 'replace to emojidex-emoji', (done) ->
    $('body').emojidexReplace
      onComplete: (element) ->
        expect($('.emojidex_replace')).toContainElement('img.emojidex-emoji')
        done()
