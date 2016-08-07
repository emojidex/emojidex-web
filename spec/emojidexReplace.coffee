describe "emojidexReplace", ->
  beforeEach ->
    helperBefore()

  afterAll ->
    helperAfter()

  it 'replace to emojidex-emoji', (done) ->
    console.log $('body')
    $('body').emojidexReplace
      onComplete: (element) ->
        # expect($('.emojidex_replace')).toContainElement('img.emojidex-emoji')
        done()
