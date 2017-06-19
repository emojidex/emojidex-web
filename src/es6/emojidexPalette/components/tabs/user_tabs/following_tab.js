class FollowingTab {
  constructor(user_tab) {
    this.EC = user_tab.palette.EC;
    this.palette = user_tab.palette;
    this.tab_pane = $(
      `<div id='follow-following' class='tab-pane'>
        <div class='users'>
          <div class='btn btn-default'>user1</div>
          <div class='btn btn-default'>user2</div>
        </div>
        <div class='wrapper'>
          <div id='user1' class='user-info'>
            <div class='user-name'>User1</div>
            <div class='btn-close'aria-hidden='true'>X</div>
            <div class="clearfix"/>
            <hr>
            <div class="user-emoji-list clearfix">
              <button class="emoji-btn btn btn-default pull-left"><img alt="bat" title="bat" class="img-responsive center-block" src="https://cdn.emojidex.com/emoji/px32/bat.png"></button>
              <button class="emoji-btn btn btn-default pull-left"><img alt="bat" title="bat" class="img-responsive center-block" src="https://cdn.emojidex.com/emoji/px32/bat.png"></button>
              <button class="emoji-btn btn btn-default pull-left"><img alt="bat" title="bat" class="img-responsive center-block" src="https://cdn.emojidex.com/emoji/px32/bat.png"></button>
            </div>
          </div>
          <div id='user2' class='user-info'>
            <div class='user-name'>user2</div>
            <div class='btn-close'aria-hidden='true'>X</div>
            <div class="clearfix"/>
            <hr>
            <div class="user-emoji-list clearfix">
              <button class="emoji-btn btn btn-default pull-left"><img alt="bgok" title="bgok" class="img-responsive center-block" src="https://cdn.emojidex.com/emoji/px32/bgok.png"></button>
              <button class="emoji-btn btn btn-default pull-left"><img alt="bgok" title="bgok" class="img-responsive center-block" src="https://cdn.emojidex.com/emoji/px32/bgok.png"></button>
              <button class="emoji-btn btn btn-default pull-left"><img alt="bgok" title="bgok" class="img-responsive center-block" src="https://cdn.emojidex.com/emoji/px32/bgok.png"></button>
            </div>
          </div>
        </div>
      </div>`
    );
  }

  addClickEvents() {
    $('#follow-following > .users > .btn').click((e) => {
      $('#follow-following > .wrapper').find(`#${$(e.currentTarget).text()}`).addBack().addClass('on')
    })

    $('#follow-following > .wrapper').find('.user-info > .btn-close').addBack().click(() => {
      $('#follow-following > .wrapper').find('*').addBack().removeClass('on')
    })

    $('#follow-following > .wrapper > .user-info').click((e) => {
      e.stopPropagation();
    })
  }
}
