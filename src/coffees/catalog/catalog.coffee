get_categrized_emojis_data = (emojis_data) ->
  categrized_data = all: emojis_data
  for emoji in emojis_data

    if emoji.category is null
      unless categrized_data.uncategorized?
        categrized_data.uncategorized = [emoji]
      else
        categrized_data.uncategorized.push emoji

    else
      unless categrized_data[emoji.category]?
        categrized_data[emoji.category] = [emoji]
      else
        categrized_data[emoji.category].push emoji

  return categrized_data

set_emoji_list = (emojis_data) ->
  clearfix_data_array = [
    {split_num: 3, visible_size: "visible-xs"}
    {split_num: 4, visible_size: "visible-sm"}
    {split_num: 6, visible_size: "visible-md visible-lg"}
  ]

  categorized_emojis_data = get_categrized_emojis_data emojis_data
  tab_list = $('<ul class="nav nav-tabs"></ul>')
  tab_content = $("<div class='tab-content'></div>")

  $.each categorized_emojis_data, (category_name, category_emojis) ->
    tab_pane = $("<div class='tab-pane#{if tab_list[0].children.length is 0 then " active" else ""}' id='#{category_name}'></div>")
    tab_list.append "<li class='#{if tab_list[0].children.length is 0 then " active" else ""}'><a href='##{category_name}' data-toggle='tab'>" + category_name + "</a></li>"

    emoji_list = $("<ul class='list-unstyled'></ul>")
    $.each category_emojis, (j, emoji) ->
      fixed_emoji_code = emoji.code.replace RegExp(" ", "g"), "_"
      list_elm = $('<li class="mt-l col-xs-4 col-sm-3 col-md-2 text-center"></li>')
      list_elm.append '<img class="img-responsive" src="http://s3-us-west-2.amazonaws.com/assets.emojidex.com/emoji/px128/' + fixed_emoji_code + '.png">'
      list_elm.append '<div>:' + emoji.code + ':</div>'
      emoji_list.append list_elm

      $.each clearfix_data_array, (k, data) ->
        if (j+1) % data.split_num is 0
          emoji_list.append '<div class="' + data.visible_size + ' clearfix"></div>'

     tab_pane.append emoji_list
     tab_content.append tab_pane

  $("#emoji-category-tabs").append tab_list
  $("#emoji-category-tabs").append tab_content

$(document).ready ->

  loaded_num = 0
  user_names = ["emoji", "emojidex"]
  emojis_data = []

  for user_name in user_names
    $.ajax
      url: "https://www.emojidex.com/api/v1/users/" + user_name + "/emoji"
      dataType: "json"
      type: "get"

      success: (user_emojis_json) ->
        emojis_data = emojis_data.concat user_emojis_json.emoji
        if ++loaded_num is user_names.length
          set_emoji_list emojis_data

      error: (user_emojis_json) ->
        console.log "error: load json"
        console.log user_emojis_json
