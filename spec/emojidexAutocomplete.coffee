describe "emojidexAutocomplete", ->
  beforeEach ->
    jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
    loadFixtures('index.html')

  it "show autocomplete view", (done) ->
    plan_text = $('.emojidex-plain_text').emojidexAutocomplete()
    atwho_view = $('.atwho-view')
    expect(atwho_view).toHaveCss({display: 'none'})

    plan_text.caret 'pos', 5
    plan_text.focus().keyup()
    spec_timer
      callback: ->
        atwho_view = $('.atwho-view')
        expect(atwho_view.css('display')).toEqual('block')
        atwho_view.css('display', 'none')
        done()
