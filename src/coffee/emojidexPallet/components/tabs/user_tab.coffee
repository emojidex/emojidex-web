class UserTab
  constructor: (@pallet) ->
    @tab_list = "<li id='tab-user'><a href='#tab-content-user' data-toggle='pill'>User</a></li>"
    @tab_content = @getTabContent()

  getTabContent: ->
    tab_content = $ '<div class="tab-pane" id="tab-content-user"><input type="text" class="form-control" id="pallet-emoji-username-input" placeholder="Username"><input type="password" class="form-control mt-m" id="pallet-emoji-password-input" placeholder="Password"></div>'

    login_btn = $ '<div class="btn btn-primary btn-block mt-m" id="pallet-emoji-search-submit">Login</div>'
    login_btn.click =>
      @checkInput()
    tab_content.append login_btn

    tab_content

  checkInput: ->
    username = $('#pallet-emoji-username-input').val()
    password = $('#pallet-emoji-password-input').val()
    if username.length > 0 && password.length > 0
      @login username, password

  login: (username, password) ->
    @pallet.ec.User.plain_auth username, password, (auth_info) =>
      if auth_info.status == 'verified'
        @setFavorite()
      else
        console.log 'error'

  setFavorite: ->
    console.log 'success'
