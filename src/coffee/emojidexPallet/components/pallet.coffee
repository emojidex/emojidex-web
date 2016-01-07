class Pallet
  constructor: (@plugin) ->
    @ec = new EmojidexClient
    @clipboard = new Clipboard '.emoji-btn'

    # @login_service = new LoginService @

    # start main --------
    @createDialog()
    @setPallet @plugin.element

  createDialog: ->
    @dialog = $ '<div id="emojidex-dialog"></div>'
    $('body').append @dialog

    @dialog.dialog
      autoOpen: false
      width: 700
      title: 'Emojidex Pallet'

      create: (e) ->
        $('.ui-dialog-titlebar-close').hide()
        close_btn = $ '<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        close_btn.click (e) ->
          $('#emojidex-dialog').dialog 'close'
        $('.ui-dialog-titlebar').append close_btn

      open: (e) ->
        $('.ui-dialog :button').blur();
        $('.nav.nav-pills a').blur();

  setPallet: (element) ->
    $(element).click (e) =>
      if @emoji_pallet?
        @openDialog()
      else
        tab_list = $ '<ul class="nav nav-pills"></ul>'
        tab_content = $ '<div class="tab-content"></div>'

        @ec.Categories.sync (categories) =>
          for category in categories
            category_tab = new CategoryTab @, category, tab_list[0].children.length
            tab_list.append category_tab.tab_list
            tab_content.append category_tab.tab_content

          search_tab = new SearchTab @
          tab_list.append search_tab.tab_list
          tab_content.append search_tab.tab_content

          user_tab = new UserTab @
          tab_list.append user_tab.tab_list
          tab_content.append user_tab.tab_content

          @emoji_pallet = $ '<div class="emoji-pallet"></div>'
          @emoji_pallet.append(tab_list.add tab_content)
          @emoji_pallet.find('ul').after('<hr>')

          @dialog.append(@emoji_pallet)
          @openDialog()
          $("#tab-#{categories[0].code}").click()

  setEmojiList: (kind, result_emoji) ->
    emoji_list = $ "<div class='#{kind}-emoji-list clearfix'></div>"

    for emoji in result_emoji
      code = emoji.code ? emoji.emoji_code
      emoji_list.append "<button class='emoji-btn btn btn-default pull-left' data-clipboard-text=':#{code.replace /\s/g, '_'}:'><img alt='#{code}' title='#{code}' class='img-responsive center-block' src='#{@ec.cdn_url}px32/#{code.replace /\s/g, '_'}.png'></img></button>"
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
    @dialog.dialog 'open'
