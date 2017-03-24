class UserTab {
  constructor(palette) {
    this.palette = palette;
    this.tab_list = "<li id='tab-user' class='pull-right'><a href='#tab-content-user' data-toggle='pill'><i class='emjdx-user'></a></li>";
    this.tab_content = this.getTabContent();
  }

  getTabContent() {
    let tab_content = $('<div class="tab-pane" id="tab-content-user"><input type="text" class="form-control" id="palette-emoji-username-input" placeholder="Username"><input type="password" class="form-control mt-m" id="palette-emoji-password-input" placeholder="Password"></div>');
    tab_content.find('#palette-emoji-password-input').keypress(e => {
      if (e.keyCode === 13) {
        return this.checkInput();
      }
    }
    );

    let login_btn = $('<div class="btn btn-primary btn-block mt-m" id="palette-emoji-login-submit">Login</div>');
    login_btn.click(() => {
      return this.checkInput();
    }
    );
    tab_content.append(login_btn);

    if (this.palette.EC.Data.storage.hub_cache.emojidex.auth_info.status === 'verified') {
      let { auth_info } = this.palette.EC.Data.storage.hub_cache.emojidex;
      this.login(auth_info.user, auth_info.token, 'token');
    }

    return tab_content;
  }

  checkInput() {
    $('#login-error').remove();

    let username = $('#palette-emoji-username-input').val();
    let password = $('#palette-emoji-password-input').val();
    if (username.length > 0 && password.length > 0) {
      return this.login(username, password, 'plain');
    }
  }

  login(username, password, type) {
    let callback = auth_info => {
      if (auth_info.status === 'verified') {
        this.hideLoginForm();
        this.setUserTab();
        this.setHistory(auth_info);
        this.setFavorite(auth_info);
        return this.palette.toggleSorting();
      } else {
        return this.showError(auth_info);
      }
    };

    if (type === 'plain') {
      return this.palette.EC.User.plainAuth(username, password, auth_info => callback(auth_info));
    } else {
      return this.palette.EC.User.tokenAuth(username, password, auth_info => callback(auth_info));
    }
  }

  showError(auth_info) {
    // TODO: error text localization
    return this.tab_content.prepend($('<div id="login-error"><span style="color:red">Login failed. Please check your username and password or <a href="https://www.emojidex.com/users/sign_in">login here</a>.</span><div>'));
  }

  hideLoginForm() {
    $('#palette-emoji-username-input').val('');
    $('#palette-emoji-password-input').val('');
    $('#palette-emoji-username-input').hide();
    $('#palette-emoji-password-input').hide();
    return $('#palette-emoji-login-submit').hide();
  }

  showLoginForm() {
    $('#palette-emoji-username-input').show();
    $('#palette-emoji-password-input').show();
    return $('#palette-emoji-login-submit').show();
  }

  setUserTab() {
    let user_tab_list = $('<ul class="nav nav-tabs mb-m mt-m" id="user-tab-list"></ul>');
    user_tab_list.append($('<li id="tab-user-favorite" class="active"><a href="#tab-content-user-favorite" data-toggle="tab">Favorite</a></li>'));
    user_tab_list.append($('<li id="tab-user-history"><a href="#tab-content-user-history" data-toggle="tab">History</a></li>'));

    let logout_btn = $('<button class="btn btn-default btm-sm pull-right" id="palette-emoji-logout">LogOut</button>');
    logout_btn.click(() => {
      this.palette.EC.User.logout();
      $('#user-tab-list').remove();
      $('#user-tab-content').remove();
      this.showLoginForm();
      return this.palette.toggleSorting();
    }
    );
    user_tab_list.append(logout_btn);

    this.user_tab_content = $('<div class="tab-content mt-m" id="user-tab-content"></div>');

    this.tab_content.append(user_tab_list);
    return this.tab_content.append(this.user_tab_content);
  }

  setHistory(auth_info) {
    return this.palette.EC.User.History.get(response => {
      return this.setDataByCodes((response.map((item) => item.emoji_code)), this.palette.EC.User.History.meta, 'history');
    }
    );
  }

  setFavorite(auth_info) {
    return this.palette.EC.User.Favorites.get(response => {
      return this.setData(response, this.palette.EC.User.Favorites.meta, 'favorite');
    }
    );
  }

  setData(data, meta, kind) {
    let tab_pane = $(`<div class='tab-pane ${kind === 'favorite' ? 'active' : ''}' id='tab-content-user-${kind}'></div>`);
    tab_pane.append(this.palette.setEmojiList(kind, data));
    this.user_tab_content.append(tab_pane);
    return this.getPagination(meta, tab_pane, kind)
  }

  setDataByCodes(data, meta, kind, active = false) {
    let tab_pane = $(`<div class='tab-pane ${active ? 'active' : ''}' id='tab-content-user-${kind}'></div>`);
    tab_pane.append(this.palette.setCodeList(kind, data));
    this.user_tab_content.append(tab_pane);
    return this.getPagination(meta, tab_pane, kind)
  }

  setPremiumData(response, kind) {
    let tab_pane = $(`<div class='tab-pane' id='tab-content-user-${kind}'></div>`);
    if (response.statusText === 'Payment Required') {
      // TODO: text localization
      tab_pane.append($('<p style="margin-top:15px;"><a class="btn btn-primary" href="https://www.emojidex.com/profile" target="_blank">Premium/Pro user only.</a></p>'));
    } else {
      tab_pane.append(this.palette.setEmojiList(kind, response));
    }
    return this.user_tab_content.append(tab_pane);
  }

  getPagination(meta, pane, kind) {
    let cur_page = meta.total_count === 0 ? 0 : meta.page;
    let max_page = Math.ceil(meta.total_count / this.palette.EC.limit);

    if (cur_page === 0 || max_page === 1) return;

    let prev_func;
    let next_func;
    if (kind === 'favorite') {
      let callback = response => {
        $('#tab-content-user-favorite').remove();
        return this.setData(response, this.palette.EC.User.Favorites.meta, kind);
      }
      prev_func = () => this.palette.EC.User.Favorites.prev(callback);
      next_func = () => this.palette.EC.User.Favorites.next(callback)
    } else {
      let callback = response => {
        $('#tab-content-user-history').remove();
        return this.setDataByCodes((response.map((item) => item.emoji_code)), this.palette.EC.User.History.meta, kind, true);
      }
      prev_func = () => this.palette.EC.User.History.prev(callback);
      next_func = () => this.palette.EC.User.History.next(callback);
    }
    return this.user_tab_content.append((pane.append(this.palette.getPagination(kind, prev_func, next_func, cur_page, max_page))));
  }
}
