(->
  $(document).ready ->
    $.ajax
      url: "https://www.emojidex.com/api/v1/emoji"
      dataType: "json"
      type: "get"
      success: (emojis_data) ->
        $.each emojis_data.emoji, (i, emoji) ->
          list_elm = $('<li class="col-xs-4 col-sm-3 col-md-3 text-center"></li>')
          list_elm.append '<img src="' + emoji.image.replace("emoji/original", "emoji/px32").replace(".svg", ".png") + '">'
          list_elm.append '<div>:' + emoji.code + ':</div>'

          $("#catalog").append list_elm

          if (i+1) % 4 is 0
            $("#catalog").append '<div class="hidden-xs clearfix"></div>'

          if (i+1) % 3 is 0
            $("#catalog").append '<div class="visible-xs clearfix"></div>'


      error: (emojis_data) ->
        console.log "error: load json"
        console.log data


  return
).call this