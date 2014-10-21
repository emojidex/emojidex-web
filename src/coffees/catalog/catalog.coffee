$(document).ready ->

  catalog_sets = ["emoji", "emojidex"]

  $.each catalog_sets, (i, set_name) ->

    $.ajax
      url: "https://www.emojidex.com/api/v1/users/" + set_name + "/emoji"

      dataType: "json"
      type: "get"
      success: (emojis_data) ->
        console.dir emojis_data

        $.each emojis_data.emoji, (j, emoji) ->

          emoji_name = emoji.code.replace RegExp(" ", "g"), "_"
          list_elm = $('<li class="mt-l col-xs-4 col-sm-3 col-md-2 text-center"></li>')
          list_elm.append '<img class="img-responsive" src="http://s3-us-west-2.amazonaws.com/assets.emojidex.com/emoji/px128/' + emoji_name + '.png">'
          list_elm.append '<div>:' + emoji.code + ':</div>'

          $("#catalog_" + set_name).append list_elm

          if (j+1) % 3 is 0
            $("#catalog_" + set_name).append '<div class="visible-xs clearfix"></div>'

          if (j+1) % 4 is 0
            $("#catalog_" + set_name).append '<div class="visible-sm clearfix"></div>'

          if (j+1) % 6 is 0
            $("#catalog_" + set_name).append '<div class="visible-md visible-lg clearfix"></div>'

      error: (emojis_data) ->
        console.log "error: load json"
        console.log data
