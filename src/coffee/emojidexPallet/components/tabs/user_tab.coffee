class UserTab
  constructor: (@pallet) ->
    @tab_list = "<li id='tab-user'><a href='#tab-content-user' data-toggle='pill'>User</a></li>"
    @tab_content = @getTabContent()

  getTabContent: ->
    tab_content = $ '<div class="tab-pane" id="tab-content-user"><input type="text" class="form-control" id="pallet-emoji-username-input" placeholder="Username"><input type="password" class="form-control mt-m" id="pallet-emoji-password-input" placeholder="Password"></div>'
    tab_content.find('#pallet-emoji-password-input').keypress (e) =>
      if e.keyCode is 13
        @checkInput()

    login_btn = $ '<div class="btn btn-primary btn-block mt-m" id="pallet-emoji-login-submit">Login</div>'
    login_btn.click =>
      @checkInput()
    tab_content.append login_btn

    tab_content

  checkInput: ->
    $('#login-error').remove()

    username = $('#pallet-emoji-username-input').val()
    password = $('#pallet-emoji-password-input').val()
    if username.length > 0 && password.length > 0
      @login username, password

  login: (username, password) ->
    @pallet.ec.User.plain_auth username, password, (auth_info) =>
      if auth_info.status == 'verified'
        @hideLoginForm()
        @setUserTab()
        @setHistory(auth_info)
        @setFavorite(auth_info)
      else
        @showError(auth_info)

  showError: (auth_info) ->
    # TODO: error text
    @tab_content.prepend $ '<div id="login-error"><span style="color:red">ログインに失敗しました。</span><div>'

  hideLoginForm: ->
    $('#pallet-emoji-username-input').hide()
    $('#pallet-emoji-password-input').hide()
    $('#pallet-emoji-login-submit').hide()

  setUserTab: ->
    user_tab_list = $ '<ul class="nav nav-tabs mb-m mt-m"></ul>'
    user_tab_list.append $ '<li id="tab-user-history" class="active"><a href="#tab-content-user-history" data-toggle="tab">History</a></li>'
    user_tab_list.append $ '<li id="tab-user-favorite"><a href="#tab-content-user-favorite" data-toggle="tab">Favorite</a></li>'

    @user_tab_content = $ '<div class="tab-content"></div>'

    @tab_content.append user_tab_list
    @tab_content.append @user_tab_content

  setHistory: (auth_info) ->
    @pallet.ec.User.History.get (histories) =>
      tab_pane = $ '<div class="tab-pane active" id="tab-content-user-history"></div>'
      tab_pane.append @pallet.setEmojiList('history', histories.history)
      @user_tab_content.append tab_pane

      # @setPagination(histories.meta, tab_pane, 'history')

  setFavorite: (auth_info) ->
    @pallet.ec.User.Favorites.get (favorites) =>
      tab_pane = $ '<div class="tab-pane" id="tab-content-user-favorite"></div>'
      tab_pane.append @pallet.setEmojiList('faorite', favorites.emoji)
      @user_tab_content.append tab_pane

      # @setPagination(favorites.meta, tab_pane, 'favorite')

  setPagination: (meta, pane, kind) ->
    # TODO: limit, prev/next func
    cur_page = if meta.total_count is 0 then 0 else meta.page
    max_page = Math.floor meta.total_count / 50
    max_page++ if meta.total_count % 50 > 0
    prev_func = => console.log 'prev'
    next_func = => console.log 'next'
    @user_tab_content.append (pane.append @pallet.setPagination(kind, prev_func, next_func, cur_page, max_page))
