class Pallet
  constructor: (@plugin) ->
    @ec = new EmojidexClient
    @clipboard = new Clipboard '.emoji-btn'
    @can_create_window = true
    @show_first_tab = true
    @tabs_emoji = []

    # start main --------
    @setPallet @plugin.element

  setPallet: (element) ->
    search_emoji_input = =>
      search_word = $('#pallet-emoji-search-input').val()
      if search_word.length > 0
        @search(search_word)

    $(element).click (e) =>
      if @can_create_window
        @can_create_window = false
        @search_tab_content = $ '<div class="tab-pane" id="search_tab"><div class="input-group"><input type="text" name="search" id="pallet-emoji-search-input" class="form-control" placeholder="検索"><span class="input-group-btn"></span></div></div>'
        @search_tab_content.find('#pallet-emoji-search-input').keypress (e) ->
          if e.keyCode is 13
            search_emoji_input()

        search_btn = $ '<button type="submit" class="btn btn-primary" id="pallet-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></button>'
        search_btn.click ->
          search_emoji_input()
        @search_tab_content.find('.input-group-btn').append search_btn

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

          tab_list.append "<li class=''><a href='#search_tab' data-toggle='pill'>Search</a></li>"
          tab_content.append @search_tab_content

          @emoji_pallet = $ '<div class="emoji-pallet"></div>'
          @emoji_pallet.append(tab_list.add tab_content)
          @emoji_pallet.find('ul').after('<hr>')

          @setWindow @emoji_pallet
          $("#tab-abstract").click()

  setCategory: (category_name) ->
    if @tabs_emoji.length && !@show_first_tab
      for tab_data in @tabs_emoji
        if tab_data.category_name is category_name
          @ec.Categories.called_data = tab_data
          break
        else if tab_data is @tabs_emoji[@tabs_emoji.length - 1]
          @setCategoryTabContent category_name
    else
      @show_first_tab = false
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

      category_emoji_list = $ '<div class="category-emoji-list clearfix"></div>'
      for emoji in result_emoji
        category_emoji_list.append @createEmojiButton(emoji.code)
      content_page.append category_emoji_list

      pagination = $ '<div class="category-pagination"><div class="text-center"><ul class="pagination"></ul></div></div>'
      pagination.find('.pagination').append $('<li class="pallet-pager"><span>&laquo;</span></li>').click =>
        @ec.Categories.prev()

      cur_page = if @ec.Categories.meta.total_count == 0 then 0 else @ec.Categories.cur_page
      max_page = Math.floor @ec.Categories.meta.total_count / @ec.options.limit
      if @ec.Categories.meta.total_count % @ec.options.limit > 0
        max_page++
      pagination.find('.pagination').append $("<li class='disabled'><span>#{cur_page} / #{max_page}</span></li>")

      pagination.find('.pagination').append $('<li class="pallet-pager"><span>&raquo;</span></li>').click =>
        @ec.Categories.next()

      content_page.append pagination

  search: (search_word) ->
    @ec.Search.search search_word, (result_emoji) =>
      $('.serach-emoji-list').remove()
      $('.search-pagination').remove()

      search_emoji_list = $ '<div class="serach-emoji-list clearfix"></div>'
      for emoji in result_emoji
        search_emoji_list.append @createEmojiButton(emoji.code)
      @search_tab_content.append search_emoji_list

      pagination = $ '<div class="search-pagination"><div class="text-center"><ul class="pagination"></ul></div></div>'
      pagination.find('.pagination').append $('<li class="pallet-pager"><span>&laquo;</span></li>').click =>
        @ec.Search.prev()

      cur_page = if @ec.Search.meta.total_count == 0 then 0 else @ec.Search.cur_page
      max_page = Math.floor @ec.Search.meta.total_count / @ec.options.limit
      if @ec.Search.meta.total_count % @ec.options.limit > 0
        max_page++
      pagination.find('.pagination').append $("<li class='disabled'><span>#{cur_page} / #{max_page}</span></li>")

      pagination.find('.pagination').append $('<li class="pallet-pager"><span>&raquo;</span></li>').click =>
        @ec.Search.next()
      @search_tab_content.append pagination

  createEmojiButton: (code) ->
    return "<button class='emoji-btn btn btn-default col-xs-2 col-sm-1' data-clipboard-text=':#{code.replace /\s/g, '_'}:'><img alt='#{code}' title='#{code}' class='img-responsive center-block' src='#{@ec.cdn_url}px32/#{code.replace /\s/g, '_'}.png'></img></button>"

  setWindow: (body) ->
    template = $("
      <div class='window emoji-pallet'>
        <div class='window-header'>
          <button type='button' class='close' data-dismiss='window' aria-hidden='true'>
            x
          </button>
          <h4 class='window-title text-primary'>
          </h4>
        </div>
        <div class='window-body'>
        </div>
      </div>
    ")

    template.find('.close').click =>
      @can_create_window = true
      @show_first_tab = true

    ep = new Window
      template: template
      title: 'emoji pallet'
      bodyContent: body
