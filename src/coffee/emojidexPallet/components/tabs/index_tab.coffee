class IndexTab
  constructor: (@pallet) ->
    @sort_type = 'score'
    @tab_list = $ "<li id='tab-index' class='active'><a href='#tab-content-index' data-toggle='pill'>Index</a></li>"
    @tab_content = $ "<div class='tab-pane active' id='tab-content-index'></div>"
    @setTabContent()

  setTabContent: () ->
    @pallet.EC.Indexes.index (result_emoji, called_data) =>
      @tab_data = called_data

      @tab_content.find('.index-emoji-list').remove()
      @tab_content.find('.index-pagination').remove()
      @tab_content.append @pallet.setEmojiList('index', result_emoji)

      cur_page = if @pallet.EC.Indexes.meta.total_count is 0 then 0 else @pallet.EC.Indexes.cur_page
      max_page = Math.floor @pallet.EC.Indexes.meta.total_count / @pallet.EC.options.limit
      max_page++ if @pallet.EC.Indexes.meta.total_count % @pallet.EC.options.limit > 0
      prev_func = => @pallet.EC.Indexes.prev()
      next_func = => @pallet.EC.Indexes.next()
      pagination = @pallet.setPagination('index', prev_func, next_func, cur_page, max_page)
      pagination.append @pallet.setSorting(@)
      @tab_content.append pagination
    , {sort: @sort_type}
