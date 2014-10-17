(function() {
  (function() {
    $(document).ready(function() {
      return $.ajax({
        url: "https://www.emojidex.com/api/v1/emoji",
        dataType: "json",
        type: "get",
        success: function(emojis_data) {
          return $.each(emojis_data.emoji, function(i, emoji) {
            var list_elm;
            list_elm = $('<li class="col-xs-4 col-sm-3 col-md-3 text-center"></li>');
            list_elm.append('<img src="' + emoji.image.replace("emoji/original", "emoji/px32").replace(".svg", ".png") + '">');
            list_elm.append('<div>:' + emoji.code + ':</div>');
            $("#catalog").append(list_elm);
            if ((i + 1) % 4 === 0) {
              $("#catalog").append('<div class="hidden-xs clearfix"></div>');
            }
            if ((i + 1) % 3 === 0) {
              return $("#catalog").append('<div class="visible-xs clearfix"></div>');
            }
          });
        },
        error: function(emojis_data) {
          console.log("error: load json");
          return console.log(data);
        }
      });
    });
  }).call(this);

}).call(this);
