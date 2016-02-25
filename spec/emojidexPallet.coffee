describe "emojidexPallet", ->
  beforeAll ->
    jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
    loadFixtures('index.html')
    $("#pallet-btn").emojidexPallet()
    $('#pallet-btn').click()

  it "show emojidexPallet", (done) ->
    setTimeout ( ->
      expect($('.ui-dialog')).toHaveCss({display: 'block'})
      done()
    ), 3000

  describe 'category tab', ->
    it "change category", (done) ->
      $('#tab-cosmos a').click()
      expect($('#tab-cosmos')).toHaveClass('active')
      expect($('#tab-content-cosmos')).toHaveClass('active')

      setTimeout ( ->
        expect($('#tab-content-cosmos').find('img').length).toBeTruthy()
        done()
      ), 3000

    it 'page next', (done)  ->
      $($('.pagination').find('.pallet-pager')[1]).click()
      setTimeout ( ->
        expect($('#tab-content-cosmos').find('.disabled span').text().substr(0, 1)).toBe '2'
        done()
      ), 3000

    it 'page prev', (done) ->
      $($('.pagination').find('.pallet-pager')[0]).click()
      setTimeout ( ->
        expect($('#tab-content-cosmos').find('.disabled span').text().substr(0, 1)).toBe '1'
        done()
      ), 3000

  it 'emoji button click', (done) ->
    clipboard = new Clipboard '.emoji-btn'
    setTimeout ( ->
      clipboard_text = $($('#tab-content-abstract').find('.emoji-btn')[0]).attr('data-clipboard-text')
      $($('#tab-content-abstract').find('.emoji-btn')[0]).click()
      expect(clipboard.clipboardAction.selectedText).toBe clipboard_text
      done()
    ), 3000

  it 'search tab', (done)->
    $('#tab-search a').click()
    setTimeout ( ->
      $('#pallet-emoji-search-input').val('test')
      $('#pallet-emoji-search-submit').click()
      setTimeout ( ->
        expect($($('#tab-content-search').find('img')[0]).attr('title')).toContain('test')
        done()
      ), 2000
    ), 1000

  describe 'user tab', ->
    $('#tab-user a').click()
    it 'login', (done) ->
      done()

    # describe '[Premium user only]', ->
      # pending() unless premium_user_info?
