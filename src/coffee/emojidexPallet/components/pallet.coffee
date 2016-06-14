class Pallet
  @active_editable: null

  constructor: (@plugin) ->
    @EC = new EmojidexClient
      storageHubPath: 'https://www.emojidex.com/hub?pallet'
      onReady: (EC) =>
        @clipboard = new Clipboard '.emoji-btn'
        $('.emojidex-content_editable').on('focus keyup mouseup', (e)->
          Pallet.active_editable = e.currentTarget)
        $('.emojidex-plain_text').on('focus keyup mouseup', (e)->
          Pallet.active_editable = e.currentTarget)

        # @login_service = new LoginService @

        # start main --------
        @createDialog()
        @setPallet @plugin.element

        @plugin.options.onComplete?()

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
        $('.ui-dialog :button').blur()
        $('.nav.nav-pills a').blur()

  setPallet: (element) ->
    $(element).click (e) =>
      if @emoji_pallet?
        @openDialog()
      else
        tab_list = $ '<ul class="nav nav-pills"></ul>'
        tab_content = $ '<div class="tab-content"></div>'

        @EC.Categories.sync (categories) =>
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
      emoji_button = $('<button/>')
      emoji_button.addClass 'emoji-btn btn btn-default pull-left'
      emoji_button_image = $('<img/>')
      emoji_button_image.prop 'alt', "#{emoji.code}"
      emoji_button_image.prop 'title', "#{emoji.code}"
      emoji_button_image.addClass 'img-responsive center-block'
      emoji_button_image.prop 'src', "#{@EC.cdn_url}px32/#{emoji.code.replace /\s/g, '_'}.png"
      emoji_button.append emoji_button_image
      emoji_button.prop 'text', @mojiOrCode(emoji)
      emoji_button.click (e)=>
        @insertAtCaret($(e.currentTarget).prop('text'))
      emoji_list.append emoji_button
    emoji_list

  mojiOrCode:(emoji) ->
    if emoji.moji != null && emoji.moji != '' then emoji.moji else ":#{emoji.code}:"

  insertAtCaret: (text) ->
    if Pallet.active_editable == null
      return #TODO copy to clipboard if active editable is null

    elem = $(Pallet.active_editable)
    pos = elem.caret('pos')
    txt = elem.html()
    startTxt = txt.substring(0,  pos)
    stopTxt = txt.substring(pos, txt.length)
    elem.html(startTxt + text + stopTxt)
    elem.focus()
    elem.caret('pos', pos + text.length)


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
