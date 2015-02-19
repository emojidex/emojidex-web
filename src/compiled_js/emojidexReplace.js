/*
* emojidexReplace
*
* require: emojidex-client
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
      useUserEmoji: false,
      userNames: ['emoji', 'emojidex'],
      regexpUTF: '✅|🎭|🎵|🎶|💘|💡|💢|💤|💥|💧|💨|💩|💪|💫|💯|💲|💹|📈|📧|📩|🔀|🔁|🔄|🔇|🔉|🔖|🔗|🔙|🔚|🔛|🔜|🔝|🔡|🔢|🔣|🔤|🔥|🔲|🔳|🔵|🔶|🔷|🔸|🔹|🔺|🔻|🔽|🗤|🗥|🗧|🗨|🗩|🗪|🗫|🗬|🗭|🗯|🗯|🗱|🗵|🗶|🗷|🗸|🗹|↔|↖|↗|↘|↙|↪|⏬|▪|▫|◻|◼|☑|✔|✖|✳|✴|❌|➖|➗|⤴|⤵|⬛|⬜|⭐|⭕|💒|💓|💔|💕|💖|💗|💙|💚|💛|💜|💝|💞|💟|💦|💬|💭|💮|💱|📉|📊|📤|📥|📶|🔂|🔃|🔅|🔆|🔊|🔕|🔘|🔞|🔠|🔴|🔼|🔾|🔿|🗠|🗦|🗰|🗲|🗴|🚫|‼|⁉|↕|⏩|⏪|⏫|▶|◀|⚪|⚫|⛔|✨|❇|❎|❓|❔|❕|❗|❤|➕|➡|➰|⬅|⬆|⬇|〰|↩|◽|◾|☙|⛋|〽️|㊙|🅿|🆒|🆓|🆔|🆕|🆖|🆗|🆘|🆙|🆚|🇴|🇵|🇶|🇷|🇸|🇹|🇺|🇻|🇼|🇽|🇾|🇿|🇨🇳|🇩🇪|🇪🇸|🇫🇷|🇬🇧|🇮🇹|🇯🇵|🇰🇷|🇷🇺|🇺🇸|🈁|🈂|🈚|🈯|🈲|🈳|🈴|🈵|🈶|🈷|🈸|🈹|🈺|🉐|🉑|📲|🕅|🗕|🗖|🗗|🗙|🗚|🗛|🗜|🗝|🗞|🗟|🗳|🗺|🚩|🚬|🚮|🚱|🚹|🚺|🚻|🚾|#️⃣|️1️⃣|️2️⃣|️3️⃣|️4️⃣|️5️⃣|️6️⃣|️7️⃣|️8️⃣|️9️⃣|️0️⃣|™|Ⓜ️|♈|♉|♊|♋|♌|♍|♎|♓|♠|♣|♥|⚠|➿|🅰|🅱|🅾|🆎|🆑|🇦|🇧|🇨|🇩|🇪|🇫|🇬|🇭|🇮|🇯|🇰|🇱|🇲|🇳|📳|📴|📵|🔟|🕉|🕲|🗘|🚭|🚯|🚰|🚳|🚷|🚸|🚼|🛂|🛃|🛄|🛅|©|®|ℹ|♏|♐|♑|♒|♦|♻|♿|⛎|✡|㊗|🕀|🕁|🕂|🕃|🕄|☊|☋|☌|☍|☠|☡|☢|☣|☤|☥|☦|☧|☨|☩|☪|☫|☬|☭|☮|☯|☰|☱|☲|☳|☴|☵|☶|☷|☸|☿|♀|♁|♂|♃|♄|♅|♆|♇|♔|♕|♖|♗|♘|♙|♚|♛|♜|♝|♞|♟|♩|♬|♭|♮|♯|♰|♱|♳|♴|♵|♶|♷|♸|♹|♺|♼|♽|⚆|⚇|⚈|⚉|⚊|⚋|⚌|⚍|⚎|⚏|⚒|⚔|⚕|⚖|⚗|⚘|⚙|⚛|⚜|⚝|⚞|⚟|⚢|⚣|⚤|⚥|⚦|⚧|⚨|⚩|⚭|⚮|⚯|⚱|⚲|⚳|⚴|⚵|⚶|⚷|⚸|⚹|⚺|⚻|⚼|⛇|⛌|⛍|⛏|⛐|⛑|⛒|⛓|⛕|⛖|⛗|⛘|⛙|⛚|⛛|⛜|⛝|⛞|⛟|⛠|⛡|⛣|⛤|⛧|⛭|⛮|⛯|⛶|⛼|⛿|🌬|🎅|🏂|🏃|🏄|🏇|🏊|🏋|🏌|🏍|🏎|👀|👁|👂|👃|🗢|👅|👣|👦|👧|👨|👩|👪|👫|👬|👭|👮|👯|👱|👲|👴|👵|👶|👸|👻|👼|👽|👾|👿|💀|💁|💂|💃|💆|💇|💏|🗣|🚴|🚶|👤|👥|👰|👳|👷|👹|👺|💑|🕴|🕵|🚵|⛸|⛹|😂🏾|😋🏾|😙🏾|😚🏾|😛🏾|😠🏾|😢🏾|😥🏾|😩🏾|😪🏾|😭🏾|😯🏾|😱🏾|😳🏾|😷🏾|😂🏿|😃🏿|😉🏿|😉🏾|😊🏿|😋🏿|😓🏿|😔🏿|😗🏿|😙🏿|😚🏿|😛🏿|😟🏿|😠🏿|😢🏿|😤🏿|😥🏿|😨🏿|😩🏿|😪🏿|😬🏿|😭🏿|😯🏿|😱🏿|😳🏿|😴🏿|😷🏿|😒🏾|😒🏿|☺🏾|☺🏿|😌🏾|😌🏿|😁🏾|😁🏿|😏🏾|😏🏿|😄🏾|😄🏿|😆🏾|😆🏿|😃🏾|😇🏾|😊🏾|😎🏾|😐🏾|😑🏾|😓🏾|😔🏾|😕🏾|😖🏾|😗🏾|😞🏾|😟🏾|😣🏾|😤🏾|😦🏾|😧🏾|😨🏾|😫🏾|😬🏾|😮🏾|😰🏾|😲🏾|😴🏾|😵🏾|😶🏾|😇🏿|😎🏿|😐🏿|😑🏿|😕🏿|😖🏿|😞🏿|😣🏿|😦🏿|😧🏿|😫🏿|😮🏿|😰🏿|😲🏿|😵🏿|😶🏿|😅🏾|😅🏿|😘🏾|😘🏿|😝🏾|😝🏿|😜🏾|😜🏿|😍🏾|😍🏿|😁🏽|😀|😁|😂|😃|😄|😅|😆|😇|😈|😉|😊|😋|😌|😍|😎|😏|😑|😒|😓|😔|😕|😖|😗|😜|😝|😞|😟|😠|😡|😢|😣|😤|😦|😧|😨|😩|😪|😫|😬|😭|😯|😰|😱|😲|😳|😴|😵|😶|😷|😹|😼|☺|😐|😘|😙|😚|😛|😥|😮|😸|😺|😻|😽|😾|😿|🙀|☹|☻|🌀|🌁|🌂|🌃|🌄|🌅|🌆|🌇|🌈|🌉|🌊|🌋|🌍|🌎|🌏|🌐|☽|☾|🌡|🌢|🌣|🌤|🌥|🌦|🌧|🌨|🌩|🌪|🌫|🌰|🌱|🌲|🌳|🌴|🌵|🌶|🌷|🌸|🌹|🌺|🌻|🌼|🌾|🌿|🍀|🍁|🍂|🍃|🏔|🐀|🐁|🐂|🐃|🐄|🐅|🐆|🐇|🐈|🐉|🐊|🐋|🐌|🐍|🐎|🐏|🐐|🐑|🐒|🐓|🐔|🐕|🐖|🐗|🐘|🐙|🐚|🐛|🐜|🐝|🐞|🐟|🐠|🐡|🐢|🐣|🐤|🐥|🐦|🐧|🐨|🐩|🐪|🐫|🐬|🐭|🐮|🐯|🐰|🐱|🐲|🐳|🐴|🐵|🐶|🐷|🐸|🐹|🐺|🐻|🐼|🐽|🐾|🐿|🕷|🗻|🗾|☀|☁|⚡|⛄|🕊|🕸|☔|⛅|❄|☄|★|☈|☼|⛳|⛺|✉|🃏|🎀|🎁|🎃|🎄|🎆|🎇|🎈|🎉|🎊|🎋|🎌|🎍|🎎|🎏|🎐|🎑|🎒|🎓|🎔|🎕|🎖|🎗|🎘|🎙|🎚|🎛|🎜|🎝|🎞|🎟|🎠|🎡|🎢|🎣|🎤|🎥|🎦|🎧|🎨|🎩|🎪|🎫|🎬|🎮|🎯|🎰|🎱|🎲|🎳|🎴|🎷|🎸|🎹|🎺|🎻|🎼|🎽|🎾|🎿|🏀|🏁|🏅|🏆|🏈|🏉|🏕|🏖|🏗|🏘|🏙|🏚|🏛|🏱|🏲|🏳|🏴|🏵|🏶|🏷|👑|👒|👓|👔|👕|👖|👗|👘|👙|👚|👛|👜|👝|👞|👟|👠|👡|👢|💄|💅|💈|💉|💊|💋|💍|💎|💐|💰|💳|💴|💵|💶|💷|💺|💻|💼|💽|💾|💿|📀|📁|📅|📆|📇|📋|📌|📎|📒|📓|📔|📖|📘|📙|📚|📛|📜|📝|📟|📠|📡|📢|📣|📦|📫|📭|📮|📯|📰|📱|📷|📹|📺|📻|📼|🔈|🔋|🔌|🔍|🔎|🔐|🔑|🔒|🔓|🔔|🔰|🔱|🕐|🕑|🕒|🕓|🕔|🕕|🕖|🕗|🕘|🕙|🕚|🕛|🕜|🕝|🕞|🕟|🕠|🕡|🕢|🕣|🕤|🕫|🕬|🕯|🕱|🕳|🕹|🕻|🕼|🕽|🕾|🕿|🖀|🖁|🖄|🖆|🖊|🖋|🖧|🖨|🖪|🖫|🖬|🖲|🖴|🖵|🖶|🖷|🖺|🖿|🗀|🗀|🗃|🗄|🗅|🗈|🗉|🗊|🗌|🗍|🗎|🗏|🗐|🗑|🗼|🗿|🚧|🚪|🚽|🚿|🛀|🛁|⌚️|⌛|⏳|☎|☕|⚽|⚾|✂|✏|✒|🀄|💌|💸|📂|📃|📄|📍|📏|📐|📑|📕|📗|📞|📨|📪|📬|📸|📽|📾|🔏|🔮|🔯|🕄|🕆|🕇|🕈|🕥|🕦|🕧|🕨|🕩|🕪|🕭|🕰|🕶|🖂|🖃|🖅|🖇|🖈|🖉|🖌|🖍|🖥|🖦|🖩|🖭|🖮|🖯|🖰|🖱|🖳|🖸|🖹|🖻|🖼|🖽|🖾|🗂|🗆|🗇|🗋|🗒|🗓|🗔|🗽|🚥|🚦|🚨|⏰|☖|☗|⚀|⚁|⚂|⚃|⚄|⚅|⚰|⛀|⛁|⛂|⛃|⛉|⛊|💣|🔦|🔧|🔨|🔪|🔫|🔭|🔩|🔬|🗡|✌|👆|👇|👈|👉|👊|👋|👌|👍|👎|👏|🖎|🖏|🖒|🖔|🙊|👐|🖐|🖑|🖓|🖗|🖘|🖙|🖚|🖛|🖜|🖝|🖞|🖟|🖠|🖡|🖢|🖣|🙅|🙆|🙇|🙈|🙉|🙋|🙌|🙍|🙎|🙏|☝|✊|✋|🖖|☚|☛|🚂|🚄|🚅|🚔|🚕|🚘|🚛|🚞|🚟|🚠|🚡|🚀|🚁|🚃|🚆|🚇|🚈|🚉|🚊|🚋|🚌|🚍|🚎|🚏|🚐|🚑|🚒|🚓|🚖|🚗|🚙|🚚|🚜|🚝|🚢|🚣|🚤|🚲|⚓|⛵|✈|🌽|🍄|🍅|🍆|🍇|🍈|🍉|🍊|🍋|🍌|🍍|🍎|🍏|🍐|🍑|🍒|🍓|🍔|🍕|🍖|🍗|🍘|🍙|🍚|🍛|🍜|🍝|🍞|🍟|🍠|🍡|🍢|🍣|🍤|🍥|🍦|🍧|🍨|🍩|🍪|🍫|🍬|🍭|🍮|🍯|🍰|🍱|🍲|🍳|🍴|🍵|🍶|🍷|🍸|🍹|🍺|🍻|🍼|🍽|🎂|⛲|⛽|🏜|🏝|🏞|🏟|🏠|🏡|🏢|🏣|🏤|🏥|🏦|🏧|🏨|🏩|🏪|🏫|🏬|🏭|🏮|🏯|🏰|⛪|♨|⛩|⛬|⛱|🌌|🌒|🌔|🌖|🌘|🌙|🌚|🌛|🌜|🌝|🌞|🌟|🌠|🌕|🌑'
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.EC = new EmojidexClient;
        this.replacer = new ReplacerUser(this);
        this.replacer.loadEmoji();
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

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return "<img      class='emojidex-emoji'      src='" + this.plugin.options.cdnURL + "/" + this.plugin.options.sizeCode + "/" + emoji_code + ".png'      title='" + (emoji_code.replace(/_/g, ' ')) + "'    ></img>";
    };

    Replacer.prototype.getLoadingTag = function(emoji_data, type) {
      return "<img      class='emojidex-loading-icon'      data-emoji='" + emoji_data + "'      data-type='" + type + "'    ></img>";
    };

    Replacer.prototype.getLoadingElement = function(element) {
      return $(element.find('.emojidex-loading-icon'));
    };

    Replacer.prototype.setLoadingTag = function(plugin) {
      var _this = this;
      return plugin.element.find(":not(iframe,textarea,script)").andSelf().contents().filter(function(index, element) {
        if (element.nodeType === Node.TEXT_NODE) {
          return $(element).replaceWith(_this.getTextWithLoadingTag(element.textContent));
        }
      });
    };

    Replacer.prototype.getTextWithLoadingTag = function(text) {
      var _this = this;
      text = text.replace(RegExp(this.plugin.options.regexpUTF, "g"), function(matched_string) {
        return _this.getLoadingTag(matched_string, 'utf');
      });
      return text = text.replace(/:([^:]+):/g, function(matched_string, pattern1) {
        return _this.getLoadingTag(matched_string, 'code');
      });
    };

    Replacer.prototype.fadeOutLoadingTag_fadeInEmojiTag = function(element, emoji_code, matched) {
      var emoji_tag;
      if (matched == null) {
        matched = true;
      }
      if (matched) {
        emoji_tag = $(this.getEmojiTag(emoji_code)).hide();
      } else {
        emoji_tag = $(emoji_code).hide();
      }
      return element.after(emoji_tag).fadeOut("normal", function() {
        return emoji_tag.fadeIn("fast");
      });
    };

    Replacer.prototype.replaceSpaceToUnder = function(string) {
      return string.replace(/\s/g, '_');
    };

    return Replacer;

  })();

  ReplacerSearch = (function(_super) {
    __extends(ReplacerSearch, _super);

    function ReplacerSearch(plugin) {
      this.plugin = plugin;
      ReplacerSearch.__super__.constructor.apply(this, arguments);
    }

    ReplacerSearch.prototype.loadEmoji = function() {
      var searchEmoji_setEmojiTag,
        _this = this;
      searchEmoji_setEmojiTag = function(element) {
        var loading_element, loading_elements, replaceToEmojiIcon, _i, _len, _results;
        replaceToEmojiIcon = function(type, loading_element, term) {
          return _this.plugin.EC.Search.search(term, function(emoji_data) {
            var emoji, _i, _len, _results;
            if (emoji_data.length !== 0) {
              _results = [];
              for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
                emoji = emoji_data[_i];
                switch (type) {
                  case 'code':
                    if (_this.replaceSpaceToUnder(emoji.code) === term) {
                      _results.push(_this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, term));
                    } else {
                      _results.push(void 0);
                    }
                    break;
                  case 'utf':
                    if (emoji.moji === term) {
                      _results.push(_this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, emoji.code.replace(/\s/g, "_")));
                    } else {
                      _results.push(void 0);
                    }
                    break;
                  default:
                    _results.push(void 0);
                }
              }
              return _results;
            } else {
              switch (type) {
                case 'code':
                  return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, "<span>:" + term + ":</span>", false);
                case 'utf':
                  return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, "<span>" + term + "</span>", false);
              }
            }
          });
        };
        loading_elements = _this.getLoadingElement(element);
        _results = [];
        for (_i = 0, _len = loading_elements.length; _i < _len; _i++) {
          loading_element = loading_elements[_i];
          switch (loading_element.dataset.type) {
            case 'code':
              _results.push(replaceToEmojiIcon(loading_element.dataset.type, $(loading_element), loading_element.dataset.emoji.replace(/:/g, '')));
              break;
            case 'utf':
              _results.push(replaceToEmojiIcon(loading_element.dataset.type, $(loading_element), loading_element.dataset.emoji));
              break;
            default:
              _results.push(void 0);
          }
        }
        return _results;
      };
      this.setLoadingTag(this.plugin);
      return searchEmoji_setEmojiTag(this.plugin.element);
    };

    return ReplacerSearch;

  })(Replacer);

  ReplacerUser = (function(_super) {
    __extends(ReplacerUser, _super);

    function ReplacerUser(plugin) {
      this.plugin = plugin;
      this.onLoadEmojiData = __bind(this.onLoadEmojiData, this);
      ReplacerUser.__super__.constructor.apply(this, arguments);
    }

    ReplacerUser.prototype.loadEmoji = function() {
      return this.getUserEmojiData(this.plugin.options.userNames, this.onLoadEmojiData);
    };

    ReplacerUser.prototype.getUserEmojiData = function(user_names, callback) {
      var emoji_data, loaded_num, name, names, _i, _len, _results;
      loaded_num = 0;
      names = user_names;
      emoji_data = [];
      _results = [];
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        _results.push($.ajax({
          url: "https://www.emojidex.com/api/v1/users/" + name + "/emoji",
          dataType: 'json',
          type: 'get',
          success: function(user_emoji_json, status, xhr) {
            emoji_data = emoji_data.concat(user_emoji_json.emoji);
            if (++loaded_num === names.length) {
              return callback(emoji_data);
            }
          },
          error: function(data) {
            console.log('error: load json');
            return console.log(data);
          }
        }));
      }
      return _results;
    };

    ReplacerUser.prototype.onLoadEmojiData = function(emoji_data) {
      var _this = this;
      this.emoji_data = emoji_data;
      this.emoji_regexps = this.getEmojiRegexps(emoji_data);
      return this.plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().filter(function(index, element) {
        if (element.nodeType === Node.TEXT_NODE) {
          return $(element).replaceWith(_this.getTextWithEomojiTag(element.textContent));
        }
      });
    };

    ReplacerUser.prototype.getEmojiRegexps = function(emoji_data) {
      var continuous_list, continuous_utf_emoji, emoji, index_after, index_before, list_hash, pattern_code, pattern_utf, utf, _i, _j, _k, _len, _len1, _len2;
      pattern_utf = '';
      pattern_code = ':(';
      continuous_utf_emoji = [];
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        if (emoji.moji != null) {
          if (this.utfCharAt(emoji.moji, 1) !== '') {
            continuous_utf_emoji.push({
              emoji: emoji,
              first: this.utfCharAt(emoji.moji, 0)
            });
          } else {
            pattern_utf += emoji.moji + '|';
          }
        }
        if (emoji.code != null) {
          pattern_code += this.replaceSpaceToUnder(emoji.code) + '|';
        }
      }
      continuous_list = {};
      for (_j = 0, _len1 = continuous_utf_emoji.length; _j < _len1; _j++) {
        utf = continuous_utf_emoji[_j];
        if (-1 !== pattern_utf.indexOf(utf.first)) {
          if (continuous_list[utf.first] == null) {
            continuous_list[utf.first] = [utf];
          } else {
            continuous_list[utf.first].push(utf);
          }
        }
      }
      for (list_hash in continuous_list) {
        index_before = pattern_utf.indexOf(list_hash);
        index_after = pattern_utf.indexOf('|', pattern_utf.indexOf(list_hash));
        pattern_utf = pattern_utf.slice(0, index_before) + pattern_utf.slice(index_after + 1);
      }
      for (_k = 0, _len2 = continuous_utf_emoji.length; _k < _len2; _k++) {
        utf = continuous_utf_emoji[_k];
        pattern_utf += utf.emoji.moji + '|';
      }
      for (list_hash in continuous_list) {
        pattern_utf += list_hash + '|';
      }
      return {
        utf: RegExp(pattern_utf.slice(0, -1), 'g'),
        code: RegExp(pattern_code.slice(0, -1) + "):", 'g')
      };
    };

    ReplacerUser.prototype.getTextWithEomojiTag = function(text) {
      var _this = this;
      text = text.replace(this.emoji_regexps.utf, function(matched_string) {
        var emoji, _i, _len, _ref;
        _ref = _this.emoji_data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          emoji = _ref[_i];
          if (emoji.moji === matched_string) {
            return _this.getEmojiTag(_this.replaceSpaceToUnder(emoji.code));
          }
        }
      });
      return text = text.replace(this.emoji_regexps.code, function(matched_string, pattern1) {
        var emoji, _i, _len, _ref;
        _ref = _this.emoji_data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          emoji = _ref[_i];
          if (_this.replaceSpaceToUnder(emoji.code) === pattern1) {
            return _this.getEmojiTag(pattern1);
          }
        }
      });
    };

    ReplacerUser.prototype.utfCharAt = function(string, index) {
      var end, li, re, surrogatePairs;
      re = '';
      string += '';
      end = string.length;
      surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      while (surrogatePairs.exec(string) !== null) {
        li = surrogatePairs.lastIndex;
        if (li - 2 < index) {
          index++;
        } else {
          break;
        }
      }
      if (index >= end || index < 0) {
        return '';
      }
      re += string.charAt(index);
      if (/[\uD800-\uDBFF]/.test(re) && /[\uDC00-\uDFFF]/.test(string.charAt(index + 1))) {
        re += string.charAt(index + 1);
      }
      return re;
    };

    return ReplacerUser;

  })(Replacer);

  window.eutf = "😙🏾😚🏾😛🏾😠🏾😢🏾😥🏾😩🏾😯🏾😂🏿😃🏿😉🏿😉🏾😊🏿😋🏿😓🏿";

}).call(this);
