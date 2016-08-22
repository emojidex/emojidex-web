class SearchTab
  constructor: (@pallet) ->
    @sort_type = 'score'
    @tab_list = "<li id='tab-search'><a href='#tab-content-search' data-toggle='pill'>Search</a></li>"
    @tab_content = @getTabContent()

  getTabContent: ->
    tab_content = $ '<div class="tab-pane" id="tab-content-search"><div class="input-group"><input type="text" name="search" id="pallet-emoji-search-input" class="form-control" placeholder="Search emoji"><span class="input-group-btn"></span></div></div>'
    tab_content.find('#pallet-emoji-search-input').keypress (e) =>
      if e.keyCode is 13
        @searchEmojiInput()

    search_btn = $ '<div class="btn btn-primary" id="pallet-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></div>'
    search_btn.click =>
      @searchEmojiInput()
    tab_content.find('.input-group-btn').append search_btn

    tab_content

  searchEmojiInput: ->
    search_word = $('#pallet-emoji-search-input').val()
    if search_word.length > 0
      @search(search_word)

  search: (search_word) ->
    @search_word = search_word
    @pallet.EC.Search.search search_word, (result_emoji) =>
      $('.search-emoji-list').remove()
      $('.search-pagination').remove()
      @tab_content.append @pallet.setEmojiList('search', result_emoji)

      cur_page = if @pallet.EC.Search.meta.total_count is 0 then 0 else @pallet.EC.Search.cur_page
      max_page = Math.floor @pallet.EC.Search.meta.total_count / @pallet.EC.options.limit
      max_page++ if @pallet.EC.Search.meta.total_count % @pallet.EC.options.limit > 0
      prev_func = => @pallet.EC.Search.prev()
      next_func = => @pallet.EC.Search.next()
      pagination = @pallet.setPagination('search', prev_func, next_func, cur_page, max_page)
      pagination.append @pallet.setSorting(@)
      @tab_content.append pagination
    , {sort: @sort_type}

  setTabContent: () ->
    @search(@search_word)
