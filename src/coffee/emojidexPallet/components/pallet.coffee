class Pallet
  constructor: (@plugin) ->
    @active_input_area = null
    @EC = new EmojidexClient
      onReady: (EC) =>
        # start main --------
        $('input, textarea, [contenteditable="true"]').on 'focus keyup mouseup', (e) =>
          @active_input_area = $ e.currentTarget

        @createDialog()
        @setPallet @plugin.element

        @plugin.options.onComplete?()

  createDialog: ->
    @dialog = $ '<div id="emojidex-dialog-content"></div>'
    @dialog.dialog
      classes:
        'ui-dialog': 'emojidex-ui-dialog'
      autoOpen: false
      width: 700
      title: 'Emojidex Pallet'

      create: (e) ->
        $('.ui-dialog-titlebar-close').hide()

        close_btn = $ '<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        close_btn.click (e) ->
          $('#emojidex-dialog-content').dialog 'close'

        $('.ui-dialog-titlebar').append close_btn
        $('.emojidex-ui-dialog').wrap('<span id="emojidex-emoji-pallet"></span>')

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
      emoji_button = $ '<button>',
        class: 'emoji-btn btn btn-default pull-left'
      emoji_button.prop 'emoji_data', emoji

      emoji_button_image = $ '<img>',
        alt: "#{emoji.code}"
        title: "#{emoji.code}"
        class: 'img-responsive center-block'
        src: "#{@EC.cdn_url}px32/#{emoji.code.replace /\s/g, '_'}.png"

      emoji_button.append emoji_button_image
      emoji_button.click (e)=>
        @insertEmojiAtCaret($(e.currentTarget).prop('emoji_data'))
      emoji_list.append emoji_button
    emoji_list

  mojiOrCode:(emoji) ->
    if emoji.moji != null && emoji.moji != '' then emoji.moji else ":#{emoji.code}:"

  insertEmojiAtCaret: (emoji) ->
    @clipboard.destroy() if @clipboard
    code = @mojiOrCode(emoji)

    if @active_input_area is null
      @clipboard = new Clipboard '.emoji-btn',
        text: (e) ->
          return code
      return

    elem = @active_input_area
    if elem.is('[contenteditable="true"]')
      wrapper = $ '<img>',
        class: 'emojidex-emoji'
        src: "#{@EC.cdn_url}px32/#{emoji.code.replace /\s/g, '_'}.png"
        alt: code
      if emoji.link != null && emoji.link != ''
        link_wrapper = wrapper
        wrapper = $ '<a>',
          href: emoji.link
          alt: ''
        wrapper = link_wrapper.append(wrapper)

      elem.focus()
      selection = window.getSelection()
      range = selection.getRangeAt(0)

      range.insertNode wrapper[0]
      range.collapse false
      selection.removeAllRanges()
      selection.addRange(range)

      elem.change()
    else
      pos = elem.caret('pos')
      txt = elem.val()
      startTxt = txt.substring(0,  pos)
      stopTxt = txt.substring(pos, txt.length)
      elem.val(startTxt + code + stopTxt)
      elem.focus()
      elem.caret('pos', pos + code.length)

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
