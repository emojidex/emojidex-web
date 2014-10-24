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
        visible_size: "visible-md visible-lg"
      }
    ];
    categorized_emojis_data = get_categrized_emojis_data(emojis_data.emoji);
    tab_list = $('<ul class="nav nav-tabs"></ul>');
    tab_content = $("<div class='tab-content'></div>");
    $.each(categorized_emojis_data, function(category_name, category_emojis) {
      var emoji_list, tab_pane;
      tab_pane = $("<div class='tab-pane" + (tab_list[0].children.length === 0 ? " active" : "") + "' id='" + catalog_name + "-" + category_name + "'></div>");
      tab_list.append(("<li class='" + (tab_list[0].children.length === 0 ? " active" : "") + "'><a href='#" + catalog_name + "-" + category_name + "' data-toggle='tab'>") + category_name + "</a></li>");
      emoji_list = $("<ul class='list-unstyled'></ul>");
      $.each(category_emojis, function(j, emoji) {
        var emoji_name, list_elm;
        emoji_name = emoji.code.replace(RegExp(" ", "g"), "_");
        list_elm = $('<li class="mt-l col-xs-4 col-sm-3 col-md-2 text-center"></li>');
        list_elm.append('<img class="img-responsive" src="http://s3-us-west-2.amazonaws.com/assets.emojidex.com/emoji/px128/' + emoji_name + '.png">');
        list_elm.append('<div>:' + emoji.code + ':</div>');
        emoji_list.append(list_elm);
        return $.each(clearfix_data_array, function(k, data) {
          if ((j + 1) % data.split_num === 0) {
            return emoji_list.append('<div class="' + data.visible_size + ' clearfix"></div>');
          }
        });
      });
      tab_pane.append(emoji_list);
      return tab_content.append(tab_pane);
    });
    $("#" + catalog_name + "-category-tabs").append(tab_list);
    return $("#" + catalog_name + "-category-tabs").append(tab_content);
  };

  $(document).ready(function() {
    var usernames, _i, _len, _results;
    usernames = ["emoji", "emojidex"];
    _results = [];
    for (_i = 0, _len = user.length; _i < _len; _i++) {
      usernames = user[_i];
      _results.push($.ajax({
        url: "https://www.emojidex.com/api/v1/users/" + user + "/emoji",
        dataType: "json",
        type: "get",
        success: function(emojis_data) {},
        error: function(emojis_data) {
          console.log("error: load json");
          return console.log(data);
        }
      }));
    }
    return _results;
  });

}).call(this);
