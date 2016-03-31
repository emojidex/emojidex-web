describe "emojidexAutocomplete", ->
  beforeAll ->
    helperBefore()

  # afterAll ->
  #   helperAfter()

  it 'show autocomplete view (If this spec failed, test in browser.)', (done) ->
    plan_text = $('.emojidex-plain_text').emojidexAutocomplete()
    atwho_view = $('.atwho-view')
    console.log atwho_view

    spec_timer
      time: 1
      callback: ->
        console.log atwho_view.css('display')
        expect(atwho_view.css('display')).toEqual('none')
        simulateTypingIn plan_text

        spec_timer
          time: 3000
          callback: ->
            atwho_view = $('.atwho-view')
            expect(atwho_view.css('display')).toEqual('block')
            done()

  # it 'insert the text to emojidex-plain_text', ->
  #   text = $($('.atwho-view ul li')[0]).data('value')
  #   $($('.atwho-view ul li')[0]).click()
  #   expect($('textarea.emojidex-plain_text').val()).toBe text
  #
  #   $('#atwho-container').remove()
  #
  # it 'insert the emoji image to emojidex-content_editable', (done) ->
  #   content_editable = $('.emojidex-content_editable').emojidexAutocomplete()
  #   simulateTypingIn content_editable
  #
  #   spec_timer
  #     time: 3000
  #     callback: ->
  #       text = $($('.atwho-view ul li')[0]).data('value')
  #       text = "#{text.slice(1, text.length - 1)}.png"
  #       $($('.atwho-view ul li')[0]).click()
  #
  #       src = $('.emojidex-content_editable').find('img').attr('src')
  #       src = src.split('/')
  #       expect(src[src.length - 1]).toBe text
  #       done()
