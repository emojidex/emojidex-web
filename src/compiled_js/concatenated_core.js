/*
emojidex coffee plugin for jQuery/Zepto and compatible

=LICENSE=
Licensed under the emojidex Open License
https://www.emojidex.com/emojidex/emojidex_open_license

Copyright 2013 Genshin Souzou Kabushiki Kaisha
*/


(function() {
  var EmojiLoader, EmojiLoaderService, EmojiPallet, EmojidexClient,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidex";
    defaults = {
      emojiarea: {
        plain_text: ".emojidex-plain_text",
        content_editable: ".emojidex-content_editable"
      }
    };
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
    return Plugin = (function() {
      function Plugin(element, options) {
        var _this = this;
        this.element = element;
        this.emoji_data_array = [];
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.api_emoji = new EmojiLoaderService(this.element, this.options);
        this.api_emoji.load(function() {
          _this.emoji_data_array.push(_this.api_emoji.emoji_data);
          return _this.checkLoadedEmojiData();
        });
      }

      Plugin.prototype.checkLoadedEmojiData = function() {
        if (this.emoji_data_array) {
          return this.setAutoComplete(this.options);
        }
      };

      Plugin.prototype.setAutoComplete = function(options) {
        var at_config, category, emoji, emoji_data, moji, testCallback, _i, _j, _len, _len1, _ref, _ref1;
        emoji = [];
        _ref = this.emoji_data_array;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          emoji_data = _ref[_i];
          for (category in emoji_data) {
            _ref1 = emoji_data[category];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              moji = _ref1[_j];
              emoji.push({
                code: moji.code,
                img_url: moji.img_url
              });
            }
          }
        }
        testCallback = function(data) {
          return console.log(111);
        };
        at_config = {
          callback: testCallback,
          at: ":",
          limit: 10,
          search_key: "code",
          data: emoji,
          tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>",
          insert_tpl: "<img src='${img_url}' height='20' width='20' />"
        };
        $(options.emojiarea["plain_text"]).atwho(at_config);
        return $(options.emojiarea["content_editable"]).atwho(at_config);
      };

      Plugin.prototype.setEmojiarea = function(options) {
        options.emojiarea["plaintext"].emojiarea({
          wysiwyg: false
        });
        options.emojiarea["wysiwyg"].on("change", function() {
          console.dir(this);
          return options.emojiarea["rawtext"].text($(this).val());
        });
        return options.emojiarea["wysiwyg"].trigger("change");
      };

      return Plugin;

    })();
  })(jQuery, window, document);

  /*
  emojidex coffee client
  * Provides search, index caching and combining and asset URI resolution
  
  =LICENSE=
  Licensed under the emojidex Open License
  https://www.emojidex.com/emojidex/emojidex_open_license
  
  Copyright 2013 Genshin Souzou Kabushiki Kaisha
  */


  EmojidexClient = (function() {
    function EmojidexClient(pre_cache_utf, locale, api_uri, cdn_uri) {
      if (pre_cache_utf == null) {
        pre_cache_utf = false;
      }
      if (locale == null) {
        locale = 'en';
      }
      if (api_uri == null) {
        api_uri = 'https://www.emojidex.com/api/v1/';
      }
      if (cdn_uri == null) {
        cdn_uri = 'http://cdn.emojidex.com';
      }
      this.api_uri = api_uri;
      this.cdn_uri = cdn_uri;
      this.emoji = [];
      this.history = [];
      this.favorites = [];
      if (auto_login) {
        get_history;
        get_favorites;
      }
      if (pre_cache_utf) {
        switch (locale) {
          case 'en':
            user_emoji('emoji');
            break;
          case 'ja':
            user_emoji('絵文字');
        }
      }
    }

    EmojidexClient.prototype.search_by_string = function(search_string, page, limit) {
      var keys, tags;
      if (page == null) {
        page = 1;
      }
      if (limit == null) {
        limit = 20;
      }
      keys = [];
      tags = [];
      return search(keys, tags, page, limit);
    };

    EmojidexClient.prototype.search = function(keys, tags, page, limit) {
      if (page == null) {
        page = 1;
      }
      if (limit == null) {
        limit = 20;
      }
    };

    EmojidexClient.prototype.user_emoji = function(callback, username, page, limit) {
      if (page == null) {
        page = 1;
      }
      if (limit == null) {
        limit = 20;
      }
      return $.getJSON(this.api_uri + 'users/' + username + '/emoji?' + $.param({
        page: page,
        limit: limit
      }), function(data) {
        return _cc(data, callback);
      });
    };

    EmojidexClient.prototype.auto_login = function() {
      this.username = nil;
      return this.api_key = nil;
    };

    EmojidexClient.prototype.login = function(username, password) {
      if (username == null) {
        username = nil;
      }
      if (password == null) {
        password = nil;
      }
    };

    EmojidexClient.prototype.get_history = function(page, limit) {
      if (page == null) {
        page = 1;
      }
      if (limit == null) {
        limit = 50;
      }
    };

    EmojidexClient.prototype.set_history = function(emoji_code) {};

    EmojidexClient.prototype.get_favorites = function(page, limit) {
      if (page == null) {
        page = 1;
      }
      if (limit == null) {
        limit = 50;
      }
    };

    EmojidexClient.prototype.set_favorites = function(emoji_code) {};

    EmojidexClient.prototype._cc = function(data, callback) {
      return alert(data);
    };

    return EmojidexClient;

  })();

  EmojiLoader = (function() {
    function EmojiLoader() {}

    EmojiLoader.prototype.emoji_data = null;

    EmojiLoader.prototype.element = null;

    EmojiLoader.prototype.options = null;

    EmojiLoader.prototype.emoji_regexps = null;

    EmojiLoader.prototype.getCategorizedData = function(emoji_data) {
      var emoji, new_emoji_data, _i, _len;
      new_emoji_data = {};
      for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
        emoji = emoji_data[_i];
        if (emoji.category === null) {
          if (new_emoji_data.uncategorized == null) {
            new_emoji_data.uncategorized = [emoji];
          } else {
            new_emoji_data.uncategorized.push(emoji);
          }
        } else {
          if (new_emoji_data[emoji.category] == null) {
            new_emoji_data[emoji.category] = [emoji];
          } else {
            new_emoji_data[emoji.category].push(emoji);
          }
        }
      }
      return new_emoji_data;
    };

    EmojiLoader.prototype.setEmojiCSS_getEmojiRegexps = function(emoji_data) {
      var category, emoji, emoji_css, emoji_in_category, regexp_for_code, regexp_for_utf, _i, _len;
      regexp_for_utf = "";
      regexp_for_code = ":(";
      emoji_css = $('<style type="text/css" />');
      for (category in emoji_data) {
        emoji_in_category = emoji_data[category];
        for (_i = 0, _len = emoji_in_category.length; _i < _len; _i++) {
          emoji = emoji_in_category[_i];
          regexp_for_utf += emoji.moji + "|";
          regexp_for_code += emoji.code + "|";
          emoji_css.append("i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}");
        }
      }
      $("head").append(emoji_css);
      return {
        utf: regexp_for_utf.slice(0, -1),
        code: regexp_for_code.slice(0, -1) + "):"
      };
    };

    EmojiLoader.prototype.getEmojiTag = function(emoji_code) {
      return '<i class="emojidex-' + emoji_code + '"></i>';
    };

    EmojiLoader.prototype.replaceForUTF = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.moji === matched_string) {
              return EmojiLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojiLoader.prototype.replaceForCode = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        matched_string = matched_string.replace(/:/g, "");
        for (category in options.emoji_data) {
          _ref = options.emoji_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.code === matched_string) {
              return EmojiLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojiLoader.prototype.setEmojiIcon = function(loader) {
      return $(this.element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      }).each(function() {
        var replaced_string;
        replaced_string = this.textContent;
        if (loader.emoji_regexps.utf != null) {
          replaced_string = EmojiLoader.prototype.replaceForUTF({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.utf,
            emoji_data: loader.emoji_data
          });
        }
        if (loader.emoji_regexps.code != null) {
          replaced_string = EmojiLoader.prototype.replaceForCode({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.code,
            emoji_data: loader.emoji_data
          });
        }
        return $(this).replaceWith(replaced_string);
      });
    };

    return EmojiLoader;

  })();

  EmojiLoaderService = (function(_super) {
    __extends(EmojiLoaderService, _super);

    function EmojiLoaderService(element, options) {
      this.element = element;
      this.options = options;
      EmojiLoaderService.__super__.constructor.apply(this, arguments);
    }

    EmojiLoaderService.prototype.load = function(callback) {
      var onLoadEmojiData,
        _this = this;
      onLoadEmojiData = function(emoji_data) {
        var emoji, _i, _len;
        for (_i = 0, _len = emoji_data.length; _i < _len; _i++) {
          emoji = emoji_data[_i];
          emoji.code = emoji.code.replace(RegExp(" ", "g"), "_");
          emoji.img_url = "http://assets.emojidex.com/emoji/px32/" + emoji.code + ".png";
        }
        _this.emoji_data = _this.getCategorizedData(emoji_data);
        _this.emoji_regexps = _this.setEmojiCSS_getEmojiRegexps(_this.emoji_data);
        _this.setEmojiIcon(_this);
        return callback(_this);
      };
      this.getEmojiDataFromAPI(onLoadEmojiData);
      return this;
    };

    EmojiLoaderService.prototype.getEmojiDataFromAPI = function(callback) {
      var emoji_data, loaded_num, user_name, user_names, _i, _len, _results;
      loaded_num = 0;
      user_names = ["emojidex", "emoji"];
      emoji_data = [];
      _results = [];
      for (_i = 0, _len = user_names.length; _i < _len; _i++) {
        user_name = user_names[_i];
        $.ajaxSetup({
          beforeSend: function(jqXHR, settings) {
            return jqXHR.user_name = user_name;
          }
        });
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

    return EmojiLoaderService;

  })(EmojiLoader);

  EmojiPallet = (function() {
    function EmojiPallet(emoji_data_array, element, options) {
      this.emoji_data_array = emoji_data_array;
      this.element = element;
      this.options = options;
      this.KEY_ESC = 27;
      this.KEY_TAB = 9;
    }

    EmojiPallet.prototype.setPallet = function() {};

    return EmojiPallet;

  })();

  /*
  emojiarea
  
  emojiarea - A rich textarea control that supports emoji
  
  based partially emojiarea by Brian Reavis (Apache License)
  
  =LICENSE=
  Licensed under the emojidex Open License
  https://www.emojidex.com/emojidex/emojidex_open_license
  
  Copyright 2013 Genshin Souzou Kabushiki Kaisha
  */


  (function($, window, document) {
    var ELEMENT_NODE, EmojiArea, EmojiArea_Plain, EmojiArea_WYSIWYG, EmojiMenu, KEY_ESC, KEY_TAB, TAGS_BLOCK, TEXT_NODE, util;
    ELEMENT_NODE = 1;
    TEXT_NODE = 3;
    TAGS_BLOCK = ["p", "div", "pre", "form"];
    KEY_ESC = 27;
    KEY_TAB = 9;
    $.emojiarea = {
      path: "",
      icons: {},
      defaults: {
        button: null,
        buttonLabel: "emoji",
        buttonPosition: "after"
      }
    };
    $.fn.emojiarea = function(options) {
      options = $.extend({}, $.emojiarea.defaults, options);
      return this.each(function() {
        var $textarea;
        $textarea = $(this);
        if ("contentEditable" in document.body && options.wysiwyg !== false) {
          new EmojiArea_WYSIWYG($textarea, options);
        } else {
          new EmojiArea_Plain($textarea, options);
        }
      });
    };
    util = {};
    util.restoreSelection = (function() {
      if (window.getSelection) {
        return function(savedSelection) {
          var i, len, sel;
          sel = window.getSelection();
          sel.removeAllRanges();
          i = 0;
          len = savedSelection.length;
          while (i < len) {
            sel.addRange(savedSelection[i]);
            ++i;
          }
        };
      } else if (document.selection && document.selection.createRange) {
        return function(savedSelection) {
          if (savedSelection) {
            savedSelection.select();
          }
        };
      }
    })();
    util.saveSelection = (function() {
      if (window.getSelection) {
        return function() {
          var i, len, ranges, sel;
          sel = window.getSelection();
          ranges = [];
          if (sel.rangeCount) {
            i = 0;
            len = sel.rangeCount;
            while (i < len) {
              ranges.push(sel.getRangeAt(i));
              ++i;
            }
          }
          return ranges;
        };
      } else if (document.selection && document.selection.createRange) {
        return function() {
          var sel;
          sel = document.selection;
          if (sel.type.toLowerCase() !== "none") {
            return sel.createRange();
          } else {
            return null;
          }
        };
      }
    })();
    util.replaceSelection = (function() {
      if (window.getSelection) {
        return function(content) {
          var node, range, sel;
          range = void 0;
          sel = window.getSelection();
          node = (typeof content === "string" ? document.createTextNode(content) : content);
          if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(" "));
            range.insertNode(node);
            range.setStart(node, 0);
            window.setTimeout((function() {
              range = document.createRange();
              range.setStartAfter(node);
              range.collapse(true);
              sel.removeAllRanges();
              sel.addRange(range);
            }), 0);
          }
        };
      } else if (document.selection && document.selection.createRange) {
        return function(content) {
          var range;
          range = document.selection.createRange();
          if (typeof content === "string") {
            range.text = content;
          } else {
            range.pasteHTML(content.outerHTML);
          }
        };
      }
    })();
    util.insertAtCursor = function(text, el) {
      var endIndex, range, startIndex, val;
      text = " " + text;
      val = el.value;
      endIndex = void 0;
      startIndex = void 0;
      range = void 0;
      if (typeof el.selectionStart !== "undefined" && typeof el.selectionEnd !== "undefined") {
        startIndex = el.selectionStart;
        endIndex = el.selectionEnd;
        el.value = val.substring(0, startIndex) + text + val.substring(el.selectionEnd);
        el.selectionStart = el.selectionEnd = startIndex + text.length;
      } else if (typeof document.selection !== "undefined" && typeof document.selection.createRange !== "undefined") {
        el.focus();
        range = document.selection.createRange();
        range.text = text;
        range.select();
      }
    };
    util.extend = function(a, b) {
      var key;
      if (typeof a === "undefined" || !a) {
        a = {};
      }
      if (typeof b === "object") {
        for (key in b) {
          if (b.hasOwnProperty(key)) {
            a[key] = b[key];
          }
        }
      }
      return a;
    };
    util.escapeRegex = function(str) {
      return (str + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    };
    util.htmlEntities = function(str) {
      return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    };
    EmojiArea = function() {};
    EmojiArea.prototype.setup = function() {
      var self;
      self = this;
      this.$editor.on("focus", function() {
        self.hasFocus = true;
      });
      this.$editor.on("blur", function() {
        self.hasFocus = false;
      });
      this.setupButton();
    };
    EmojiArea.prototype.setupButton = function() {
      var $button, self;
      self = this;
      $button = void 0;
      if (this.options.button) {
        $button = $(this.options.button);
      } else if (this.options.button !== false) {
        $button = $("<a href=\"javascript:void(0)\">");
        $button.html(this.options.buttonLabel);
        $button.addClass("emoji-button");
        $button.attr({
          title: this.options.buttonLabel
        });
        this.$editor[this.options.buttonPosition]($button);
      } else {
        $button = $("");
      }
      $button.on("click", function(e) {
        EmojiMenu.show(self);
        e.stopPropagation();
      });
      this.$button = $button;
    };
    EmojiArea.createIcon = function(emoji) {
      var filename, path;
      filename = emoji + ".svg";
      path = $.emojiarea.path || "";
      if (path.length && path.charAt(path.length - 1) !== "/") {
        path += "/";
      }
      return "<img src=\"" + path + filename + "\" alt=\"" + util.htmlEntities(emoji) + "\">";
    };
    /*
    Editor (plain-text)
    
    @constructor
    @param {object} $textarea
    @param {object} options
    */

    EmojiArea_Plain = function($textarea, options) {
      this.options = options;
      this.$textarea = $textarea;
      this.$editor = $textarea;
      this.setup();
    };
    EmojiArea_Plain.prototype.insert = function(emoji) {
      var category, i;
      for (category in $.emojiarea.icons) {
        i = 0;
        while (i < $.emojiarea.icons[category]) {
          if (!$.emojiarea.icons[category][i].hasOwnProperty(emoji)) {
            return;
          }
          i++;
        }
      }
      emoji = ":" + emoji + ":";
      util.insertAtCursor(emoji, this.$textarea[0]);
      this.$textarea.trigger("change");
    };
    EmojiArea_Plain.prototype.val = function() {
      return this.$textarea.val();
    };
    util.extend(EmojiArea_Plain.prototype, EmojiArea.prototype);
    /*
    Editor (rich)
    
    @constructor
    @param {object} $textarea
    @param {object} options
    */

    EmojiArea_WYSIWYG = function($textarea, options) {
      var emoji, html, moji, self;
      self = this;
      this.options = options;
      this.$textarea = $textarea;
      this.$editor = $("<div>").addClass("emoji-wysiwyg-editor");
      this.$editor.text($textarea.val());
      this.$editor.attr({
        contenteditable: "true"
      });
      this.$editor.on("blur keyup paste", function() {
        return self.onChange.apply(self, arguments_);
      });
      this.$editor.on("mousedown focus", function() {
        document.execCommand("enableObjectResizing", false, false);
      });
      this.$editor.on("blur", function() {
        document.execCommand("enableObjectResizing", true, true);
      });
      html = this.$editor.text();
      emoji = $.emojiarea.icons;
      for (moji in emoji) {
        if (emoji.hasOwnProperty(moji)) {
          html = html.replace(new RegExp(util.escapeRegex(moji), "g"), EmojiArea.createIcon(moji));
        }
      }
      this.$editor.html(html);
      $textarea.hide().after(this.$editor);
      this.setup();
      this.$button.on("mousedown", function() {
        if (self.hasFocus) {
          self.selection = util.saveSelection();
        }
      });
    };
    EmojiArea_WYSIWYG.prototype.onChange = function() {
      this.$textarea.val(this.val()).trigger("change");
    };
    EmojiArea_WYSIWYG.prototype.insert = function(emoji) {
      var $img, content;
      content = void 0;
      $img = $(EmojiArea.createIcon(emoji));
      $img[0].alt = ":" + $img[0].alt + ":";
      if ($img[0].attachEvent) {
        $img[0].attachEvent("onresizestart", (function(e) {
          e.returnValue = false;
        }), false);
      }
      this.$editor.trigger("focus");
      if (this.selection) {
        util.restoreSelection(this.selection);
      }
      try {
        util.replaceSelection($img[0]);
      } catch (_error) {}
      this.onChange();
    };
    EmojiArea_WYSIWYG.prototype.val = function() {
      var children, flush, i, line, lines, sanitizeNode;
      lines = [];
      line = [];
      flush = function() {
        lines.push(line.join(""));
        line = [];
      };
      sanitizeNode = function(node) {
        var alt, children, i, isBlock, tagName;
        if (node.nodeType === TEXT_NODE) {
          line.push(node.nodeValue);
        } else if (node.nodeType === ELEMENT_NODE) {
          tagName = node.tagName.toLowerCase();
          isBlock = TAGS_BLOCK.indexOf(tagName) !== -1;
          if (isBlock && line.length) {
            flush();
          }
          if (tagName === "img") {
            alt = node.getAttribute("alt") || "";
            if (alt) {
              line.push(alt);
            }
            return;
          } else {
            if (tagName === "br") {
              flush();
            }
          }
          children = node.childNodes;
          i = 0;
          while (i < children.length) {
            sanitizeNode(children[i]);
            i++;
          }
          if (isBlock && line.length) {
            flush();
          }
        }
      };
      children = this.$editor[0].childNodes;
      i = 0;
      while (i < children.length) {
        sanitizeNode(children[i]);
        i++;
      }
      if (line.length) {
        flush();
      }
      return lines.join("\n");
    };
    util.extend(EmojiArea_WYSIWYG.prototype, EmojiArea.prototype);
    /*
    Emoji Dropdown Menu
    
    @constructor
    @param {object} emojiarea
    */

    EmojiMenu = function() {
      var $body, $window, self;
      self = this;
      $body = $(document.body);
      $window = $(window);
      this.visible = false;
      this.emojiarea = null;
      this.$menu = $("<div>");
      this.$menu.addClass("emoji-menu");
      this.$menu.hide();
      this.$items = $("<div>").appendTo(this.$menu);
      $body.append(this.$menu);
      $body.on("keydown", function(e) {
        if (e.keyCode === KEY_ESC || e.keyCode === KEY_TAB) {
          self.hide();
        }
      });
      $body.on("mouseup", function() {
        self.hide();
      });
      $window.on("resize", function() {
        if (self.visible) {
          self.reposition();
        }
      });
      this.$menu.on("mouseup", "a", function(e) {
        e.stopPropagation();
        return false;
      });
      this.$menu.on("click", "a", function(e) {
        var emoji;
        emoji = $(".label", $(this)).text();
        if (!emoji) {
          return window.setTimeout(function() {
            self.onItemSelected.apply(self, [emoji]);
          }, 0);
        }
        e.stopPropagation();
        return false;
      });
      this.load();
    };
    EmojiMenu.prototype.onItemSelected = function(emoji) {
      this.emojiarea.insert(emoji);
      this.hide();
    };
    EmojiMenu.prototype.load = function() {
      var category, flag, html, options, path, setImage;
      setImage = function(category) {
        var html, i;
        html = "";
        i = 0;
        while (i < $.emojiarea.icons[category].length) {
          html += "<a href=\"javascript:void(0)\" title=\"" + options[category][i].code + "\">" + EmojiArea.createIcon(options[category][i].code) + "<span class=\"label\">" + util.htmlEntities(options[category][i].code) + "</span></a>";
          i++;
        }
        return html;
      };
      html = [];
      options = $.emojiarea.icons;
      path = $.emojiarea.path;
      if (path.length && path.charAt(path.length - 1) !== "/") {
        path += "/";
      }
      html.push("<ul class=\"nav nav-tabs\"><li class=\"dropdown active emoji-category\"><a class=\"dropdown-toggle emoji-toggle\" data-toggle=\"dropdown\" href=\"#category\">category<span class=\"caret\"></span></a><ul class=\"dropdown-menu emoji-category-menu\" role=\"menu\">");
      flag = true;
      for (category in $.emojiarea.icons) {
        if (flag) {
          html.push("<li class=\"active\"><a href=\"#" + category + "\" data-toggle=\"tab\">" + category + "</a></li>");
          flag = false;
        } else {
          html.push("<li><a href=\"#" + category + "\" data-toggle=\"tab\">" + category + "</a></li>");
        }
      }
      html.push("</ul></li></ul><div class=\"tab-content emoji-content\">");
      flag = true;
      for (category in $.emojiarea.icons) {
        if (flag) {
          html.push("<div class=\"tab-pane fade active in\" id=\"" + category + "\">" + setImage(category) + "</div>");
          flag = false;
        } else {
          html.push("<div class=\"tab-pane fade\" id=\"" + category + "\">" + setImage(category) + "</div>");
        }
      }
      html.push("</div>");
      this.$items.html(html.join(""));
    };
    EmojiMenu.prototype.reposition = function() {
      var $button, offset;
      $button = this.emojiarea.$button;
      offset = $button.offset();
      offset.top += $button.outerHeight();
      offset.left += Math.round($button.outerWidth() / 2);
      this.$menu.css({
        top: offset.top,
        left: offset.left
      });
    };
    EmojiMenu.prototype.hide = function(callback) {
      if (this.emojiarea) {
        this.emojiarea.menu = null;
        this.emojiarea.$button.removeClass("on");
        this.emojiarea = null;
      }
      this.visible = false;
      this.$menu.hide();
    };
    EmojiMenu.prototype.show = function(emojiarea) {
      if (this.emojiarea && this.emojiarea === emojiarea) {
        return;
      }
      this.emojiarea = emojiarea;
      this.emojiarea.menu = this;
      this.reposition();
      this.$menu.show();
      this.visible = true;
    };
    EmojiMenu.show = (function() {
      var menu;
      menu = null;
      return function(emojiarea) {
        menu = menu || new EmojiMenu();
        menu.show(emojiarea);
      };
    })();
  })(jQuery, window, document);

}).call(this);
