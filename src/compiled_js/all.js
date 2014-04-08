/*
emojidex coffee plugin for jQuery/Zepto and compatible

=LICENSE=
When used with the emojidex service enabled this library is
  licensed under:
  * LGPL[https://www.gnu.org/licenses/lgpl.html].
When modified to not use the emojidex service this library is
  dual licensed under:
  * GPL v3[https://www.gnu.org/licenses/gpl.html]
  * AGPL v3[https://www.gnu.org/licenses/agpl.html]

The
Copyright 2013 Genshin Souzou Kabushiki Kaisha
*/


(function() {
  var EmojisLoader, EmojisLoaderAPI, EmojisLoaderPOE, EmojisPallet,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidex";
    defaults = {
      emojiarea: {
        plaintext: "emojidex-plaintext",
        wysiwyg: "emojidex-wysiwyg",
        value_output: "emojidex-rawtext"
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
        this.emojis_data_array = [];
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.poe_emojis = new EmojisLoaderPOE(this.element, this.options);
        this.poe_emojis.load(function() {
          _this.emojis_data_array.push(_this.poe_emojis.emojis_data);
          return _this.setAutoComplete(_this.options);
        });
        this.api_emojis = new EmojisLoaderAPI(this.element, this.options);
        this.api_emojis.load(function() {
          _this.emojis_data_array.push(_this.api_emojis.emojis_data);
          return _this.setAutoComplete(_this.options);
        });
      }

      Plugin.prototype.setAutoComplete = function(options) {
        var category, emoji, emoji_config, emojis, emojis_data, _i, _j, _len, _len1, _ref, _ref1;
        if (this.emojis_data_array.length === 2) {
          emojis = [];
          _ref = this.emojis_data_array;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emojis_data = _ref[_i];
            for (category in emojis_data) {
              _ref1 = emojis_data[category];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                emoji = _ref1[_j];
                emojis.push({
                  key: emoji.code,
                  name: emoji.code,
                  img_url: emoji.img_url
                });
              }
            }
          }
          emoji_config = {
            at: ":",
            data: emojis,
            tpl: "<li data-value=':${key}:'><img src='${img_url}' height='20' width='20' /> ${name}</li>",
            insert_tpl: "<img src='${img_url}' height='20' width='20' />"
          };
          options.emojiarea["plaintext"].atwho(emoji_config);
          return options.emojiarea["wysiwyg"].atwho(emoji_config);
        }
      };

      Plugin.prototype.setEmojiarea = function(options) {
        options.emojiarea["wysiwyg"].on("change", function() {
          return options.emojiarea["value_output"].text($(this).val());
        });
        return options.emojiarea["wysiwyg"].trigger("change");
      };

      return Plugin;

    })();
  })(jQuery, window, document);

  EmojisLoader = (function() {
    function EmojisLoader() {}

    EmojisLoader.prototype.emojis_data = null;

    EmojisLoader.prototype.element = null;

    EmojisLoader.prototype.options = null;

    EmojisLoader.prototype.emoji_regexps = null;

    EmojisLoader.prototype.getCategorizedData = function(emojis_data) {
      var emoji, new_emojis_data, _i, _len;
      new_emojis_data = {};
      for (_i = 0, _len = emojis_data.length; _i < _len; _i++) {
        emoji = emojis_data[_i];
        if (emoji.category === null) {
          if (new_emojis_data.uncategorized == null) {
            new_emojis_data.uncategorized = [emoji];
          } else {
            new_emojis_data.uncategorized.push(emoji);
          }
        } else {
          if (new_emojis_data[emoji.category] == null) {
            new_emojis_data[emoji.category] = [emoji];
          } else {
            new_emojis_data[emoji.category].push(emoji);
          }
        }
      }
      return new_emojis_data;
    };

    EmojisLoader.prototype.setEmojiCSS_getEmojiRegexps = function(emojis_data) {
      var category, emoji, emojis_css, emojis_in_category, regexp_for_code, regexp_for_utf, _i, _len;
      regexp_for_utf = "";
      regexp_for_code = ":(";
      emojis_css = $('<style type="text/css" />');
      for (category in emojis_data) {
        emojis_in_category = emojis_data[category];
        for (_i = 0, _len = emojis_in_category.length; _i < _len; _i++) {
          emoji = emojis_in_category[_i];
          regexp_for_utf += emoji.moji + "|";
          regexp_for_code += emoji.code + "|";
          emojis_css.append("i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}");
        }
      }
      $("head").append(emojis_css);
      return {
        utf: regexp_for_utf.slice(0, -1),
        code: regexp_for_code.slice(0, -1) + "):"
      };
    };

    EmojisLoader.prototype.getEmojiTag = function(emoji_code) {
      return '<i class="emojidex-' + emoji_code + '"></i>';
    };

    EmojisLoader.prototype.replaceForUTF = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        for (category in options.emojis_data) {
          _ref = options.emojis_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.moji === matched_string) {
              return EmojisLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojisLoader.prototype.replaceForCode = function(options) {
      var replaced_string;
      return replaced_string = options.s_replace.replace(new RegExp(options.regexp, "g"), function(matched_string) {
        var category, emoji, _i, _len, _ref;
        matched_string = matched_string.replace(/:/g, "");
        for (category in options.emojis_data) {
          _ref = options.emojis_data[category];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            emoji = _ref[_i];
            if (emoji.code === matched_string) {
              return EmojisLoader.prototype.getEmojiTag(emoji.code);
            }
          }
        }
      });
    };

    EmojisLoader.prototype.setEmojiIcon = function(loader) {
      return $(this.element).find(":not(iframe,textarea,script)").andSelf().contents().filter(function() {
        return this.nodeType === Node.TEXT_NODE;
      }).each(function() {
        var replaced_string;
        replaced_string = this.textContent;
        if (loader.emoji_regexps.utf != null) {
          replaced_string = EmojisLoader.prototype.replaceForUTF({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.utf,
            emojis_data: loader.emojis_data
          });
        }
        if (loader.emoji_regexps.code != null) {
          replaced_string = EmojisLoader.prototype.replaceForCode({
            s_replace: replaced_string,
            regexp: loader.emoji_regexps.code,
            emojis_data: loader.emojis_data
          });
        }
        return $(this).replaceWith(replaced_string);
      });
    };

    return EmojisLoader;

  })();

  EmojisLoaderAPI = (function(_super) {
    __extends(EmojisLoaderAPI, _super);

    function EmojisLoaderAPI(element, options) {
      this.element = element;
      this.options = options;
      EmojisLoaderAPI.__super__.constructor.apply(this, arguments);
    }

    EmojisLoaderAPI.prototype.load = function(callback) {
      var onLoadEmojisData,
        _this = this;
      onLoadEmojisData = function(emojis_data) {
        var emoji, _i, _len;
        for (_i = 0, _len = emojis_data.length; _i < _len; _i++) {
          emoji = emojis_data[_i];
          emoji.img_url = "http://assets.emojidex.com/emoji/" + emoji.code + "/px32.png";
        }
        _this.emojis_data = _this.getCategorizedData(emojis_data);
        _this.emoji_regexps = _this.setEmojiCSS_getEmojiRegexps(_this.emojis_data);
        _this.setEmojiIcon(_this);
        return callback(_this);
      };
      this.getEmojiDataFromAPI(onLoadEmojisData);
      return this;
    };

    EmojisLoaderAPI.prototype.getEmojiDataFromAPI = function(callback) {
      return $.ajax({
        url: "https://www.emojidex.com/api/v1/emoji",
        dataType: "jsonp",
        jsonpCallback: "callback",
        type: "get",
        success: function(emojis_data) {
          callback(emojis_data.emoji);
        },
        error: function(emojis_data) {}
      });
    };

    return EmojisLoaderAPI;

  })(EmojisLoader);

  EmojisLoaderPOE = (function(_super) {
    __extends(EmojisLoaderPOE, _super);

    function EmojisLoaderPOE(element, options) {
      this.element = element;
      this.options = options;
      EmojisLoaderPOE.__super__.constructor.apply(this, arguments);
    }

    EmojisLoaderPOE.prototype.load = function(callback) {
      var onLoadEmojisData,
        _this = this;
      onLoadEmojisData = function(emojis_data) {
        var emoji, _i, _len;
        for (_i = 0, _len = emojis_data.length; _i < _len; _i++) {
          emoji = emojis_data[_i];
          emoji.img_url = _this.options.path_img + emoji.code + ".svg";
        }
        _this.emojis_data = _this.getCategorizedData(emojis_data);
        _this.emoji_regexps = _this.setEmojiCSS_getEmojiRegexps(_this.emojis_data);
        _this.setEmojiIcon(_this);
        return callback(_this);
      };
      $.getJSON(this.options.path_json, onLoadEmojisData);
      return this;
    };

    return EmojisLoaderPOE;

  })(EmojisLoader);

  EmojisPallet = (function() {
    function EmojisPallet() {}

    EmojisPallet.prototype.element = null;

    EmojisPallet.prototype.options = null;

    return EmojisPallet;

  })();

  /*
  emojiarea.poe
  @author Yusuke Matsui
  
  emojiarea - A rich textarea control that supports emojis, WYSIWYG-style.
  Copyright (c) 2012 DIY Co
  
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
  file except in compliance with the License. You may obtain a copy of the License at:
  http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software distributed under
  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
  ANY KIND, either express or implied. See the License for the specific language
  governing permissions and limitations under the License.
  
  @author Brian Reavis <brian@diy.org>
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
        buttonLabel: "Emojis",
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
      var emojis, html, key, self;
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
      emojis = $.emojiarea.icons;
      for (key in emojis) {
        if (emojis.hasOwnProperty(key)) {
          html = html.replace(new RegExp(util.escapeRegex(key), "g"), EmojiArea.createIcon(key));
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
