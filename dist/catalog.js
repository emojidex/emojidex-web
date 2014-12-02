(function() {
  var get_categrized_emojis_data, set_emoji_list;

  get_categrized_emojis_data = function(emojis_data) {
    var categrized_data, emoji, _i, _len;
    categrized_data = {
      all: emojis_data
    };
    for (_i = 0, _len = emojis_data.length; _i < _len; _i++) {
      emoji = emojis_data[_i];
      if (emoji.category === null) {
        if (categrized_data.uncategorized == null) {
          categrized_data.uncategorized = [emoji];
        } else {
          categrized_data.uncategorized.push(emoji);
        }
      } else {
        if (categrized_data[emoji.category] == null) {
          categrized_data[emoji.category] = [emoji];
        } else {
          categrized_data[emoji.category].push(emoji);
        }
      }
    }
    return categrized_data;
  };

  set_emoji_list = function(emojis_data) {
    var categorized_emojis_data, clearfix_data_array, tab_content, tab_list;
    clearfix_data_array = [
      {
        split_num: 3,
        visible_size: "visible-xs"
      }, {
        split_num: 4,
        visible_size: "visible-sm"
      }, {
        split_num: 6,
        visible_size: "visible-md"
      }, {
        split_num: 12,
        visible_size: "visible-lg"
      }
    ];
    categorized_emojis_data = get_categrized_emojis_data(emojis_data);
    tab_list = $('<ul class="nav nav-tabs"></ul>');
    tab_content = $("<div class='tab-content'></div>");
    $.each(categorized_emojis_data, function(category_name, category_emojis) {
      var emoji_list, tab_pane;
      tab_pane = $("<div class='tab-pane" + (tab_list[0].children.length === 0 ? " active" : "") + "' id='" + category_name + "'></div>");
      tab_list.append("<li class='" + (tab_list[0].children.length === 0 ? " active" : "") + "'><a href='#" + category_name + "' data-toggle='tab'>" + category_name + "</a></li>");
      emoji_list = $("<ul class='emoji-list list-unstyled mt-l'></ul>");
      $.each(category_emojis, function(j, emoji) {
        var fixed_emoji_code, list_elm;
        fixed_emoji_code = emoji.code.replace(RegExp(" ", "g"), "_");
        list_elm = $('<li class="mb-l col-xs-4 col-sm-3 col-md-2 col-lg-1 text-center"></li>');
        list_elm.append("<img class='img-responsive lazy' src='../img/loading.png' data-original='http://assets.emojidex.com/emoji/px128/" + fixed_emoji_code + ".png'>");
        list_elm.append('<div>:' + emoji.code + ':</div>');
        emoji_list.append(list_elm);
        return $.each(clearfix_data_array, function(k, data) {
          if ((j + 1) % data.split_num === 0) {
            return emoji_list.append("<div class='" + data.visible_size + " clearfix'></div>");
          }
        });
      });
      tab_pane.append(emoji_list);
      return tab_content.append(tab_pane);
    });
    $("#emoji-category-tabs").append(tab_list);
    $("#emoji-category-tabs").append(tab_content);
    $("img.img-responsive.lazy").lazyload({
      effect: "fadeIn",
      skip_invisible: true
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      return $(window).resize();
    });
    return setTimeout((function() {
      return $(window).resize();
    }), 1000);
  };

  $(document).ready(function() {
    var emojis_data, loaded_num, user_name, user_names, _i, _len, _results;
    loaded_num = 0;
    user_names = ["emojidex", "emoji"];
    emojis_data = [];
    _results = [];
    for (_i = 0, _len = user_names.length; _i < _len; _i++) {
      user_name = user_names[_i];
      $.ajaxSetup({
        beforeSend: function(jqXHR, settings) {
          return jqXHR.user_name = user_name;
        }
      });
      _results.push($.ajax({
        url: "https://www.emojidex.com/api/v1/users/" + user_name + "/emoji",
        dataType: "json",
        type: "get",
        success: function(user_emojis_json, status, xhr) {
          emojis_data = emojis_data.concat(user_emojis_json.emoji);
          if (++loaded_num === user_names.length) {
            return set_emoji_list(emojis_data);
          }
        },
        error: function(user_emojis_json) {
          console.log("error: load json");
          return console.log(user_emojis_json);
        }
      }));
    }
    return _results;
  });

}).call(this);
