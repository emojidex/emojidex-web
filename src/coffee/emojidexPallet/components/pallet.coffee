class Pallet
  constructor: (@plugin) ->
    @ec = new EmojidexClient
    @clipboard = new Clipboard '.emoji-btn'
    @can_create_window = true

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
            tab_list.append "<li class='#{if tab_list[0].children.length is 0 then " active" else ""}'><a href='##{category.name}' data-toggle='pill'>#{category.name}</a></li>"
            tab_content.append "<div class='tab-pane #{if tab_content[0].children.length is 0 then " active" else ""}' id='#{category.name}'>#{category.name}</div>"
            # TODO: カテゴライズされた絵文字の追加

          tab_list.append "<li class=''><a href='#search_tab' data-toggle='pill'>Search</a></li>"
          tab_content.append @search_tab_content

          @emoji_pallet = $ '<div class="emoji-pallet"></div>'
          @emoji_pallet.append(tab_list.add tab_content)
          @emoji_pallet.find('ul').after('<hr>')

          @setWindow @emoji_pallet

  search: (search_word) ->
    @ec.Search.search search_word, (result_emoji) =>
      $('.serach-emoji-list').remove()
      $('.search-pagination').remove()

      search_emoji_list = $ '<div class="serach-emoji-list clearfix"></div>'
      for emoji in result_emoji
        search_emoji_list.append "<button class='emoji-btn btn btn-default col-xs-2 col-sm-1' data-clipboard-text=':#{emoji.code.replace /\s/g, '_'}:'><img class='img-responsive center-block' src='#{@ec.cdn_url}px32/#{emoji.code.replace /\s/g, '_'}.png'></img></button>"
      @search_tab_content.append search_emoji_list

      # TODO: ページ番号
      pagination = $ '<div class="search-pagination"><div class="text-center"><ul class="pagination"></ul></div></div>'
      pagination.find('.pagination').append $('<li><span>&laquo;</span></li>').click =>
        if @ec.Search.cur_page > 1
          @ec.Search.prev()
      pagination.find('.pagination').append $("<li><span>#{@ec.Search.cur_page} / #{@ec.Search.count}</span></li>")
      pagination.find('.pagination').append $('<li><span>&raquo;</span></li>').click =>
        if @ec.Search.cur_page < @ec.Search.count
          @ec.Search.next()
      @search_tab_content.append pagination

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

    ep = new Window
      template: template
      title: 'emoji pallet'
      bodyContent: body
