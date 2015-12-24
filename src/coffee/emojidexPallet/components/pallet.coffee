class Pallet
  constructor: (@plugin) ->
    @ec = new EmojidexClient
    @clipboard = new Clipboard '.emoji-btn'
    @tabs_emoji = []

    # @login_service = new LoginService @

    # start main --------
    @createDialog()
    @setPallet @plugin.element

  createDialog: ->
    @dialog = $ '<div id="dialog"></div>'
    $('body').append @dialog

    $('#dialog').dialog
      autoOpen: false
      width: 700
      title: 'Emojidex Pallet'

      create: (e) ->
        $('.ui-dialog-titlebar-close').hide()
        close_btn = $ '<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        close_btn.click (e) ->
          $('#dialog').dialog 'close'
        $('.ui-dialog-titlebar').append close_btn

      open: (e) ->
        $('.ui-dialog :button').blur();
        $('.nav.nav-pills a').blur();

  setPallet: (element) ->
    search_emoji_input = =>
      search_word = $('#pallet-emoji-search-input').val()
      if search_word.length > 0
        @search(search_word)

    $(element).click (e) =>
      if @emoji_pallet?
        @openDialog()
      else
        search_tab_content = $ '<div class="tab-pane" id="tab-content-search"><div class="input-group"><input type="text" name="search" id="pallet-emoji-search-input" class="form-control" placeholder="検索"><span class="input-group-btn"></span></div></div>'
        search_tab_content.find('#pallet-emoji-search-input').keypress (e) ->
          if e.keyCode is 13
            search_emoji_input()

        search_btn = $ '<button type="submit" class="btn btn-primary" id="pallet-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></button>'
        search_btn.click ->
          search_emoji_input()
        search_tab_content.find('.input-group-btn').append search_btn

        tab_list = $ '<ul class="nav nav-pills"></ul>'
        tab_content = $ '<div class="tab-content"></div>'

        @ec.Categories.sync (categories) =>
          for category in categories
            tab_button = $ "<li id='tab-#{category.code}' data-code='#{category.code}' class='#{if tab_list[0].children.length is 0 then " active" else ""}'><a href='#tab-content-#{category.code}' data-toggle='pill'>#{category.name}</a></li>"
            content_page = $ "<div class='tab-pane #{if tab_content[0].children.length is 0 then " active" else ""}' id='tab-content-#{category.code}'></div>"
            tab_button.click (e) =>
              @setCategory $(e.currentTarget).data 'code'
            tab_list.append tab_button
            tab_content.append content_page

          tab_list.append "<li class=''><a href='#tab-content-search' data-toggle='pill'>Search</a></li>"
          tab_content.append search_tab_content

          @emoji_pallet = $ '<div class="emoji-pallet"></div>'
          @emoji_pallet.append(tab_list.add tab_content)
          @emoji_pallet.find('ul').after('<hr>')

          @dialog.append(@emoji_pallet)
          @openDialog()
          $("#tab-#{categories[0].code}").click()

  setCategory: (category_name) ->
    if @tabs_emoji.length
      for tab_data in @tabs_emoji
        if tab_data.category_name is category_name
          @ec.Categories.called_data = tab_data
          break
        else if tab_data is @tabs_emoji[@tabs_emoji.length - 1]
          @setCategoryTabContent category_name
    else
      @setCategoryTabContent category_name

  setCategoryTabContent: (category_name)->
    @ec.Categories.getEmoji category_name, (result_emoji) =>
      if @tabs_emoji.length
        for tab_data, i in @tabs_emoji
          if tab_data.category_name is category_name
            @tabs_emoji[i] = @ec.Categories.called_data
            break
          else if tab_data is @tabs_emoji[@tabs_emoji.length - 1]
            @tabs_emoji.push @ec.Categories.called_data
      else
        @tabs_emoji.push @ec.Categories.called_data

      content_page = $ "#tab-content-#{category_name}"
      content_page.find('.category-emoji-list').remove()
      content_page.find('.category-pagination').remove()
      content_page.append @setEmojiList('category', result_emoji)

      cur_page = if @ec.Categories.meta.total_count is 0 then 0 else @ec.Categories.cur_page
      max_page = Math.floor @ec.Categories.meta.total_count / @ec.options.limit
      max_page++ if @ec.Categories.meta.total_count % @ec.options.limit > 0
      prev_func = => @ec.Categories.prev()
      next_func = => @ec.Categories.next()
      pagination = @setPagination('category', prev_func, next_func, cur_page, max_page)
      content_page.append pagination

  search: (search_word) ->
    @ec.Search.search search_word, (result_emoji) =>
      $('.search-emoji-list').remove()
      $('.search-pagination').remove()
      $('#tab-content-search').append @setEmojiList('search', result_emoji)

      cur_page = if @ec.Search.meta.total_count is 0 then 0 else @ec.Search.cur_page
      max_page = Math.floor @ec.Search.meta.total_count / @ec.options.limit
      max_page++ if @ec.Search.meta.total_count % @ec.options.limit > 0
      prev_func = => @ec.Search.prev()
      next_func = => @ec.Search.next()
      pagination = @setPagination('search', prev_func, next_func, cur_page, max_page)
      $('#tab-content-search').append pagination

  setEmojiList: (kind, result_emoji) ->
    emoji_list = $ "<div class='#{kind}-emoji-list clearfix'></div>"
    for emoji in result_emoji
      emoji_list.append "<button class='emoji-btn btn btn-default col-xs-2 col-sm-1' data-clipboard-text=':#{emoji.code.replace /\s/g, '_'}:'><img alt='#{emoji.code}' title='#{emoji.code}' class='img-responsive center-block' src='#{@ec.cdn_url}px32/#{emoji.code.replace /\s/g, '_'}.png'></img></button>"
    emoji_list

  setPagination: (kind, prev_func, next_func, cur_page, max_page) ->
    pagination = $ "<div class='#{kind}-pagination text-center'><ul class='pagination mb-0'></ul></div>"
    pagination.find('.pagination').append $('<li class="pallet-pager"><span>&laquo;</span></li>').click =>
      prev_func()
    pagination.find('.pagination').append $("<li class='disabled'><span>#{cur_page} / #{max_page}</span></li>")
    pagination.find('.pagination').append $('<li class="pallet-pager"><span>&raquo;</span></li>').click =>
      next_func()
    pagination

  openDialog: ->
    $('#dialog').dialog 'open'
