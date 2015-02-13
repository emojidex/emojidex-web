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
  var Replacer, ReplacerSearch, ReplacerUser,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexReplace";
    defaults = {
      apiURL: 'https://www.emojidex.com/api/v1',
      cdnURL: 'http://cdn.emojidex.com/emoji',
      sizeCode: 'px32',
      userNames: ['emoji', 'emojidex'],
      loadingIcon: true,
      regexpUTF: '✅|🎭|🎵|🎶|💘|💡|💢|💤|💥|💧|💨|💩|💪|💫|💯|💲|💹|📈|📧|📩|🔀|🔁|🔄|🔇|🔉|🔖|🔗|🔙|🔚|🔛|🔜|🔝|🔡|🔢|🔣|🔤|🔥|🔲|🔳|🔵|🔶|🔷|🔸|🔹|🔺|🔻|🔽|🗤|🗥|🗧|🗨|🗩|🗪|🗫|🗬|🗭|🗯|🗯|🗱|🗵|🗶|🗷|🗸|🗹|↔|↖|↗|↘|↙|↪|⏬|▪|▫|◻|◼|☑|✔|✖|✳|✴|❌|➖|➗|⤴|⤵|⬛|⬜|⭐|⭕|💒|💓|💔|💕|💖|💗|💙|💚|💛|💜|💝|💞|💟|💦|💬|💭|💮|💱|📉|📊|📤|📥|📶|🔂|🔃|🔅|🔆|🔊|🔕|🔘|🔞|🔠|🔴|🔼|🔾|🔿|🗠|🗦|🗰|🗲|🗴|🚫|‼|⁉|↕|⏩|⏪|⏫|▶|◀|⚪|⚫|⛔|✨|❇|❎|❓|❔|❕|❗|❤|➕|➡|➰|⬅|⬆|⬇|〰|↩|◽|◾|☙|⛋|〽️|㊙|🅿|🆒|🆓|🆔|🆕|🆖|🆗|🆘|🆙|🆚|🇴|🇵|🇶|🇷|🇸|🇹|🇺|🇻|🇼|🇽|🇾|🇿|🇨🇳|🇩🇪|🇪🇸|🇫🇷|🇬🇧|🇮🇹|🇯🇵|🇰🇷|🇷🇺|🇺🇸|🈁|🈂|🈚|🈯|🈲|🈳|🈴|🈵|🈶|🈷|🈸|🈹|🈺|🉐|🉑|📲|🕅|🗕|🗖|🗗|🗙|🗚|🗛|🗜|🗝|🗞|🗟|🗳|🗺|🚩|🚬|🚮|🚱|🚹|🚺|🚻|🚾|#️⃣|️1️⃣|️2️⃣|️3️⃣|️4️⃣|️5️⃣|️6️⃣|️7️⃣|️8️⃣|️9️⃣|️0️⃣|™|Ⓜ️|♈|♉|♊|♋|♌|♍|♎|♓|♠|♣|♥|⚠|➿|🅰|🅱|🅾|🆎|🆑|🇦|🇧|🇨|🇩|🇪|🇫|🇬|🇭|🇮|🇯|🇰|🇱|🇲|🇳|📳|📴|📵|🔟|🕉|🕲|🗘|🚭|🚯|🚰|🚳|🚷|🚸|🚼|🛂|🛃|🛄|🛅|©|®|ℹ|♏|♐|♑|♒|♦|♻|♿|⛎|✡|㊗|🕀|🕁|🕂|🕃|🕄|☊|☋|☌|☍|☠|☡|☢|☣|☤|☥|☦|☧|☨|☩|☪|☫|☬|☭|☮|☯|☰|☱|☲|☳|☴|☵|☶|☷|☸|☿|♀|♁|♂|♃|♄|♅|♆|♇|♔|♕|♖|♗|♘|♙|♚|♛|♜|♝|♞|♟|♩|♬|♭|♮|♯|♰|♱|♳|♴|♵|♶|♷|♸|♹|♺|♼|♽|⚆|⚇|⚈|⚉|⚊|⚋|⚌|⚍|⚎|⚏|⚒|⚔|⚕|⚖|⚗|⚘|⚙|⚛|⚜|⚝|⚞|⚟|⚢|⚣|⚤|⚥|⚦|⚧|⚨|⚩|⚭|⚮|⚯|⚱|⚲|⚳|⚴|⚵|⚶|⚷|⚸|⚹|⚺|⚻|⚼|⛇|⛌|⛍|⛏|⛐|⛑|⛒|⛓|⛕|⛖|⛗|⛘|⛙|⛚|⛛|⛜|⛝|⛞|⛟|⛠|⛡|⛣|⛤|⛧|⛭|⛮|⛯|⛶|⛼|⛿|🌬|🎅|🏂|🏃|🏄|🏇|🏊|🏋|🏌|🏍|🏎|👀|👁|👂|👃|🗢|👅|👣|👦|👧|👨|👩|👪|👫|👬|👭|👮|👯|👱|👲|👴|👵|👶|👸|👻|👼|👽|👾|👿|💀|💁|💂|💃|💆|💇|💏|🗣|🚴|🚶|👤|👥|👰|👳|👷|👹|👺|💑|🕴|🕵|🚵|⛸|⛹|😂🏾|😋🏾|😙🏾|😚🏾|😛🏾|😠🏾|😢🏾|😥🏾|😩🏾|😪🏾|😭🏾|😯🏾|😱🏾|😳🏾|😷🏾|😂🏿|😃🏿|😉🏿|😉🏾|😊🏿|😋🏿|😓🏿|😔🏿|😗🏿|😙🏿|😚🏿|😛🏿|😟🏿|😠🏿|😢🏿|😤🏿|😥🏿|😨🏿|😩🏿|😪🏿|😬🏿|😭🏿|😯🏿|😱🏿|😳🏿|😴🏿|😷🏿|😒🏾|😒🏿|☺🏾|☺🏿|😌🏾|😌🏿|😁🏾|😁🏿|😏🏾|😏🏿|😄🏾|😄🏿|😆🏾|😆🏿|😃🏾|😇🏾|😊🏾|😎🏾|😐🏾|😑🏾|😓🏾|😔🏾|😕🏾|😖🏾|😗🏾|😞🏾|😟🏾|😣🏾|😤🏾|😦🏾|😧🏾|😨🏾|😫🏾|😬🏾|😮🏾|😰🏾|😲🏾|😴🏾|😵🏾|😶🏾|😇🏿|😎🏿|😐🏿|😑🏿|😕🏿|😖🏿|😞🏿|😣🏿|😦🏿|😧🏿|😫🏿|😮🏿|😰🏿|😲🏿|😵🏿|😶🏿|😅🏾|😅🏿|😘🏾|😘🏿|😝🏾|😝🏿|😜🏾|😜🏿|😍🏾|😍🏿|😁🏽|😀|😁|😂|😃|😄|😅|😆|😇|😈|😉|😊|😋|😌|😍|😎|😏|😑|😒|😓|😔|😕|😖|😗|😜|😝|😞|😟|😠|😡|😢|😣|😤|😦|😧|😨|😩|😪|😫|😬|😭|😯|😰|😱|😲|😳|😴|😵|😶|😷|😹|😼|☺|😐|😘|😙|😚|😛|😥|😮|😸|😺|😻|😽|😾|😿|🙀|☹|☻|🌀|🌁|🌂|🌃|🌄|🌅|🌆|🌇|🌈|🌉|🌊|🌋|🌍|🌎|🌏|🌐|☽|☾|🌡|🌢|🌣|🌤|🌥|🌦|🌧|🌨|🌩|🌪|🌫|🌰|🌱|🌲|🌳|🌴|🌵|🌶|🌷|🌸|🌹|🌺|🌻|🌼|🌾|🌿|🍀|🍁|🍂|🍃|🏔|🐀|🐁|🐂|🐃|🐄|🐅|🐆|🐇|🐈|🐉|🐊|🐋|🐌|🐍|🐎|🐏|🐐|🐑|🐒|🐓|🐔|🐕|🐖|🐗|🐘|🐙|🐚|🐛|🐜|🐝|🐞|🐟|🐠|🐡|🐢|🐣|🐤|🐥|🐦|🐧|🐨|🐩|🐪|🐫|🐬|🐭|🐮|🐯|🐰|🐱|🐲|🐳|🐴|🐵|🐶|🐷|🐸|🐹|🐺|🐻|🐼|🐽|🐾|🐿|🕷|🗻|🗾|☀|☁|⚡|⛄|🕊|🕸|☔|⛅|❄|☄|★|☈|☼|⛳|⛺|✉|🃏|🎀|🎁|🎃|🎄|🎆|🎇|🎈|🎉|🎊|🎋|🎌|🎍|🎎|🎏|🎐|🎑|🎒|🎓|🎔|🎕|🎖|🎗|🎘|🎙|🎚|🎛|🎜|🎝|🎞|🎟|🎠|🎡|🎢|🎣|🎤|🎥|🎦|🎧|🎨|🎩|🎪|🎫|🎬|🎮|🎯|🎰|🎱|🎲|🎳|🎴|🎷|🎸|🎹|🎺|🎻|🎼|🎽|🎾|🎿|🏀|🏁|🏅|🏆|🏈|🏉|🏕|🏖|🏗|🏘|🏙|🏚|🏛|🏱|🏲|🏳|🏴|🏵|🏶|🏷|👑|👒|👓|👔|👕|👖|👗|👘|👙|👚|👛|👜|👝|👞|👟|👠|👡|👢|💄|💅|💈|💉|💊|💋|💍|💎|💐|💰|💳|💴|💵|💶|💷|💺|💻|💼|💽|💾|💿|📀|📁|📅|📆|📇|📋|📌|📎|📒|📓|📔|📖|📘|📙|📚|📛|📜|📝|📟|📠|📡|📢|📣|📦|📫|📭|📮|📯|📰|📱|📷|📹|📺|📻|📼|🔈|🔋|🔌|🔍|🔎|🔐|🔑|🔒|🔓|🔔|🔰|🔱|🕐|🕑|🕒|🕓|🕔|🕕|🕖|🕗|🕘|🕙|🕚|🕛|🕜|🕝|🕞|🕟|🕠|🕡|🕢|🕣|🕤|🕫|🕬|🕯|🕱|🕳|🕹|🕻|🕼|🕽|🕾|🕿|🖀|🖁|🖄|🖆|🖊|🖋|🖧|🖨|🖪|🖫|🖬|🖲|🖴|🖵|🖶|🖷|🖺|🖿|🗀|🗀|🗃|🗄|🗅|🗈|🗉|🗊|🗌|🗍|🗎|🗏|🗐|🗑|🗼|🗿|🚧|🚪|🚽|🚿|🛀|🛁|⌚️|⌛|⏳|☎|☕|⚽|⚾|✂|✏|✒|🀄|💌|💸|📂|📃|📄|📍|📏|📐|📑|📕|📗|📞|📨|📪|📬|📸|📽|📾|🔏|🔮|🔯|🕄|🕆|🕇|🕈|🕥|🕦|🕧|🕨|🕩|🕪|🕭|🕰|🕶|🖂|🖃|🖅|🖇|🖈|🖉|🖌|🖍|🖥|🖦|🖩|🖭|🖮|🖯|🖰|🖱|🖳|🖸|🖹|🖻|🖼|🖽|🖾|🗂|🗆|🗇|🗋|🗒|🗓|🗔|🗽|🚥|🚦|🚨|⏰|☖|☗|⚀|⚁|⚂|⚃|⚄|⚅|⚰|⛀|⛁|⛂|⛃|⛉|⛊|💣|🔦|🔧|🔨|🔪|🔫|🔭|🔩|🔬|🗡|✌|👆|👇|👈|👉|👊|👋|👌|👍|👎|👏|🖎|🖏|🖒|🖔|🙊|👐|🖐|🖑|🖓|🖗|🖘|🖙|🖚|🖛|🖜|🖝|🖞|🖟|🖠|🖡|🖢|🖣|🙅|🙆|🙇|🙈|🙉|🙋|🙌|🙍|🙎|🙏|☝|✊|✋|🖖|☚|☛|🚂|🚄|🚅|🚔|🚕|🚘|🚛|🚞|🚟|🚠|🚡|🚀|🚁|🚃|🚆|🚇|🚈|🚉|🚊|🚋|🚌|🚍|🚎|🚏|🚐|🚑|🚒|🚓|🚖|🚗|🚙|🚚|🚜|🚝|🚢|🚣|🚤|🚲|⚓|⛵|✈|🌽|🍄|🍅|🍆|🍇|🍈|🍉|🍊|🍋|🍌|🍍|🍎|🍏|🍐|🍑|🍒|🍓|🍔|🍕|🍖|🍗|🍘|🍙|🍚|🍛|🍜|🍝|🍞|🍟|🍠|🍡|🍢|🍣|🍤|🍥|🍦|🍧|🍨|🍩|🍪|🍫|🍬|🍭|🍮|🍯|🍰|🍱|🍲|🍳|🍴|🍵|🍶|🍷|🍸|🍹|🍺|🍻|🍼|🍽|🎂|⛲|⛽|🏜|🏝|🏞|🏟|🏠|🏡|🏢|🏣|🏤|🏥|🏦|🏧|🏨|🏩|🏪|🏫|🏬|🏭|🏮|🏯|🏰|⛪|♨|⛩|⛬|⛱|🌌|🌒|🌔|🌖|🌘|🌙|🌚|🌛|🌜|🌝|🌞|🌟|🌠|🌕|🌑'
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.replacer_search = new ReplacerSearch(this);
        this.replacer_search.setLoadingIcon();
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

    Replacer.prototype.getEmojiTag = function(emoji_code, style) {
      return "<i class='emojidex-" + emoji_code + "' style='" + style + "'></i>";
    };

    return Replacer;

  })();

  ReplacerSearch = (function(_super) {
    __extends(ReplacerSearch, _super);

    function ReplacerSearch(plugin) {
      this.plugin = plugin;
      ReplacerSearch.__super__.constructor.apply(this, arguments);
    }

    ReplacerSearch.prototype.setLoadingIcon = function() {
      var new_text, searchEmoji, setLoadingTag, text_node, text_nodes, _i, _len,
        _this = this;
      searchEmoji = function(element) {
        var ec, loading_element, loading_elements, setEmojiIcon, _i, _len, _results;
        setEmojiIcon = function(loading_element, term) {
          return ec.Search.search(term, function(emoji_data) {
            var emoji, style, _i, _len, _results;
            if (emoji_data.length !== 0) {
              _results = [];
              for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
                emoji = emoji_data[_i];
                if (emoji.code.replace(/\s/g, "_") === term) {
                  style = "background-image: url(" + _this.plugin.options.cdnURL + "/" + _this.plugin.options.sizeCode + "/" + term + ".png)";
                  _results.push(loading_element.replaceWith(_this.getEmojiTag(term, style)));
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            } else {
              return loading_element.replaceWith(":" + term + ":");
            }
          });
        };
        ec = new EmojidexClient;
        loading_elements = element.find(".emojidex-loading-icon");
        _results = [];
        for (_i = 0, _len = loading_elements.length; _i < _len; _i++) {
          loading_element = loading_elements[_i];
          if (loading_element.dataset.type === 'code') {
            _results.push(setEmojiIcon($(loading_element), loading_element.dataset.emoji.replace(/:/g, '')));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      setLoadingTag = function(text) {
        var getImgTagWithEmojiData;
        getImgTagWithEmojiData = function(emoji_data, type) {
          return "<img class='emojidex-loading-icon' data-emoji='" + emoji_data + "' data-type='" + type + "'></img>";
        };
        text = text.replace(RegExp(_this.plugin.options.regexpUTF, "g"), function(matched_string) {
          return getImgTagWithEmojiData(matched_string, "utf");
        });
        return text = text.replace(/:([^:]+):/g, function(matched_string, pattern1) {
          return getImgTagWithEmojiData(matched_string, "code");
        });
      };
      text_nodes = this.plugin.element.find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      });
      for (_i = 0, _len = text_nodes.length; _i < _len; _i++) {
        text_node = text_nodes[_i];
        new_text = setLoadingTag(text_node.textContent);
        $(text_node).replaceWith(new_text);
      }
      return searchEmoji(this.plugin.element);
    };

    return ReplacerSearch;

  })(Replacer);

  ReplacerUser = (function() {
    function ReplacerUser() {
      this.onLoadEmojiData = __bind(this.onLoadEmojiData, this);
    }

    ReplacerUser.prototype.getEmojiRegexps = function(emoji_data) {
      var emoji, regexp_for_code, regexp_for_utf, _i, _len;
      regexp_for_utf = "";
      regexp_for_code = ":(";
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        if (emoji.moji != null) {
          regexp_for_utf += emoji.moji + "|";
        }
        if (emoji.code != null) {
          regexp_for_code += emoji.code + "|";
        }
      }
      return {
        utf: regexp_for_utf.slice(0, -1),
        code: regexp_for_code.slice(0, -1) + "):"
      };
    };

    ReplacerUser.prototype.replaceForUTF = function(options) {
      var replaced_string,
        _this = this;
      return replaced_string = options.text.replace(RegExp(options.regexp, "g"), function(matched_string) {
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

    ReplacerUser.prototype.replaceForCode = function(options) {
      var replaced_string,
        _this = this;
      return replaced_string = options.text.replace(RegExp(options.regexp, "g"), function(matched_string, pattern1) {
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

    ReplacerUser.prototype.getUserEmojiData = function(callback) {
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

    ReplacerUser.prototype.onLoadEmojiData = function(emoji_data) {
      var emoji, _i, _len;
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        emoji.code = emoji.code.replace(RegExp(" ", "g"), "_");
        emoji.img_url = "http://cdn.emojidex.com/emoji/px32/" + emoji.code + ".png";
      }
      this.emoji_data = emoji_data;
      this.emoji_regexps = this.sgetEmojiRegexps(emoji_data);
      this.setEmojiIcon(this);
      return typeof callback === "function" ? callback(this) : void 0;
    };

    ReplacerUser.prototype.setEmojiIcon = function(loader) {
      var loading_elements, replaceLoadingIcon, replaceTextNode,
        _this = this;
      replaceLoadingIcon = function(options) {
        var element, new_element, replaceUseFade, _base, _i, _len, _ref;
        replaceUseFade = function(element, new_element) {
          element.after(new_element.hide());
          return element.fadeOut("normal", function() {
            return new_element.fadeIn("fast");
          });
        };
        _ref = options.loading_elements;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          new_element = "";
          switch (element.dataset.type) {
            case 'utf':
              new_element = element.dataset.emoji.replace(RegExp(options.regexp_utf), function(matched_string) {
                return _this.getEmojiTag(matched_string);
              });
              break;
            case 'code':
              new_element = element.dataset.emoji.replace(RegExp(options.regexp_code), function(matched_string, pattern1) {
                return _this.getEmojiTag(pattern1);
              });
          }
          if (new_element.indexOf("<i class=") !== -1) {
            replaceUseFade($(element), $(new_element));
          } else {
            $(element).replaceWith(new_element);
          }
        }
        return typeof (_base = loader.options).onComplete === "function" ? _base.onComplete(_this.element) : void 0;
      };
      replaceTextNode = function(element) {
        var replaced_string, text_node, text_nodes, _base, _i, _len;
        text_nodes = $(element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
          return this.nodeType === Node.TEXT_NODE;
        });
        for (_i = 0, _len = text_nodes.length; _i < _len; _i++) {
          text_node = text_nodes[_i];
          replaced_string = text_node.textContent;
          if (loader.emoji_regexps.utf != null) {
            replaced_string = _this.replaceForUTF({
              text: replaced_string,
              regexp: loader.emoji_regexps.utf,
              emoji_data: loader.emoji_data
            });
          }
          if (loader.emoji_regexps.code != null) {
            replaced_string = _this.replaceForCode({
              text: replaced_string,
              regexp: loader.emoji_regexps.code,
              emoji_data: loader.emoji_data
            });
          }
          $(text_node).replaceWith(replaced_string);
        }
        return typeof (_base = loader.options).onComplete === "function" ? _base.onComplete(_this.element) : void 0;
      };
      if (loader.options.loadingIcon) {
        loading_elements = this.element.find(".emojidex-loading-icon");
        return replaceLoadingIcon({
          loading_elements: loading_elements,
          regexp_utf: loader.emoji_regexps.utf,
          regexp_code: loader.emoji_regexps.code
        });
      } else {
        return replaceTextNode(this.element);
      }
    };

    return ReplacerUser;

  })();

}).call(this);
