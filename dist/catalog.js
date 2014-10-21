(function() {
  $(document).ready(function() {
    var catalog_sets;
    catalog_sets = ["emoji", "emojidex"];
    return $.each(catalog_sets, function(i, set_name) {
      return $.ajax({
        url: "https://www.emojidex.com/api/v1/users/" + set_name + "/emoji",
        dataType: "json",
        type: "get",
        success: function(emojis_data) {
          console.dir(emojis_data);
          return $.each(emojis_data.emoji, function(j, emoji) {
            var emoji_name, list_elm;
            emoji_name = emoji.code.replace(RegExp(" ", "g"), "_");
            list_elm = $('<li class="mt-l col-xs-4 col-sm-3 col-md-2 text-center"></li>');
            list_elm.append('<img class="img-responsive" src="http://s3-us-west-2.amazonaws.com/assets.emojidex.com/emoji/px128/' + emoji_name + '.png">');
            list_elm.append('<div>:' + emoji.code + ':</div>');
            $("#catalog_" + set_name).append(list_elm);
            if ((j + 1) % 3 === 0) {
              $("#catalog_" + set_name).append('<div class="visible-xs clearfix"></div>');
            }
            if ((j + 1) % 4 === 0) {
              $("#catalog_" + set_name).append('<div class="visible-sm clearfix"></div>');
            }
            if ((j + 1) % 6 === 0) {
              return $("#catalog_" + set_name).append('<div class="visible-md visible-lg clearfix"></div>');
            }
          });
        },
        error: function(emojis_data) {
          console.log("error: load json");
          return console.log(data);
        }
      });
    });
  });

}).call(this);
