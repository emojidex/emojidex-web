export default class FollowersTab {
  constructor(user_tab) {
    this.EC = user_tab.palette.EC;
    this.palette = user_tab.palette;

    this.selector_tab_pane = '#emojidex-emoji-palette #follow-followers';
    this.selector_users = `${this.selector_tab_pane} > .users`;

    this.tab_pane = $(`
      <div id='follow-followers' class='tab-pane'>
        <div class='users'></div>
      </div>
    `);
  }

  init() {
    $(this.selector_users).children().remove();
    $(`${this.selector_tab_pane} > .user-info`).remove();

    this.EC.User.Follow.getFollowers(followers => {
      for(let user_name of followers) {
        this.setUserButton(user_name);
        this.setUserInfo(user_name);
      }
    });
  }

  setUserButton(user_name) {
    let user_button = $(`<div class='btn btn-default'>${user_name}</div>`).click(e => {
      $(this.selector_tab_pane).find(`#${$(e.currentTarget).text()}`).addClass('on');
    });
    $(this.selector_users).append(user_button);
  }

  setUserInfo(user_name) {
    let user_info = $(`
      <div id='${user_name}' class='user-info'>
        <div class='btn-close' aria-hidden='true'><i class='emjdx-abstract flip-vertical'></i></div>
        <div class='user-name'>${user_name}</div>
        <div class="clearfix"/>
        <hr>
        <div class="user-emoji-list clearfix">
        </div>
      </div>
    `).click(e => {
      e.stopPropagation();
    });
    user_info.find('.btn-close').click(() => {
      $(this.selector_tab_pane).find('*').removeClass('on');
    });
    $(this.selector_tab_pane).append(user_info);

    this.setUserEmojisInfo(user_info);
  }

  setUserEmojisInfo(user_info, option = {}) {
    const user_name = user_info.attr('id');
    return this.EC.Indexes.user(user_name, undefined, option).then((response) => {
      user_info.data(response.meta);
      user_info.data({user_name: user_name, max_page: Math.ceil(response.meta.total_count / this.EC.limit ? response.meta.total_count / this.EC.limit : 1)});

      user_info.find('.user-emoji-list').children().remove();
      user_info.find('.followers-pagination').remove();

      user_info.find('.user-emoji-list').append(this.palette.setEmojiList('followers', response.emoji));
      this.setPagination(user_info);
    });
  }

  setPagination(user_info) {
    let meta = user_info.data();
    if (!this.EC.User.auth_info.premium) {
      meta.max_page = 1;
    }

    const prev_func = () => {
      option = {page: meta.page - 1};
      if(option.page > 0) {
        this.setUserEmojisInfo(user_info, option);
      }
    }
    const next_func = () => {
      option = {page: meta.page + 1};
      if(option.page <= meta.max_page) {
        this.setUserEmojisInfo(user_info, option);
      }
    }
    user_info.append(this.palette.getPagination('followers', prev_func, next_func, meta.page, meta.max_page));
  }
}
