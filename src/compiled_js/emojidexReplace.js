/*
* emojidexReplace
*
* =LICENSE=
* Licensed under the emojidex Open License
* https://www.emojidex.com/emojidex/emojidex_open_license
*
* Copyright 2013 Genshin Souzou Kabushiki Kaisha
*/


(function() {
  var Replacer, ReplacerService,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexReplace";
    defaults = {
      userNames: ['emoji', 'emojidex']
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.api_emoji_replacer = new ReplacerService(this.element, this.options);
        this.api_emoji_replacer.replace();
      }

      return Plugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window, document);

  Replacer = (function() {
    function Replacer() {}

    Replacer.prototype.emoji_data = null;

    Replacer.prototype.element = null;

    Replacer.prototype.options = null;

    Replacer.prototype.emoji_regexps = null;

    Replacer.prototype.setEmojiCSS_getEmojiRegexps = function(emoji_data) {
      var emoji, emoji_css, regexp_for_code, regexp_for_utf, _i, _len;
      regexp_for_utf = "";
      regexp_for_code = ":(";
      emoji_css = $('<style type="text/css" />');
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        if (emoji.moji != null) {
          regexp_for_utf += emoji.moji + "|";
        }
        if (emoji.code != null) {
          regexp_for_code += emoji.code + "|";
        }
        emoji_css.append("i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}");
      }
      $("head").append(emoji_css);
      return {
        utf: regexp_for_utf.slice(0, -1),
        code: regexp_for_code.slice(0, -1) + "):"
      };
    };

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return '<i class="emojidex-' + emoji_code + '"></i>';
    };

    Replacer.prototype.replaceForUTF = function(options) {
      var replaced_string,
        _this = this;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var emoji, _i, _len, _ref;
        _ref = options.emoji_data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          emoji = _ref[_i];
          if (emoji.moji === matched_string) {
            return _this.getEmojiTag(emoji.code);
          }
        }
      });
    };

    Replacer.prototype.replaceForCode = function(options) {
      var replaced_string,
        _this = this;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string, pattern1) {
        var emoji, _i, _len, _ref;
        _ref = options.emoji_data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          emoji = _ref[_i];
          if (emoji.code === pattern1) {
            return _this.getEmojiTag(emoji.code);
          }
        }
      });
    };

    Replacer.prototype.setEmojiIcon = function(loader) {
      var num, replaced_string, text_node, text_nodes, _i, _len,
        _this = this;
      text_nodes = $(this.element_clone).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      });
      for (_i = 0, _len = text_nodes.length; _i < _len; _i++) {
        text_node = text_nodes[_i];
        replaced_string = text_node.textContent;
        if (loader.emoji_regexps.utf != null) {
          replaced_string = this.replaceForUTF({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.utf,
            emoji_data: loader.emoji_data
          });
        }
        if (loader.emoji_regexps.code != null) {
          replaced_string = this.replaceForCode({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.code,
            emoji_data: loader.emoji_data
          });
        }
        $(text_node).replaceWith(replaced_string);
      }
      num = 0;
      return this.element.find(".emojidex-loading-icon").fadeOut("normal", function() {
        if (num === _this.element.find(".emojidex-loading-icon").length - 1) {
          _this.element_clone.find('i[class*="emojidex-"]').hide();
          _this.element.replaceWith(_this.element_clone);
          _this.element = _this.element_clone;
          return _this.element_clone.find('i[class*="emojidex-"]').fadeIn("fast");
        } else {
          return num++;
        }
      });
    };

    return Replacer;

  })();

  ReplacerService = (function(_super) {
    __extends(ReplacerService, _super);

    function ReplacerService(element, options) {
      this.element = element;
      this.options = options;
      this.onLoadEmojiData = __bind(this.onLoadEmojiData, this);
      ReplacerService.__super__.constructor.apply(this, arguments);
      this.element = $(this.element);
    }

    ReplacerService.prototype.replace = function(callback) {
      this.setLoadingIcon();
      return this;
    };

    ReplacerService.prototype.onLoadEmojiData = function(emoji_data) {
      var emoji, _i, _len;
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        emoji.code = emoji.code.replace(RegExp(" ", "g"), "_");
        emoji.img_url = "http://cdn.emojidex.com/emoji/px32/" + emoji.code + ".png";
      }
      this.emoji_data = emoji_data;
      this.emoji_regexps = this.setEmojiCSS_getEmojiRegexps(emoji_data);
      this.setEmojiIcon(this);
      if (typeof callback !== "undefined" && callback !== null) {
        return callback(this);
      }
    };

    ReplacerService.prototype.setLoadingIcon = function() {
      var setLoadingTag, text, text_node, text_nodes, _i, _len;
      setLoadingTag = function(text) {
        var loading_icon, regexp_utf;
        loading_icon = '<img class="emojidex-loading-icon"></img>';
        regexp_utf = '\
        ✅|🎭|🎵|🎶|💘|💡|💢|💤|💥|💧|💨|💩|💪|💫|💯|💲|💹|📈|📧|📩|🔀|🔁|🔄|🔇|🔉|🔖|🔗|🔙|🔚|🔛|🔜|🔝|🔡|🔢|🔣|🔤|🔥|🔲|🔳|🔵|🔶|🔷|🔸|🔹|🔺|🔻|🔽|🗤|🗥|🗧|🗨|🗩|🗪|🗫|🗬|🗭|🗯|🗯|🗱|🗵|🗶|🗷|🗸|🗹|↔|↖|↗|↘|↙|↪|⏬|▪|▫|◻|◼|☑|✔|✖|✳|✴|❌|➖|➗|⤴|⤵|⬛|⬜|⭐|⭕|💒|💓|💔|💕|💖|💗|💙|💚|💛|💜|💝|💞|💟|💦|💬|💭|💮|💱|📉|📊|📤|📥|📶|🔂|🔃|🔅|🔆|🔊|🔕|🔘|🔞|🔠|🔴|🔼|🔾|🔿|🗠|🗦|🗰|🗲|🗴|🚫|‼|⁉|↕|⏩|⏪|⏫|▶|◀|⚪|⚫|⛔|✨|❇|❎|❓|❔|❕|❗|❤|➕|➡|➰|⬅|⬆|⬇|〰|↩|◽|◾|☙|⛋|〽️|㊙|🅿|🆒|🆓|🆔|🆕|🆖|🆗|🆘|🆙|🆚|🇴|🇵|🇶|🇷|🇸|🇹|🇺|🇻|🇼|🇽|🇾|🇿|🇨🇳|🇩🇪|🇪🇸|🇫🇷|🇬🇧|🇮🇹|🇯🇵|🇰🇷|🇷🇺|🇺🇸|🈁|🈂|🈚|🈯|🈲|🈳|🈴|🈵|🈶|🈷|🈸|🈹|🈺|🉐|🉑|📲|🕅|🗕|🗖|🗗|🗙|🗚|🗛|🗜|🗝|🗞|🗟|🗳|🗺|🚩|🚬|🚮|🚱|🚹|🚺|🚻|🚾|#️⃣|️1️⃣|️2️⃣|️3️⃣|️4️⃣|️5️⃣|️6️⃣|️7️⃣|️8️⃣|️9️⃣|️0️⃣|™|Ⓜ️|♈|♉|♊|♋|♌|♍|♎|♓|♠|♣|♥|⚠|➿|🅰|🅱|🅾|🆎|🆑|🇦|🇧|🇨|🇩|🇪|🇫|🇬|🇭|🇮|🇯|🇰|🇱|🇲|🇳|📳|📴|📵|🔟|🕉|🕲|🗘|🚭|🚯|🚰|🚳|🚷|🚸|🚼|🛂|🛃|🛄|🛅|©|®|ℹ|♏|♐|♑|♒|♦|♻|♿|⛎|✡|㊗|🕀|🕁|🕂|🕃|🕄|☊|☋|☌|☍|☠|☡|☢|☣|☤|☥|☦|☧|☨|☩|☪|☫|☬|☭|☮|☯|☰|☱|☲|☳|☴|☵|☶|☷|☸|☿|♀|♁|♂|♃|♄|♅|♆|♇|♔|♕|♖|♗|♘|♙|♚|♛|♜|♝|♞|♟|♩|♬|♭|♮|♯|♰|♱|♳|♴|♵|♶|♷|♸|♹|♺|♼|♽|⚆|⚇|⚈|⚉|⚊|⚋|⚌|⚍|⚎|⚏|⚒|⚔|⚕|⚖|⚗|⚘|⚙|⚛|⚜|⚝|⚞|⚟|⚢|⚣|⚤|⚥|⚦|⚧|⚨|⚩|⚭|⚮|⚯|⚱|⚲|⚳|⚴|⚵|⚶|⚷|⚸|⚹|⚺|⚻|⚼|⛇|⛌|⛍|⛏|⛐|⛑|⛒|⛓|⛕|⛖|⛗|⛘|⛙|⛚|⛛|⛜|⛝|⛞|⛟|⛠|⛡|⛣|⛤|⛧|⛭|⛮|⛯|⛶|⛼|⛿|🌬|🎅|🏂|🏃|🏄|🏇|🏊|🏋|🏌|🏍|🏎|👀|👁|👂|👃|🗢|👅|👣|👦|👧|👨|👩|👪|👫|👬|👭|👮|👯|👱|👲|👴|👵|👶|👸|👻|👼|👽|👾|👿|💀|💁|💂|💃|💆|💇|💏|🗣|🚴|🚶|👤|👥|👰|👳|👷|👹|👺|💑|🕴|🕵|🚵|⛸|⛹|😂🏾|😋🏾|😙🏾|😚🏾|😛🏾|😠🏾|😢🏾|😥🏾|😩🏾|😪🏾|😭🏾|😯🏾|😱🏾|😳🏾|😷🏾|😂🏿|😃🏿|😉🏿|😉🏾|😊🏿|😋🏿|😓🏿|😔🏿|😗🏿|😙🏿|😚🏿|😛🏿|😟🏿|😠🏿|😢🏿|😤🏿|😥🏿|😨🏿|😩🏿|😪🏿|😬🏿|😭🏿|😯🏿|😱🏿|😳🏿|😴🏿|😷🏿|😒🏾|😒🏿|☺🏾|☺🏿|😌🏾|😌🏿|😁🏾|😁🏿|😏🏾|😏🏿|😄🏾|😄🏿|😆🏾|😆🏿|😃🏾|😇🏾|😊🏾|😎🏾|😐🏾|😑🏾|😓🏾|😔🏾|😕🏾|😖🏾|😗🏾|😞🏾|😟🏾|😣🏾|😤🏾|😦🏾|😧🏾|😨🏾|😫🏾|😬🏾|😮🏾|😰🏾|😲🏾|😴🏾|😵🏾|😶🏾|😇🏿|😎🏿|😐🏿|😑🏿|😕🏿|😖🏿|😞🏿|😣🏿|😦🏿|😧🏿|😫🏿|😮🏿|😰🏿|😲🏿|😵🏿|😶🏿|😅🏾|😅🏿|😘🏾|😘🏿|😝🏾|😝🏿|😜🏾|😜🏿|😍🏾|😍🏿|😁🏽|😀|😁|😂|😃|😄|😅|😆|😇|😈|😉|😊|😋|😌|😍|😎|😏|😑|😒|😓|😔|😕|😖|😗|😜|😝|😞|😟|😠|😡|😢|😣|😤|😦|😧|😨|😩|😪|😫|😬|😭|😯|😰|😱|😲|😳|😴|😵|😶|😷|😹|😼|☺|😐|😘|😙|😚|😛|😥|😮|😸|😺|😻|😽|😾|😿|🙀|☹|☻|🌀|🌁|🌂|🌃|🌄|🌅|🌆|🌇|🌈|🌉|🌊|🌋|🌍|🌎|🌏|🌐|☽|☾|🌡|🌢|🌣|🌤|🌥|🌦|🌧|🌨|🌩|🌪|🌫|🌰|🌱|🌲|🌳|🌴|🌵|🌶|🌷|🌸|🌹|🌺|🌻|🌼|🌾|🌿|🍀|🍁|🍂|🍃|🏔|🐀|🐁|🐂|🐃|🐄|🐅|🐆|🐇|🐈|🐉|🐊|🐋|🐌|🐍|🐎|🐏|🐐|🐑|🐒|🐓|🐔|🐕|🐖|🐗|🐘|🐙|🐚|🐛|🐜|🐝|🐞|🐟|🐠|🐡|🐢|🐣|🐤|🐥|🐦|🐧|🐨|🐩|🐪|🐫|🐬|🐭|🐮|🐯|🐰|🐱|🐲|🐳|🐴|🐵|🐶|🐷|🐸|🐹|🐺|🐻|🐼|🐽|🐾|🐿|🕷|🗻|🗾|☀|☁|⚡|⛄|🕊|🕸|☔|⛅|❄|☄|★|☈|☼|⛳|⛺|✉|🃏|🎀|🎁|🎃|🎄|🎆|🎇|🎈|🎉|🎊|🎋|🎌|🎍|🎎|🎏|🎐|🎑|🎒|🎓|🎔|🎕|🎖|🎗|🎘|🎙|🎚|🎛|🎜|🎝|🎞|🎟|🎠|🎡|🎢|🎣|🎤|🎥|🎦|🎧|🎨|🎩|🎪|🎫|🎬|🎮|🎯|🎰|🎱|🎲|🎳|🎴|🎷|🎸|🎹|🎺|🎻|🎼|🎽|🎾|🎿|🏀|🏁|🏅|🏆|🏈|🏉|🏕|🏖|🏗|🏘|🏙|🏚|🏛|🏱|🏲|🏳|🏴|🏵|🏶|🏷|👑|👒|👓|👔|👕|👖|👗|👘|👙|👚|👛|👜|👝|👞|👟|👠|👡|👢|💄|💅|💈|💉|💊|💋|💍|💎|💐|💰|💳|💴|💵|💶|💷|💺|💻|💼|💽|💾|💿|📀|📁|📅|📆|📇|📋|📌|📎|📒|📓|📔|📖|📘|📙|📚|📛|📜|📝|📟|📠|📡|📢|📣|📦|📫|📭|📮|📯|📰|📱|📷|📹|📺|📻|📼|🔈|🔋|🔌|🔍|🔎|🔐|🔑|🔒|🔓|🔔|🔰|🔱|🕐|🕑|🕒|🕓|🕔|🕕|🕖|🕗|🕘|🕙|🕚|🕛|🕜|🕝|🕞|🕟|🕠|🕡|🕢|🕣|🕤|🕫|🕬|🕯|🕱|🕳|🕹|🕻|🕼|🕽|🕾|🕿|🖀|🖁|🖄|🖆|🖊|🖋|🖧|🖨|🖪|🖫|🖬|🖲|🖴|🖵|🖶|🖷|🖺|🖿|🗀|🗀|🗃|🗄|🗅|🗈|🗉|🗊|🗌|🗍|🗎|🗏|🗐|🗑|🗼|🗿|🚧|🚪|🚽|🚿|🛀|🛁|⌚️|⌛|⏳|☎|☕|⚽|⚾|✂|✏|✒|🀄|💌|💸|📂|📃|📄|📍|📏|📐|📑|📕|📗|📞|📨|📪|📬|📸|📽|📾|🔏|🔮|🔯|🕄|🕆|🕇|🕈|🕥|🕦|🕧|🕨|🕩|🕪|🕭|🕰|🕶|🖂|🖃|🖅|🖇|🖈|🖉|🖌|🖍|🖥|🖦|🖩|🖭|🖮|🖯|🖰|🖱|🖳|🖸|🖹|🖻|🖼|🖽|🖾|🗂|🗆|🗇|🗋|🗒|🗓|🗔|🗽|🚥|🚦|🚨|⏰|☖|☗|⚀|⚁|⚂|⚃|⚄|⚅|⚰|⛀|⛁|⛂|⛃|⛉|⛊|💣|🔦|🔧|🔨|🔪|🔫|🔭|🔩|🔬|🗡|✌|👆|👇|👈|👉|👊|👋|👌|👍|👎|👏|🖎|🖏|🖒|🖔|🙊|👐|🖐|🖑|🖓|🖗|🖘|🖙|🖚|🖛|🖜|🖝|🖞|🖟|🖠|🖡|🖢|🖣|🙅|🙆|🙇|🙈|🙉|🙋|🙌|🙍|🙎|🙏|☝|✊|✋|🖖|☚|☛|🚂|🚄|🚅|🚔|🚕|🚘|🚛|🚞|🚟|🚠|🚡|🚀|🚁|🚃|🚆|🚇|🚈|🚉|🚊|🚋|🚌|🚍|🚎|🚏|🚐|🚑|🚒|🚓|🚖|🚗|🚙|🚚|🚜|🚝|🚢|🚣|🚤|🚲|⚓|⛵|✈|🌽|🍄|🍅|🍆|🍇|🍈|🍉|🍊|🍋|🍌|🍍|🍎|🍏|🍐|🍑|🍒|🍓|🍔|🍕|🍖|🍗|🍘|🍙|🍚|🍛|🍜|🍝|🍞|🍟|🍠|🍡|🍢|🍣|🍤|🍥|🍦|🍧|🍨|🍩|🍪|🍫|🍬|🍭|🍮|🍯|🍰|🍱|🍲|🍳|🍴|🍵|🍶|🍷|🍸|🍹|🍺|🍻|🍼|🍽|🎂|⛲|⛽|🏜|🏝|🏞|🏟|🏠|🏡|🏢|🏣|🏤|🏥|🏦|🏧|🏨|🏩|🏪|🏫|🏬|🏭|🏮|🏯|🏰|⛪|♨|⛩|⛬|⛱|🌌|🌒|🌔|🌖|🌘|🌙|🌚|🌛|🌜|🌝|🌞|🌟|🌠|🌕|🌑\
      ';
        text = text.replace(new RegExp(regexp_utf, "g"), function(matched_string) {
          return loading_icon;
        });
        return text = text.replace(/:([^:]+):/g, function(matched_string, pattern1) {
          return loading_icon;
        });
      };
      this.element_clone = this.element.clone(true);
      text_nodes = this.element.find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      });
      for (_i = 0, _len = text_nodes.length; _i < _len; _i++) {
        text_node = text_nodes[_i];
        text = text_node.textContent;
        text = setLoadingTag(text);
        $(text_node).replaceWith(text);
      }
      return this.getEmojiDataFromAPI(this.onLoadEmojiData);
    };

    ReplacerService.prototype.getEmojiDataFromAPI = function(callback) {
      var emoji_data, loaded_num, user_name, user_names, _i, _len, _results;
      loaded_num = 0;
      user_names = this.options.userNames;
      emoji_data = [];
      _results = [];
      for (_i = 0, _len = user_names.length; _i < _len; _i++) {
        user_name = user_names[_i];
        _results.push($.ajax({
          url: "https://www.emojidex.com/api/v1/users/" + user_name + "/emoji",
          dataType: "json",
          type: "get",
          success: function(user_emoji_json, status, xhr) {
            emoji_data = emoji_data.concat(user_emoji_json.emoji);
            if (++loaded_num === user_names.length) {
              return callback(emoji_data);
            }
          },
          error: function(data) {
            console.log("error: load json");
            return console.log(data);
          }
        }));
      }
      return _results;
    };

    return ReplacerService;

  })(Replacer);

}).call(this);
