class Pallet
  constructor: (@plugin) ->
    @ec = new EmojidexClient
    @clipboard = new Clipboard '.emoji-btn'

    @prev_tab_content = $ '<div class="tab-pane" id="prev"></div>'
    @next_tab_content = $ '<div class="tab-pane" id="next"></div>'
    @setPallet @plugin.element

  setPallet: (element) ->
    body = ''

    $(element).click (e) =>
      tab_list = $ '<ul class="nav nav-pills"></ul>'
      tab_content = $ '<div class="tab-content"></div>'

      @ec.Search.search "face", (result_emoji) =>
        emoji_list = $ '<div class="emoji_list"></div>'
        for emoji in result_emoji
          emoji_list.append "<button class='btn btn-default col-xs-1 emoji-btn' data-clipboard-text=':#{emoji.code.replace /\s/g, '_'}:'><img src='#{@ec.cdn_url}px32/#{emoji.code.replace /\s/g, '_'}.png'></img></button>"

        @ec.Categories.sync (categories) =>
          # console.dir categories
          for category in categories
            # tab_pane = $("<div class='tab-pane#{if tab_list[0].children.length is 0 then " active" else ""}' id='#{category_name}'></div>")
            tab_list.append "<li class='#{if tab_list[0].children.length is 0 then " active" else ""}'><a href='##{category.name}' data-toggle='pill'>#{category.name}</a></li>"
            tab_content.append "<div class='tab-pane #{if tab_content[0].children.length is 0 then " active" else ""}' id='#{category.name}'>#{emoji_list.html()}</div>"

          tab_list.append $("<li class=''><a href='#prev' data-toggle='pill'>prev</a></li>").click (e) =>
            $('.prev-search-emoji').remove()
            @prev_tab_content.append "<div class='prev-search-emoji'>#{new Date().getSeconds()}</div>"

          tab_list.append $("<li class=''><a href='#next' data-toggle='pill'>next</a></li>").click (e) =>
            # @ec.Search.next()
            $('.next-search-emoji').remove()
            @next_tab_content.append "<div class='next-search-emoji'>#{new Date().getSeconds()}</div>"

          tab_content.append @prev_tab_content
          tab_content.append @next_tab_content

          @setWindow tab_list.add tab_content

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

  # pagePrev: () ->
  #   console.log 'push prev'
  #   # @prev_tab_content.append "<div>ccc</div>"
