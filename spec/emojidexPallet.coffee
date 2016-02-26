describe "emojidexPallet", ->
  beforeAll ->
    helperBefore()
    $("#pallet-btn").emojidexPallet()
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

  it "show emojidexPallet", (done) ->
    expect($('.ui-dialog')).toHaveCss({display: 'none'})

    $('.ui-dialog').watch
      properties: 'display'
      callback: ->
        expect($('.ui-dialog')).toHaveCss({display: 'block'})
        done()

    $('#pallet-btn').click()

  # describe 'category tab', ->
  #   it "change category", (done) ->
  #     $('#tab-content-cosmos').watch
  #       id: 'content_cosmos'
  #       properties: 'prop_innerHTML'
  #       watchChildren: true
  #       callback: (data, i) ->
  #         if data.vals[0].match /category-emoji-list/
  #           expect($('#tab-content-cosmos').find('img').length).toBeTruthy()
  #           remove_watch $('#tab-content-cosmos'), 'content_cosmos'
  #           done()
  #
  #     $('#tab-cosmos a').click()
  #     expect($('#tab-cosmos')).toHaveClass('active')
  #     expect($('#tab-content-cosmos')).toHaveClass('active')
  #
  #   it 'page next', (done) ->
  #     $('#tab-content-cosmos').watch
  #       id: "content_cosmos"
  #       properties: 'prop_innerHTML'
  #       watchChildren: true
  #       callback: (data, i, mutations) ->
  #         expect($(data.vals[0]).find('ul.pagination li.disabled span').text().substr(0, 1)).toBe '2'
  #         remove_watch $ '#tab-content-cosmos', 'content_cosmos'
  #         done()
  #
  #     $($('.pagination').find('.pallet-pager')[1]).click()
  #
  #   it 'page prev', (done) ->
  #     $('#tab-content-cosmos').watch
  #       id: "content_cosmos"
  #       properties: 'prop_innerHTML'
  #       watchChildren: true
  #       callback: (data, i, mutations) ->
  #         expect($(data.vals[0]).find('ul.pagination li.disabled span').text().substr(0, 1)).toBe '1'
  #         remove_watch $ '#tab-content-cosmos', 'content_cosmos'
  #         done()
  #
  #     $($('.pagination').find('.pallet-pager')[0]).click()
  #
  # it 'emoji button click', ->
  #   clipboard = new Clipboard '.emoji-btn'
  #   clipboard_text = $($('#tab-content-cosmos').find('.emoji-btn')[0]).attr('data-clipboard-text')
  #   $($('#tab-content-cosmos').find('.emoji-btn')[0]).click()
  #   expect(clipboard.clipboardAction.selectedText).toBe clipboard_text

  # it 'search tab', (done)->
  #   $('#tab-content-search').watch
  #     id: 'content_search'
  #     properties: 'prop_innerHTML'
  #     watchChildren: true
  #     callback: (data, i) ->
  #       if data.vals[0].match /search-emoji-list/
  #         expect($($('#tab-content-search').find('img')[0]).attr('title')).toContain('test')
  #         remove_watch $('#tab-content-search'), 'content_search'
  #         done()
  #
  #   $('#tab-search a').click()
  #   $('#pallet-emoji-search-input').val('test')
  #   $('#pallet-emoji-search-submit').click()

  describe 'user tab', ->
    # it 'login (Failure)', (done) ->
    #   $('#tab-content-user').watch
    #     id: 'content_user'
    #     properties: 'prop_innerHTML'
    #     watchChildren: true
    #     callback: (data, i) ->
    #       if data.vals[0].match /login-error/
    #         # TODO: english text
    #         expect($('#login-error span').text()).toBe 'ログインに失敗しました。'
    #         remove_watch $ '#tab-content-user', 'content_user'
    #         done()
    #
    #   $('#tab-user a').click()
    #   $('#pallet-emoji-username-input').val('aaa')
    #   $('#pallet-emoji-password-input').val('aaa')
    #   $('#pallet-emoji-login-submit').click()

    it 'general user login [Require user info]', (done) ->
      $('#tab-content-user').watch
        id: 'content_user'
        properties: 'prop_innerHTML'
        watchChildren: true
        callback: (data, i) ->
          if data.vals[0].match /history-emoji-list/
            expect($('#tab-content-user-history').find('img').length).toBeTruthy()
            remove_watch $ '#tab-content-user', 'content_user'
            done()

      $('#tab-user a').click()
      $('#pallet-emoji-username-input').val(user_info.username)
      $('#pallet-emoji-password-input').val(user_info.password)
      $('#pallet-emoji-login-submit').click()

    it 'general user can not see the newest/popular emoji', (done) ->
      $('#tab-content-user-newest').watch
        id: 'content_user_newest'
        properties: 'prop_innerHTML'
        watchChildren: true
        callback: (data, i) ->
          # TODO: english text
          expect($('#tab-content-user-newest').find('a').text()).toBe 'プレミアム・プロユーザーのみ閲覧できます。'
          remove_watch $ '#tab-content-user-newest', 'content_user_newest'
          done()

      $('#tab-user-newest a').click()



  #
  #   # describe '[Premium user only]', ->
  #     # pending() unless premium_user_info?
