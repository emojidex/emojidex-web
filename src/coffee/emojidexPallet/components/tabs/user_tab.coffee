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

    if @pallet.EC.Data.storage.hub_cache?.emojidex?.auth_info?.status == 'verified'
      auth_info = @pallet.EC.Data.storage.hub_cache.emojidex.auth_info
      @login auth_info.user, auth_info.token, 'token'

    tab_content

  checkInput: ->
    $('#login-error').remove()

    username = $('#pallet-emoji-username-input').val()
    password = $('#pallet-emoji-password-input').val()
    if username.length > 0 && password.length > 0
      @login username, password, 'plain'

  login: (username, password, type) ->
    callback = (auth_info) =>
      if auth_info.status == 'verified'
        @hideLoginForm()
        @setUserTab()
        @setHistory(auth_info)
        @setFavorite(auth_info)
      else
        @showError(auth_info)

    if type == 'plain'
      @pallet.EC.User.plain_auth username, password, (auth_info) -> callback(auth_info)
    else
      @pallet.EC.User.token_auth username, password, (auth_info) -> callback(auth_info)

  showError: (auth_info) ->
    # TODO: error text
    @tab_content.prepend $ '<div id="login-error"><span style="color:red">You failed to login.</span><div>'

  hideLoginForm: ->
    $('#pallet-emoji-username-input').val('')
    $('#pallet-emoji-password-input').val('')
    $('#pallet-emoji-username-input').hide()
    $('#pallet-emoji-password-input').hide()
    $('#pallet-emoji-login-submit').hide()

  showLoginForm: ->
    $('#pallet-emoji-username-input').show()
    $('#pallet-emoji-password-input').show()
    $('#pallet-emoji-login-submit').show()

  setUserTab: ->
    user_tab_list = $ '<ul class="nav nav-tabs mb-m mt-m" id="user_tab_list"></ul>'
    user_tab_list.append $ '<li id="tab-user-history" class="active"><a href="#tab-content-user-history" data-toggle="tab">History</a></li>'
    user_tab_list.append $ '<li id="tab-user-favorite"><a href="#tab-content-user-favorite" data-toggle="tab">Favorite</a></li>'

    logout_btn = $ '<button class="btn btn-default btm-sm pull-right" id="pallet-emoji-logout">LogOut</button>'
    logout_btn.click =>
      @pallet.EC.User.logout()
      $('#user_tab_list').remove()
      $('#user_tab_content').remove()
      @showLoginForm()
    user_tab_list.append logout_btn

    @user_tab_content = $ '<div class="tab-content" id="user_tab_content"></div>'

    @tab_content.append user_tab_list
    @tab_content.append @user_tab_content

  setHistory: (auth_info) ->
    @pallet.EC.User.History.get (response) =>
      @setData(response.history, response.meta, 'history')

  setFavorite: (auth_info) ->
    @pallet.EC.User.Favorites.get (response) =>
      @setData(response.emoji, response.meta, 'favorite')

  setData: (data, meta, kind) ->
    tab_pane = $ "<div class='tab-pane #{if kind is 'history' then 'active' else ''}' id='tab-content-user-#{kind}'></div>"
    tab_pane.append @pallet.setEmojiList(kind, data)
    @user_tab_content.append tab_pane

    # @setPagination(meta, tab_pane, kind)

  setPremiumData: (response, kind) ->
    tab_pane = $ "<div class='tab-pane' id='tab-content-user-#{kind}'></div>"
    if response.statusText is 'Payment Required'
      # TODO: text
      tab_pane.append $ '<p style="margin-top:15px;"><a class="btn btn-primary" href="https://www.emojidex.com/profile" target="_blank">Premium/Pro user only.</a></p>'
    else
      tab_pane.append @pallet.setEmojiList(kind, response.emoji)
    @user_tab_content.append tab_pane

  setPagination: (meta, pane, kind) ->
    # TODO: limit, prev/next func
    cur_page = if meta.total_count is 0 then 0 else meta.page
    max_page = Math.floor meta.total_count / 50
    max_page++ if meta.total_count % 50 > 0
    prev_func = => console.log 'prev'
    next_func = => console.log 'next'
    @user_tab_content.append (pane.append @pallet.setPagination(kind, prev_func, next_func, cur_page, max_page))
