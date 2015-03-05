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
      onComplete: void 0,
      regexpUTF: /😧🏿|😙🏾|😠🏾|😢🏾|😥🏾|😩🏾|😯🏾|😂🏿|😃🏿|😉🏿|😉🏾|😊🏿|😋🏿|😓🏿|😔🏿|😗🏿|😙🏿|😚🏿|😛🏿|😟🏿|😠🏿|😢🏿|😤🏿|😥🏿|😨🏿|😩🏿|😪🏿|😬🏿|😭🏿|😯🏿|😱🏿|😳🏿|😴🏿|😷🏿|😒🏿|️9️⃣|😌🏿|😁🏾|😁🏿|😏🏿|😄🏾|😄🏿|😆🏾|😆🏿|😃🏾|😊🏾|😑🏾|😓🏾|😔🏾|😕🏾|😗🏾|😞🏾|😟🏾|😣🏾|😤🏾|😫🏾|😇🏿|😎🏿|😐🏿|😑🏿|😕🏿|😖🏿|😞🏿|😣🏿|😦🏿|😛🏾|😫🏿|😮🏿|😰🏿|😲🏿|😵🏿|😶🏿|😅🏿|😘🏿|😝🏾|😝🏿|😜🏾|😜🏿|😍🏿|😁🏽|😍🏾|😏🏾|😌🏾|😘🏾|😒🏾|😷🏾|😶🏾|😵🏾|😴🏾|😳🏾|😲🏾|😱🏾|😰🏾|😮🏾|😭🏾|😬🏾|😪🏾|😨🏾|😧🏾|😦🏾|😖🏾|😎🏾|😐🏾|😇🏾|😋🏾|😂🏾|😅🏾|️8️⃣|🇨🇳|🇩🇪|🇪🇸|🇫🇷|🇬🇧|🇮🇹|🇯🇵|🇰🇷|🇷🇺|🇺🇸|😚🏾|️7️⃣|️1️⃣|️2️⃣|️3️⃣|️4️⃣|️5️⃣|️6️⃣|️0️⃣|#️⃣|☺🏾|☺🏿|🇵|🇶|🇷|🇸|🇹|🇺|🇻|🇼|🇽|🇾|🇿|🔌|🌑|🌕|🕄|🕃|🕂|🕁|🕀|〽️|🖖|🈁|🈂|🈚|🈯|🈲|🈳|🈴|🈵|🈶|🈷|🈸|🈹|🈺|🉐|🉑|🌀|🌁|🌂|🌃|🌄|🌅|🌆|🌇|🌈|🌉|🌊|🌋|🌌|🌍|🌎|🌏|🌐|🌒|🛅|🌔|🌖|🛄|🌘|🌙|🌚|🌛|🌜|🌝|🌞|🌟|🌠|🌡|🌢|🌣|🌤|🌥|🌦|🌧|🌨|🌩|🌪|🌫|🌬|🌰|🌱|🌲|🌳|🌴|🌵|🌶|🌷|🌸|🌹|🌺|🌻|🌼|🌽|🌾|🌿|🍀|🍁|🍂|🍃|🍄|🍅|🍆|🍇|🍈|🍉|🍊|🍋|🍌|🍍|🍎|🍏|🍐|🍑|🍒|🍓|🍔|🍕|🍖|🍗|🍘|🍙|🍚|🍛|🍜|🍝|🍞|🍟|🍠|🍡|🍢|🍣|🍤|🍥|🍦|🍧|🍨|🍩|🍪|🍫|🍬|🍭|🍮|🍯|🍰|🍱|🍲|🍳|🍴|🍵|🍶|🍷|🍸|🍹|🍺|🍻|🍼|🍽|🎀|🎁|🎂|🎃|🎄|🎅|🎆|🎇|🎈|🎉|🎊|🎋|🎌|🎍|🎎|🎏|🎐|🎑|🎒|🎓|🎔|🎕|🎖|🎗|🎘|🎙|🎚|🎛|🎜|🎝|🎞|🎟|🎠|🎡|🎢|🎣|🎤|🎥|🎦|🎧|🎨|🎩|🎪|🎫|🎬|🎭|🎮|🎯|🎰|🎱|🎲|🎳|🎴|🎵|🎶|🎷|🎸|🎹|🎺|🎻|🎼|🎽|🎾|🎿|🏀|🏁|🏂|🏃|🏄|🏅|🏆|🏇|🏈|🏉|🏊|🏋|🏌|🏍|🏎|🏔|🏕|🏖|🏗|🏘|🏙|🏚|🏛|🏜|🏝|🏞|🏟|🏠|🏡|🏢|🏣|🏤|🏥|🏦|🏧|🏨|🏩|🏪|🏫|🏬|🏭|🏮|🏯|🏰|🏱|🏲|🏳|🏴|🏵|🏶|🏷|🐀|🐁|🐂|🐃|🐄|🐅|🐆|🐇|🐈|🐉|🐊|🐋|🐌|🐍|🐎|🐏|🐐|🐑|🐒|🐓|🐔|🐕|🐖|🐗|🐘|🐙|🐚|🐛|🐜|🐝|🐞|🐟|🐠|🐡|🐢|🐣|🐤|🐥|🐦|🐧|🐨|🐩|🐪|🐫|🐬|🐭|🐮|🐯|🐰|🐱|🐲|🐳|🐴|🐵|🐶|🐷|🐸|🐹|🐺|🐻|🐼|🐽|🐾|🐿|👀|👁|👂|👃|🗢|👅|👆|👇|👈|👉|👊|👋|👌|👍|👎|👏|👑|👒|👓|👔|👕|👖|👗|👘|👙|👚|👛|👜|👝|👞|👟|👠|👡|👢|👣|👦|👧|👨|👩|👪|👫|👬|👭|👮|👯|👱|👲|👴|👵|👶|👸|👻|👼|👽|👾|👿|💀|💁|💂|💃|💄|💅|💆|💇|💈|💉|💊|💋|💍|💎|💏|💐|💘|💡|💢|💣|💤|💥|💧|💨|💩|💪|💫|💯|💰|💲|💳|💴|💵|💶|💷|💹|💺|💻|💼|💽|💾|💿|📀|📁|📅|📆|📇|📈|📋|📌|📎|📒|📓|📔|📖|📘|📙|📚|📛|📜|📝|📟|📠|📡|📢|📣|📦|📧|📩|📫|📭|📮|📯|📰|📱|📲|📷|📹|📺|📻|📼|🔀|🔁|🔄|🔇|🔈|🔉|🔋|🃏|🔍|🔎|🔐|🔑|🔒|🔓|🔔|🔖|🔗|🔙|🔚|🔛|🔜|🔝|🔡|🔢|🔣|🔤|🔥|🔦|🔧|🔨|🔪|🔫|🔭|🔰|🔱|🔲|🔳|🔵|🔶|🔷|🔸|🔹|🔺|🔻|🔽|🕅|🕐|🕑|🕒|🕓|🕔|🕕|🕖|🕗|🕘|🕙|🕚|🕛|🕜|🕝|🕞|🕟|🕠|🕡|🕢|🕣|🕤|🕫|🕬|🕯|🕱|🕳|🕷|🕹|🕻|🕼|🕽|🕾|🕿|🖀|🖁|🖄|🖆|🖊|🖋|🖎|🖏|🖒|🖔|🖧|🖨|🖪|🖫|🖬|🖲|🖴|🖵|🖶|🖷|🖺|🖿|🗀|🗀|🗃|🗄|🗅|🗈|🗉|🗊|🗌|🗍|🗎|🗏|🗐|🗑|🗕|🗖|🗗|🗙|🗚|🗛|🗜|🗝|🗞|🗟|🗣|🗤|🗥|🗧|🗨|🗩|🗪|🗫|🗬|🗭|🗯|🗯|🗱|🗳|🗵|🗶|🗷|🗸|🗹|🗺|🗻|🗼|🗾|🗿|😀|😁|😂|😃|😄|😅|😆|😇|😈|😉|😊|😋|😌|😍|😎|😏|😑|😒|😓|😔|😕|😖|😗|😜|😝|😞|😟|😠|😡|😢|😣|😤|😦|😧|😨|😩|😪|😫|😬|😭|😯|😰|😱|😲|😳|😴|😵|😶|😷|😹|😼|🙊|🚂|🚄|🚅|🚔|🚕|🚘|🚛|🚞|🚟|🚠|🚡|🚧|🚩|🚪|🚬|🚮|🚱|🚴|🚶|🚹|🚺|🚻|🚽|🚾|🚿|🛀|🛁|🅿|🆒|🆓|🆔|🆕|🆖|🆗|🆘|🆙|🆚|🇴|🛃|🛂|🚼|🚸|🚷|🚵|🚳|⌚️|🚲|🚰|🚯|Ⓜ️|🚭|🚫|🚨|🚦|🚥|🚤|🚣|🚢|🚝|🚜|🚚|🚙|🚗|🚖|🚓|🚒|🚑|🚐|🚏|🚎|🚍|🚌|🚋|🚊|🚉|🚈|🚇|🚆|🚃|🚁|🚀|🙏|🙎|🙍|🙌|🙋|🙉|🙈|🙇|🙆|🙅|🙀|😿|😾|🀄|🅰|🅱|🅾|🆎|🆑|🇦|🇧|🇨|🇩|🇪|🇫|🇬|🇭|🇮|🇯|🇰|🇱|🇲|🇳|👐|👤|👥|👰|👳|👷|👹|👺|💌|💑|💒|💓|💔|💕|💖|💗|💙|💚|💛|💜|💝|💞|💟|💦|💬|💭|💮|💱|💸|📂|📃|📄|📉|📊|📍|📏|📐|📑|📕|📗|📞|📤|📥|📨|📪|📬|📳|📴|📵|📶|📸|📽|📾|🔂|🔃|🔅|🔆|🔊|🔏|🔕|🔘|🔞|🔟|🔠|🔩|🔬|🔮|🔯|🔴|🔼|🔾|🔿|🕄|🕆|🕇|🕈|🕉|🕊|🕥|🕦|🕧|🕨|🕩|🕪|🕭|🕰|🕲|🕴|🕵|🕶|🕸|🖂|🖃|🖅|🖇|🖈|🖉|🖌|🖍|🖐|🖑|🖓|🖗|🖘|🖙|🖚|🖛|🖜|🖝|🖞|🖟|🖠|🖡|🖢|🖣|🖥|🖦|🖩|🖭|🖮|🖯|🖰|🖱|🖳|🖸|🖹|🖻|🖼|🖽|🖾|🗂|🗆|🗇|🗋|🗒|🗓|🗔|🗘|🗠|🗡|🗦|🗰|🗲|🗴|🗽|😐|😘|😙|😚|😛|😥|😮|😸|😺|😻|😽|☯|⭕|⬜|⬛|⤵|⤴|➿|➗|➖|❌|✴|✳|✖|✔|✒|✏|✂|⛪|⛄|⚾|⚽|⚡|⚠|♥|♣|♠|♓|♎|♍|♌|♋|♊|♉|♈|☺|☕|☑|☎|☁|☀|◼|◻|▫|▪|⏳|⏬|⌛|↪|↙|↘|↗|↖|↔|™|☾|☽|©|®|‼|⁉|ℹ|↕|⏩|⏪|⏫|⏰|▶|◀|☔|☝|♏|♐|♑|♒|♦|♨|♻|♿|⚓|⚪|⚫|⛅|⛎|⛔|⛵|✈|✊|✋|✡|✨|❄|❇|❎|❓|❔|❕|❗|❤|➕|➡|➰|⬅|⬆|⬇|〰|㊗|㊙|↩|◽|◾|✌|✉|✅|⛽|⛺|⛳|⛲|☄|★|☈|☊|☋|☌|☍|☖|☗|☙|☚|☛|☠|☡|☢|☣|☤|☥|☦|☧|☨|☩|☪|☫|☬|☭|☮|⭐|☰|☱|☲|☳|☴|☵|☶|☷|☸|☹|☻|☼|☿|♀|♁|♂|♃|♄|♅|♆|♇|♔|♕|♖|♗|♘|♙|♚|♛|♜|♝|♞|♟|♩|♬|♭|♮|♯|♰|♱|♳|♴|♵|♶|♷|♸|♹|♺|♼|♽|⚀|⚁|⚂|⚃|⚄|⚅|⚆|⚇|⚈|⚉|⚊|⚋|⚌|⚍|⚎|⚏|⚒|⚔|⚕|⚖|⚗|⚘|⚙|⚛|⚜|⚝|⚞|⚟|⚢|⚣|⚤|⚥|⚦|⚧|⚨|⚩|⚭|⚮|⚯|⚰|⚱|⚲|⚳|⚴|⚵|⚶|⚷|⚸|⚹|⚺|⚻|⚼|⛀|⛁|⛂|⛃|⛇|⛉|⛊|⛋|⛌|⛍|⛏|⛐|⛑|⛒|⛓|⛕|⛖|⛗|⛘|⛙|⛚|⛛|⛜|⛝|⛞|⛟|⛠|⛡|⛣|⛤|⛧|⛩|⛬|⛭|⛮|⛯|⛱|⛶|⛸|⛹|⛼|⛿/g,
      useUserEmoji: false,
      userNames: ['emoji', 'emojidex']
    };
    Plugin = (function() {
      function Plugin(element, options) {
        var _this = this;
        this.element = element;
        this.element = $(this.element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.ec = new EmojidexClient;
        if (this.ec.Data.storage.get('emojidex.regexpUTF') && this.ec.Data.storage.get('emojidex.utfEmojiData')) {
          this.options.regexpUTF = RegExp(this.ec.Data.storage.get('emojidex.regexpUTF'), 'g');
          this.options.utfEmojiData = this.ec.Data.storage.get('emojidex.utfEmojiData');
          this.replace();
        } else {
          $.ajax({
            url: this.ec.api_url + 'moji_codes',
            dataType: 'json',
            success: function(response) {
              var regexp;
              console.dir(response);
              _this.ec.Data.storage.set('emojidex.utfEmojiData', response.moji_index);
              _this.options.utfEmojiData = response.moji_index;
              regexp = response.moji_array.join('|');
              _this.ec.Data.storage.set('emojidex.regexpUTF', regexp);
              _this.options.regexpUTF = RegExp(regexp, 'g');
              return _this.replace();
            }
          });
        }
      }

      Plugin.prototype.replace = function() {
        this.replacer = this.options.useUserEmoji ? new ReplacerUser(this) : new ReplacerSearch(this);
        return this.replacer.loadEmoji();
      };

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

    Replacer.prototype.loadingNum = void 0;

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return "<img      class='emojidex-emoji'      src='" + this.plugin.ec.cdn_url + this.plugin.ec.size_code + "/" + emoji_code + ".png'      title='" + (this.replaceUnderToSpace(emoji_code)) + "'    ></img>";
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
        if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
          return $(element).replaceWith(_this.getTextWithLoadingTag(element.textContent));
        }
      });
    };

    Replacer.prototype.getTextWithLoadingTag = function(text) {
      var _this = this;
      text = text.replace(/:([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]+):/g, function(matched_string, pattern1) {
        return _this.getLoadingTag(matched_string, 'code');
      });
      text = text.replace(this.plugin.options.regexpUTF, function(matched_string) {
        return _this.getLoadingTag(matched_string, 'utf');
      });
      return text;
    };

    Replacer.prototype.fadeOutLoadingTag_fadeInEmojiTag = function(element, emoji_code, match) {
      var emoji_tag,
        _this = this;
      if (match == null) {
        match = true;
      }
      emoji_tag = void 0;
      if (match) {
        emoji_tag = $(this.getEmojiTag(emoji_code)).hide();
      } else {
        emoji_tag = $(emoji_code);
      }
      return element.fadeOut("normal", function() {
        element.after(emoji_tag);
        return emoji_tag.fadeIn("fast", function() {
          if (--_this.loadingNum === 0 && (_this.plugin.options.onComplete != null)) {
            return _this.plugin.options.onComplete(_this.plugin.element);
          }
        });
      });
    };

    Replacer.prototype.replaceSpaceToUnder = function(string) {
      return string.replace(/\s/g, '_');
    };

    Replacer.prototype.replaceUnderToSpace = function(string) {
      return string.replace(/_/g, ' ');
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
        var emoji, loading_element, loading_elements, replaceToEmojiIcon, _i, _len, _results;
        replaceToEmojiIcon = function(type, loading_element, emoji_code) {
          var emoji_image;
          emoji_image = $("<img src='" + _this.plugin.ec.cdn_url + _this.plugin.ec.size_code + "/" + emoji_code + ".png'></img>");
          emoji_image.load(function(e) {
            return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, emoji_code);
          });
          return emoji_image.error(function(e) {
            return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, "<span>:" + emoji_code + ":</span>", false);
          });
        };
        loading_elements = _this.getLoadingElement(element);
        _this.loadingNum = loading_elements.length;
        _results = [];
        for (_i = 0, _len = loading_elements.length; _i < _len; _i++) {
          loading_element = loading_elements[_i];
          switch (loading_element.dataset.type) {
            case 'code':
              _results.push(replaceToEmojiIcon(loading_element.dataset.type, $(loading_element), _this.replaceSpaceToUnder(loading_element.dataset.emoji.replace(/:/g, ''))));
              break;
            case 'utf':
              _results.push((function() {
                var _results1;
                _results1 = [];
                for (emoji in this.plugin.options.utfEmojiData) {
                  if (emoji === loading_element.dataset.emoji) {
                    this.fadeOutLoadingTag_fadeInEmojiTag($(loading_element), this.plugin.options.utfEmojiData[emoji]);
                    break;
                  } else {
                    _results1.push(void 0);
                  }
                }
                return _results1;
              }).call(_this));
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
      var _logUtfEmoji, _logUtfEmojiDataList, _logUtfRegexpPattern,
        _this = this;
      _logUtfEmoji = function(emoji_data) {
        var emoji, utf_emoji, _i, _len;
        utf_emoji = '';
        for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
          emoji = emoji_data[_i];
          if (emoji.moji != null) {
            utf_emoji += emoji.moji;
          }
        }
        return console.log(utf_emoji);
      };
      _logUtfRegexpPattern = function(emoji_data) {
        var emoji, utf_emoji, _i, _len;
        utf_emoji = [];
        for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
          emoji = emoji_data[_i];
          if (emoji.moji != null) {
            utf_emoji.push(emoji.moji);
          }
        }
        return console.log(utf_emoji.join('|'));
      };
      _logUtfEmojiDataList = function(emoji_data) {
        var data_list, emoji, _i, _len;
        data_list = [];
        for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
          emoji = emoji_data[_i];
          if (emoji.moji != null) {
            data_list.push("{utf:'" + emoji.moji + "',code:'" + (_this.replaceSpaceToUnder(emoji.code)) + "'}");
          }
        }
        return console.log("[" + (data_list.join(',')) + "]");
      };
      this.emoji_data = emoji_data;
      this.emoji_regexps = this.getEmojiRegexps(emoji_data);
      this.targetElementNum = this.plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().length - 1;
      return this.plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().filter(function(index, element) {
        if (element.nodeType === Node.TEXT_NODE) {
          $(element).replaceWith(_this.getTextWithEomojiTag(element.textContent));
        }
        if (_this.targetElementNum - index === 0 && (_this.plugin.options.onComplete != null)) {
          return _this.plugin.options.onComplete(_this.plugin.element);
        }
      });
    };

    ReplacerUser.prototype.getEmojiRegexps = function(emoji_data) {
      var emoji, pattern_code, utf_emoji, _i, _len;
      utf_emoji = [];
      pattern_code = ':(';
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        if (emoji.moji != null) {
          utf_emoji.push(emoji.moji);
        }
        if (emoji.code != null) {
          pattern_code += this.replaceSpaceToUnder(emoji.code) + '|';
        }
      }
      utf_emoji.sort(function(v1, v2) {
        return v2.length - v1.length;
      });
      return {
        utf: RegExp(utf_emoji.join('|'), 'g'),
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

    return ReplacerUser;

  })(Replacer);

}).call(this);
