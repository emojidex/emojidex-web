class Pallet
  constructor: (@plugin) ->
    @ec = new EmojidexClient
    @clipboard = new Clipboard '.emoji-btn'

    @search_tab_content = $ '<div class="tab-pane" id="search_tab"></div>'
    @setPallet @plugin.element

  setPallet: (element) ->
    $(element).click (e) =>
      search_input = $ '<div class="input-group"><input type="text" name="search" id="pallet-emoji-search-input" class="form-control" placeholder="検索"><span class="input-group-btn"></span></div>'

      search_btn = $ '<button type="submit" class="btn btn-primary" id="pallet-emoji-search-submit"><span class="glyphicon glyphicon-search"></span></button>'
      search_btn.click ->
        # debugger
        console.log 111


      search_input.find('.input-group-btn').append search_btn
      @search_tab_content.append search_input
      console.log $('#pallet-emoji-search-submit')
      tab_list = $ '<ul class="nav nav-pills"></ul>'
      tab_content = $ '<div class="tab-content"></div>'

      @ec.Categories.sync (categories) =>
        for category in categories
          tab_list.append "<li class='#{if tab_list[0].children.length is 0 then " active" else ""}'><a href='##{category.name}' data-toggle='pill'>#{category.name}</a></li>"
          tab_content.append "<div class='tab-pane #{if tab_content[0].children.length is 0 then " active" else ""}' id='#{category.name}'>#{category.name}</div>"
          # TODO: カテゴライズされた絵文字の追加

        tab_list.append $('<li class=""><a href="#search_tab" data-toggle="pill">Search</a></li>').click =>
          console.log 'search'
          @search()
        tab_content.append @search_tab_content
        # tab_list.append $("<li class=''><a hreh='#search_tab' data-toggle='pill'> 《 </a></li>").click =>
        #   @ec.Search.prev()
        # tab_list.append $("<li class=''><a href='#search_tab' data-toggle='pill'>search</a></li>").click =>
        #   @search()
        # tab_list.append $("<li class=''><a hreh='#search_tab' data-toggle='pill'> 》 </a></li>").click =>
        #   @ec.Search.next()
        # tab_content.append @search_tab_content

        @setWindow tab_list.add tab_content

  search: ->
    @ec.Search.search "face", (result_emoji) =>
      $('.serach_emoji_list').remove()
      $('.search_pagination').remove()

      search_emoji_list = $ '<div class="serach_emoji_list"></div>'
      for emoji in result_emoji
        search_emoji_list.append "<button class='btn btn-default col-xs-1 emoji-btn' data-clipboard-text=':#{emoji.code.replace /\s/g, '_'}:'><img src='#{@ec.cdn_url}px32/#{emoji.code.replace /\s/g, '_'}.png'></img></button>"
      @search_tab_content.append search_emoji_list

      pagination = $ '<div class="search_pagination"></div>'
      pagination.append $('<button>《 </button>').click =>
        @ec.Search.prev()
      # TODO: ページ番号
      pagination.append $('<button> 》 </button>').click =>
        @ec.Search.next()
      @search_tab_content.append pagination

  setWindow: (body) ->
    template = $("
      <div id='templage'>
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
      </div>
    ").html()

    ep = new Window
      template: template
      title: 'emoji pallet'
      bodyContent: body
