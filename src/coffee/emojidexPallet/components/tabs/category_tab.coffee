class CategoryTab
  constructor: (@pallet, category, length) ->
    @tab_list = $ "<li id='tab-#{category.code}' data-code='#{category.code}' class='#{if length is 0 then " active" else ""}'><a href='#tab-content-#{category.code}' data-toggle='pill'>#{category.name}</a></li>"
    @tab_list.click (e) =>
      @setCategory $(e.currentTarget).data 'code'

    @tab_content = $ "<div class='tab-pane #{if length is 0 then " active" else ""}' id='tab-content-#{category.code}'></div>"

  setCategory: (category_name) ->
    if @tab_data?
      @pallet.EC.Categories.called_data = @tab_data
    else
      @setCategoryTabContent category_name

  setCategoryTabContent: (category_name)->
    @pallet.EC.Categories.getEmoji category_name, (result_emoji, called_data) =>
      @tab_data = called_data

      @tab_content.find('.category-emoji-list').remove()
      @tab_content.find('.category-pagination').remove()
      @tab_content.append @pallet.setEmojiList('category', result_emoji)

      cur_page = if @pallet.EC.Categories.meta.total_count is 0 then 0 else @pallet.EC.Categories.cur_page
      max_page = Math.floor @pallet.EC.Categories.meta.total_count / @pallet.EC.options.limit
      max_page++ if @pallet.EC.Categories.meta.total_count % @pallet.EC.options.limit > 0
      prev_func = => @pallet.EC.Categories.prev()
      next_func = => @pallet.EC.Categories.next()
      @tab_content.append @pallet.setPagination('category', prev_func, next_func, cur_page, max_page)
