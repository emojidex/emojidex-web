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

$(document).ready ->
  catalog_sets = ["emoji", "emojidex"]

  $.each catalog_sets, (i, catalog_name) ->

    $.ajax
      url: "https://www.emojidex.com/api/v1/users/" + catalog_name + "/emoji"
      dataType: "json"
      type: "get"

      success: (emojis_data) ->
        categorized_emojis_data = get_categrized_emojis_data emojis_data.emoji

        clearfix_data_array = [
          {split_num: 3, visible_size: "visible-xs"}
          {split_num: 4, visible_size: "visible-sm"}
          {split_num: 6, visible_size: "visible-md visible-lg"}
        ]

        tab_list = $('<ul class="nav nav-tabs"></ul>')
        tab_content = $("<div class='tab-content'></div>")
        $.each categorized_emojis_data, (category_name, category_emojis) ->
          tab_pane = $("<div class='tab-pane#{if tab_list[0].children.length is 0 then " active" else ""}' id='#{catalog_name}-#{category_name}'></div>")
          tab_list.append "<li class='#{if tab_list[0].children.length is 0 then " active" else ""}'><a href='##{catalog_name}-#{category_name}' data-toggle='tab'>" + category_name + "</a></li>"

          emoji_list = $("<ul class='list-unstyled'></ul>")
          $.each category_emojis, (j, emoji) ->
            emoji_name = emoji.code.replace RegExp(" ", "g"), "_"
            list_elm = $('<li class="mt-l col-xs-4 col-sm-3 col-md-2 text-center"></li>')
            list_elm.append '<img class="img-responsive" src="http://s3-us-west-2.amazonaws.com/assets.emojidex.com/emoji/px128/' + emoji_name + '.png">'
            list_elm.append '<div>:' + emoji.code + ':</div>'
            emoji_list.append list_elm

            $.each clearfix_data_array, (k, data) ->
              if (j+1) % data.split_num is 0
                emoji_list.append '<div class="' + data.visible_size + ' clearfix"></div>'

           tab_pane.append emoji_list
           tab_content.append tab_pane

        $("##{catalog_name}-category-tabs").append tab_list
        $("##{catalog_name}-category-tabs").append tab_content

      error: (emojis_data) ->
        console.log "error: load json"
        console.log data
