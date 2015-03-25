/*
 * jQuery emojidex - v0.4.6
 * emojidex plugin for jQuery/Zepto and compatible
 * https://github.com/emojidex/emojidex-web
 *
 * Includes:
 *   emojidexReplace, emojidexAutocomplete
 *
 * =LICENSE=
 * Licensed under the emojidex Open License
 * https://www.emojidex.com/emojidex/emojidex_open_license
 *
 * Copyright 2013 Genshin Souzou Kabushiki Kaisha
 *
 *
 * Includes:
 * --------------------------------
 * emojidex client - v0.3.5
 * * Provides search, index caching and combining and asset URI resolution
 * https://github.com/emojidex/emojidex-web-client
 *
 * =LICENSE=
 * Licensed under the emojidex Open License
 * https://www.emojidex.com/emojidex/emojidex_open_license
 *
 * Copyright 2013 Genshin Souzou Kabushiki Kaisha
 *
 *
 * Includes:
 * --------------------------------
 * jQuery Storage API Plugin
 *
 * Copyright (c) 2013 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/jQuery-Storage-API
 *
 * Version: 1.7.3
 *
 * --------------------------------
 * --------------------------------
  Implement Github like autocomplete mentions
  http://ichord.github.com/At.js
  Copyright (c) 2013 chord.luo@gmail.com
  Licensed under the MIT license.
* --------------------------------
! jquery.atwho - v0.5.1 - 2014-09-14
 * Copyright (c) 2014 chord.luo <chord.luo@gmail.com>;
 * homepage: http://ichord.github.com/At.js* Licensed MIT
* --------------------------------
 */
/*
本插件操作 textarea 或者 input 内的插入符
只实现了获得插入符在文本框中的位置，我设置
插入符的位置.
*/


(function() {
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(window.jQuery);
    }
  })(function($) {
    "use strict";
    var EditableCaret, InputCaret, Mirror, Utils, discoveryIframeOf, methods, oDocument, oFrame, oWindow, pluginName, setContextBy;
    pluginName = 'caret';
    EditableCaret = (function() {
      function EditableCaret($inputor) {
        this.$inputor = $inputor;
        this.domInputor = this.$inputor[0];
      }

      EditableCaret.prototype.setPos = function(pos) {
        return this.domInputor;
      };

      EditableCaret.prototype.getIEPosition = function() {
        return this.getPosition();
      };

      EditableCaret.prototype.getPosition = function() {
        var inputor_offset, offset;
        offset = this.getOffset();
        inputor_offset = this.$inputor.offset();
        offset.left -= inputor_offset.left;
        offset.top -= inputor_offset.top;
        return offset;
      };

      EditableCaret.prototype.getOldIEPos = function() {
        var preCaretTextRange, textRange;
        textRange = oDocument.selection.createRange();
        preCaretTextRange = oDocument.body.createTextRange();
        preCaretTextRange.moveToElementText(this.domInputor);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        return preCaretTextRange.text.length;
      };

      EditableCaret.prototype.getPos = function() {
        var clonedRange, pos, range;
        if (range = this.range()) {
          clonedRange = range.cloneRange();
          clonedRange.selectNodeContents(this.domInputor);
          clonedRange.setEnd(range.endContainer, range.endOffset);
          pos = clonedRange.toString().length;
          clonedRange.detach();
          return pos;
        } else if (oDocument.selection) {
          return this.getOldIEPos();
        }
      };

      EditableCaret.prototype.getOldIEOffset = function() {
        var range, rect;
        range = oDocument.selection.createRange().duplicate();
        range.moveStart("character", -1);
        rect = range.getBoundingClientRect();
        return {
          height: rect.bottom - rect.top,
          left: rect.left,
          top: rect.top
        };
      };

      EditableCaret.prototype.getOffset = function(pos) {
        var clonedRange, offset, range, rect;
        if (oWindow.getSelection && (range = this.range())) {
          if (range.endOffset - 1 < 0) {
            return null;
          }
          clonedRange = range.cloneRange();
          clonedRange.setStart(range.endContainer, range.endOffset - 1);
          clonedRange.setEnd(range.endContainer, range.endOffset);
          rect = clonedRange.getBoundingClientRect();
          offset = {
            height: rect.height,
            left: rect.left + rect.width,
            top: rect.top
          };
          clonedRange.detach();
        } else if (oDocument.selection) {
          offset = this.getOldIEOffset();
        }
        if (offset) {
          offset.top += $(oWindow).scrollTop();
          offset.left += $(oWindow).scrollLeft();
        }
        return offset;
      };

      EditableCaret.prototype.range = function() {
        var sel;
        if (!oWindow.getSelection) {
          return;
        }
        sel = oWindow.getSelection();
        if (sel.rangeCount > 0) {
          return sel.getRangeAt(0);
        } else {
          return null;
        }
      };

      return EditableCaret;

    })();
    InputCaret = (function() {
      function InputCaret($inputor) {
        this.$inputor = $inputor;
        this.domInputor = this.$inputor[0];
      }

      InputCaret.prototype.getIEPos = function() {
        var endRange, inputor, len, normalizedValue, pos, range, textInputRange;
        inputor = this.domInputor;
        range = oDocument.selection.createRange();
        pos = 0;
        if (range && range.parentElement() === inputor) {
          normalizedValue = inputor.value.replace(/\r\n/g, "\n");
          len = normalizedValue.length;
          textInputRange = inputor.createTextRange();
          textInputRange.moveToBookmark(range.getBookmark());
          endRange = inputor.createTextRange();
          endRange.collapse(false);
          if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
            pos = len;
          } else {
            pos = -textInputRange.moveStart("character", -len);
          }
        }
        return pos;
      };

      InputCaret.prototype.getPos = function() {
        if (oDocument.selection) {
          return this.getIEPos();
        } else {
          return this.domInputor.selectionStart;
        }
      };

      InputCaret.prototype.setPos = function(pos) {
        var inputor, range;
        inputor = this.domInputor;
        if (oDocument.selection) {
          range = inputor.createTextRange();
          range.move("character", pos);
          range.select();
        } else if (inputor.setSelectionRange) {
          inputor.setSelectionRange(pos, pos);
        }
        return inputor;
      };

      InputCaret.prototype.getIEOffset = function(pos) {
        var h, textRange, x, y;
        textRange = this.domInputor.createTextRange();
        pos || (pos = this.getPos());
        textRange.move('character', pos);
        x = textRange.boundingLeft;
        y = textRange.boundingTop;
        h = textRange.boundingHeight;
        return {
          left: x,
          top: y,
          height: h
        };
      };

      InputCaret.prototype.getOffset = function(pos) {
        var $inputor, offset, position;
        $inputor = this.$inputor;
        if (oDocument.selection) {
          offset = this.getIEOffset(pos);
          offset.top += $(oWindow).scrollTop() + $inputor.scrollTop();
          offset.left += $(oWindow).scrollLeft() + $inputor.scrollLeft();
          return offset;
        } else {
          offset = $inputor.offset();
          position = this.getPosition(pos);
          return offset = {
            left: offset.left + position.left - $inputor.scrollLeft(),
            top: offset.top + position.top - $inputor.scrollTop(),
            height: position.height
          };
        }
      };

      InputCaret.prototype.getPosition = function(pos) {
        var $inputor, at_rect, end_range, format, html, mirror, start_range;
        $inputor = this.$inputor;
        format = function(value) {
          return $('<div></div>').text(value).html();
        };
        if (pos === void 0) {
          pos = this.getPos();
        }
        start_range = $inputor.val().slice(0, pos);
        end_range = $inputor.val().slice(pos);
        html = "<span style='position: relative; display: inline;'>" + format(start_range) + "</span>";
        html += "<span id='caret' style='position: relative; display: inline;'>|</span>";
        html += "<span style='position: relative; display: inline;'>" + format(end_range) + "</span>";
        mirror = new Mirror($inputor);
        return at_rect = mirror.create(html).rect();
      };

      InputCaret.prototype.getIEPosition = function(pos) {
        var h, inputorOffset, offset, x, y;
        offset = this.getIEOffset(pos);
        inputorOffset = this.$inputor.offset();
        x = offset.left - inputorOffset.left;
        y = offset.top - inputorOffset.top;
        h = offset.height;
        return {
          left: x,
          top: y,
          height: h
        };
      };

      return InputCaret;

    })();
    Mirror = (function() {
      Mirror.prototype.css_attr = ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "boxSizing", "fontFamily", "fontSize", "fontWeight", "height", "letterSpacing", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "outlineWidth", "overflow", "overflowX", "overflowY", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "textAlign", "textOverflow", "textTransform", "whiteSpace", "wordBreak", "wordWrap"];

      function Mirror($inputor) {
        this.$inputor = $inputor;
      }

      Mirror.prototype.mirrorCss = function() {
        var css,
          _this = this;
        css = {
          position: 'absolute',
          left: -9999,
          top: 0,
          zIndex: -20000
        };
        if (this.$inputor.prop('tagName') === 'TEXTAREA') {
          this.css_attr.push('width');
        }
        $.each(this.css_attr, function(i, p) {
          return css[p] = _this.$inputor.css(p);
        });
        return css;
      };

      Mirror.prototype.create = function(html) {
        this.$mirror = $('<div></div>');
        this.$mirror.css(this.mirrorCss());
        this.$mirror.html(html);
        this.$inputor.after(this.$mirror);
        return this;
      };

      Mirror.prototype.rect = function() {
        var $flag, pos, rect;
        $flag = this.$mirror.find("#caret");
        pos = $flag.position();
        rect = {
          left: pos.left,
          top: pos.top,
          height: $flag.height()
        };
        this.$mirror.remove();
        return rect;
      };

      return Mirror;

    })();
    Utils = {
      contentEditable: function($inputor) {
        return !!($inputor[0].contentEditable && $inputor[0].contentEditable === 'true');
      }
    };
    methods = {
      pos: function(pos) {
        if (pos || pos === 0) {
          return this.setPos(pos);
        } else {
          return this.getPos();
        }
      },
      position: function(pos) {
        if (oDocument.selection) {
          return this.getIEPosition(pos);
        } else {
          return this.getPosition(pos);
        }
      },
      offset: function(pos) {
        var offset;
        offset = this.getOffset(pos);
        return offset;
      }
    };
    oDocument = null;
    oWindow = null;
    oFrame = null;
    setContextBy = function(settings) {
      var iframe;
      if (iframe = settings != null ? settings.iframe : void 0) {
        oFrame = iframe;
        oWindow = iframe.contentWindow;
        return oDocument = iframe.contentDocument || oWindow.document;
      } else {
        oFrame = void 0;
        oWindow = window;
        return oDocument = document;
      }
    };
    discoveryIframeOf = function($dom) {
      var error;
      oDocument = $dom[0].ownerDocument;
      oWindow = oDocument.defaultView || oDocument.parentWindow;
      try {
        return oFrame = oWindow.frameElement;
      } catch (_error) {
        error = _error;
      }
    };
    $.fn.caret = function(method, value, settings) {
      var caret;
      if (methods[method]) {
        if ($.isPlainObject(value)) {
          setContextBy(value);
          value = void 0;
        } else {
          setContextBy(settings);
        }
        caret = Utils.contentEditable(this) ? new EditableCaret(this) : new InputCaret(this);
        return methods[method].apply(caret, [value]);
      } else {
        return $.error("Method " + method + " does not exist on jQuery.caret");
      }
    };
    $.fn.caret.EditableCaret = EditableCaret;
    $.fn.caret.InputCaret = InputCaret;
    $.fn.caret.Utils = Utils;
    return $.fn.caret.apis = methods;
  });

}).call(this);

/*! jquery.atwho - v0.5.1 - 2014-09-14
* Copyright (c) 2014 chord.luo <chord.luo@gmail.com>; 
* homepage: http://ichord.github.com/At.js 
* Licensed MIT
*/

(function() {
  (function(factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery'], factory);
    } else {
      return factory(window.jQuery);
    }
  })(function($) {

var Api, App, Controller, DEFAULT_CALLBACKS, KEY_CODE, Model, View,
  __slice = [].slice;

App = (function() {
  function App(inputor) {
    this.current_flag = null;
    this.controllers = {};
    this.alias_maps = {};
    this.$inputor = $(inputor);
    this.setIframe();
    this.listen();
  }

  App.prototype.createContainer = function(doc) {
    if ((this.$el = $("#atwho-container", doc)).length === 0) {
      return $(doc.body).append(this.$el = $("<div id='atwho-container'></div>"));
    }
  };

  App.prototype.setIframe = function(iframe, standalone) {
    var _ref;
    if (standalone == null) {
      standalone = false;
    }
    if (iframe) {
      this.window = iframe.contentWindow;
      this.document = iframe.contentDocument || this.window.document;
      this.iframe = iframe;
    } else {
      this.document = document;
      this.window = window;
      this.iframe = null;
    }
    if (this.iframeStandalone = standalone) {
      if ((_ref = this.$el) != null) {
        _ref.remove();
      }
      return this.createContainer(this.document);
    } else {
      return this.createContainer(document);
    }
  };

  App.prototype.controller = function(at) {
    var c, current, current_flag, _ref;
    if (this.alias_maps[at]) {
      current = this.controllers[this.alias_maps[at]];
    } else {
      _ref = this.controllers;
      for (current_flag in _ref) {
        c = _ref[current_flag];
        if (current_flag === at) {
          current = c;
          break;
        }
      }
    }
    if (current) {
      return current;
    } else {
      return this.controllers[this.current_flag];
    }
  };

  App.prototype.set_context_for = function(at) {
    this.current_flag = at;
    return this;
  };

  App.prototype.reg = function(flag, setting) {
    var controller, _base;
    controller = (_base = this.controllers)[flag] || (_base[flag] = new Controller(this, flag));
    if (setting.alias) {
      this.alias_maps[setting.alias] = flag;
    }
    controller.init(setting);
    return this;
  };

  App.prototype.listen = function() {
    return this.$inputor.on('keyup.atwhoInner', (function(_this) {
      return function(e) {
        return _this.on_keyup(e);
      };
    })(this)).on('keydown.atwhoInner', (function(_this) {
      return function(e) {
        return _this.on_keydown(e);
      };
    })(this)).on('scroll.atwhoInner', (function(_this) {
      return function(e) {
        var _ref;
        return (_ref = _this.controller()) != null ? _ref.view.hide(e) : void 0;
      };
    })(this)).on('blur.atwhoInner', (function(_this) {
      return function(e) {
        var c;
        if (c = _this.controller()) {
          return c.view.hide(e, c.get_opt("display_timeout"));
        }
      };
    })(this)).on('click.atwhoInner', (function(_this) {
      return function(e) {
        var _ref;
        return (_ref = _this.controller()) != null ? _ref.view.hide(e) : void 0;
      };
    })(this));
  };

  App.prototype.shutdown = function() {
    var c, _, _ref;
    _ref = this.controllers;
    for (_ in _ref) {
      c = _ref[_];
      c.destroy();
      delete this.controllers[_];
    }
    this.$inputor.off('.atwhoInner');
    return this.$el.remove();
  };

  App.prototype.dispatch = function() {
    return $.map(this.controllers, (function(_this) {
      return function(c) {
        var delay;
        if (delay = c.get_opt('delay')) {
          clearTimeout(_this.delayedCallback);
          return _this.delayedCallback = setTimeout(function() {
            if (c.look_up()) {
              return _this.set_context_for(c.at);
            }
          }, delay);
        } else {
          if (c.look_up()) {
            return _this.set_context_for(c.at);
          }
        }
      };
    })(this));
  };

  App.prototype.on_keyup = function(e) {
    var _ref;
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        if ((_ref = this.controller()) != null) {
          _ref.view.hide();
        }
        break;
      case KEY_CODE.DOWN:
      case KEY_CODE.UP:
      case KEY_CODE.CTRL:
        $.noop();
        break;
      case KEY_CODE.P:
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          this.dispatch();
        }
        break;
      default:
        this.dispatch();
    }
  };

  App.prototype.on_keydown = function(e) {
    var view, _ref;
    view = (_ref = this.controller()) != null ? _ref.view : void 0;
    if (!(view && view.visible())) {
      return;
    }
    switch (e.keyCode) {
      case KEY_CODE.ESC:
        e.preventDefault();
        view.hide(e);
        break;
      case KEY_CODE.UP:
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.DOWN:
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.P:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.prev();
        break;
      case KEY_CODE.N:
        if (!e.ctrlKey) {
          return;
        }
        e.preventDefault();
        view.next();
        break;
      case KEY_CODE.TAB:
      case KEY_CODE.ENTER:
        if (!view.visible()) {
          return;
        }
        e.preventDefault();
        view.choose(e);
        break;
      default:
        $.noop();
    }
  };

  return App;

})();

Controller = (function() {
  Controller.prototype.uid = function() {
    return (Math.random().toString(16) + "000000000").substr(2, 8) + (new Date().getTime());
  };

  function Controller(app, at) {
    this.app = app;
    this.at = at;
    this.$inputor = this.app.$inputor;
    this.id = this.$inputor[0].id || this.uid();
    this.setting = null;
    this.query = null;
    this.pos = 0;
    this.cur_rect = null;
    this.range = null;
    if ((this.$el = $("#atwho-ground-" + this.id, this.app.$el)).length === 0) {
      this.app.$el.append(this.$el = $("<div id='atwho-ground-" + this.id + "'></div>"));
    }
    this.model = new Model(this);
    this.view = new View(this);
  }

  Controller.prototype.init = function(setting) {
    this.setting = $.extend({}, this.setting || $.fn.atwho["default"], setting);
    this.view.init();
    return this.model.reload(this.setting.data);
  };

  Controller.prototype.destroy = function() {
    this.trigger('beforeDestroy');
    this.model.destroy();
    this.view.destroy();
    return this.$el.remove();
  };

  Controller.prototype.call_default = function() {
    var args, error, func_name;
    func_name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    try {
      return DEFAULT_CALLBACKS[func_name].apply(this, args);
    } catch (_error) {
      error = _error;
      return $.error("" + error + " Or maybe At.js doesn't have function " + func_name);
    }
  };

  Controller.prototype.trigger = function(name, data) {
    var alias, event_name;
    if (data == null) {
      data = [];
    }
    data.push(this);
    alias = this.get_opt('alias');
    event_name = alias ? "" + name + "-" + alias + ".atwho" : "" + name + ".atwho";
    return this.$inputor.trigger(event_name, data);
  };

  Controller.prototype.callbacks = function(func_name) {
    return this.get_opt("callbacks")[func_name] || DEFAULT_CALLBACKS[func_name];
  };

  Controller.prototype.get_opt = function(at, default_value) {
    var e;
    try {
      return this.setting[at];
    } catch (_error) {
      e = _error;
      return null;
    }
  };

  Controller.prototype.content = function() {
    if (this.$inputor.is('textarea, input')) {
      return this.$inputor.val();
    } else {
      return this.$inputor.text();
    }
  };

  Controller.prototype.catch_query = function() {
    var caret_pos, content, end, query, start, subtext;
    content = this.content();
    caret_pos = this.$inputor.caret('pos', {
      iframe: this.app.iframe
    });
    subtext = content.slice(0, caret_pos);
    query = this.callbacks("matcher").call(this, this.at, subtext, this.get_opt('start_with_space'));
    if (typeof query === "string" && query.length <= this.get_opt('max_len', 20)) {
      start = caret_pos - query.length;
      end = start + query.length;
      this.pos = start;
      query = {
        'text': query,
        'head_pos': start,
        'end_pos': end
      };
      this.trigger("matched", [this.at, query.text]);
    } else {
      query = null;
      this.view.hide();
    }
    return this.query = query;
  };

  Controller.prototype.rect = function() {
    var c, iframe_offset, scale_bottom;
    if (!(c = this.$inputor.caret('offset', this.pos - 1, {
      iframe: this.app.iframe
    }))) {
      return;
    }
    if (this.app.iframe && !this.app.iframeStandalone) {
      iframe_offset = $(this.app.iframe).offset();
      c.left += iframe_offset.left;
      c.top += iframe_offset.top;
    }
    if (this.$inputor.attr('contentEditable') === 'true') {
      c = this.cur_rect || (this.cur_rect = c);
    }
    scale_bottom = this.app.document.selection ? 0 : 2;
    return {
      left: c.left,
      top: c.top,
      bottom: c.top + c.height + scale_bottom
    };
  };

  Controller.prototype.reset_rect = function() {
    if (this.$inputor.attr('contentEditable') === 'true') {
      return this.cur_rect = null;
    }
  };

  Controller.prototype.mark_range = function() {
    if (this.$inputor.attr('contentEditable') === 'true') {
      if (this.app.window.getSelection) {
        this.range = this.app.window.getSelection().getRangeAt(0);
      }
      if (this.app.document.selection) {
        return this.ie8_range = this.app.document.selection.createRange();
      }
    }
  };

  Controller.prototype.insert_content_for = function($li) {
    var data, data_value, tpl;
    data_value = $li.data('value');
    tpl = this.get_opt('insert_tpl');
    if (this.$inputor.is('textarea, input') || !tpl) {
      return data_value;
    }
    data = $.extend({}, $li.data('item-data'), {
      'atwho-data-value': data_value,
      'atwho-at': this.at
    });
    return this.callbacks("tpl_eval").call(this, tpl, data);
  };

  Controller.prototype.insert = function(content, $li) {
    var $inputor, content_node, pos, range, sel, source, start_str, text, wrapped_content;
    $inputor = this.$inputor;
    wrapped_content = this.callbacks('inserting_wrapper').call(this, $inputor, content, this.get_opt("suffix"));
    if ($inputor.is('textarea, input')) {
      source = $inputor.val();
      start_str = source.slice(0, Math.max(this.query.head_pos - this.at.length, 0));
      text = "" + start_str + wrapped_content + (source.slice(this.query['end_pos'] || 0));
      $inputor.val(text);
      $inputor.caret('pos', start_str.length + wrapped_content.length, {
        iframe: this.app.iframe
      });
    } else if (range = this.range) {
      pos = range.startOffset - (this.query.end_pos - this.query.head_pos) - this.at.length;
      range.setStart(range.endContainer, Math.max(pos, 0));
      range.setEnd(range.endContainer, range.endOffset);
      range.deleteContents();
      content_node = $(wrapped_content, this.app.document)[0];
      range.insertNode(content_node);
      range.setEndAfter(content_node);
      range.collapse(false);
      sel = this.app.window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (range = this.ie8_range) {
      range.moveStart('character', this.query.end_pos - this.query.head_pos - this.at.length);
      range.pasteHTML(wrapped_content);
      range.collapse(false);
      range.select();
    }
    if (!$inputor.is(':focus')) {
      $inputor.focus();
    }
    return $inputor.change();
  };

  Controller.prototype.render_view = function(data) {
    var search_key;
    search_key = this.get_opt("search_key");
    data = this.callbacks("sorter").call(this, this.query.text, data.slice(0, 1001), search_key);
    return this.view.render(data.slice(0, this.get_opt('limit')));
  };

  Controller.prototype.look_up = function() {
    var query, _callback;
    if (!(query = this.catch_query())) {
      return;
    }
    _callback = function(data) {
      if (data && data.length > 0) {
        return this.render_view(data);
      } else {
        return this.view.hide();
      }
    };
    this.model.query(query.text, $.proxy(_callback, this));
    return query;
  };

  return Controller;

})();

Model = (function() {
  function Model(context) {
    this.context = context;
    this.at = this.context.at;
    this.storage = this.context.$inputor;
  }

  Model.prototype.destroy = function() {
    return this.storage.data(this.at, null);
  };

  Model.prototype.saved = function() {
    return this.fetch() > 0;
  };

  Model.prototype.query = function(query, callback) {
    var data, search_key, _remote_filter;
    data = this.fetch();
    search_key = this.context.get_opt("search_key");
    data = this.context.callbacks('filter').call(this.context, query, data, search_key) || [];
    _remote_filter = this.context.callbacks('remote_filter');
    if (data.length > 0 || (!_remote_filter && data.length === 0)) {
      return callback(data);
    } else {
      return _remote_filter.call(this.context, query, callback);
    }
  };

  Model.prototype.fetch = function() {
    return this.storage.data(this.at) || [];
  };

  Model.prototype.save = function(data) {
    return this.storage.data(this.at, this.context.callbacks("before_save").call(this.context, data || []));
  };

  Model.prototype.load = function(data) {
    if (!(this.saved() || !data)) {
      return this._load(data);
    }
  };

  Model.prototype.reload = function(data) {
    return this._load(data);
  };

  Model.prototype._load = function(data) {
    if (typeof data === "string") {
      return $.ajax(data, {
        dataType: "json"
      }).done((function(_this) {
        return function(data) {
          return _this.save(data);
        };
      })(this));
    } else {
      return this.save(data);
    }
  };

  return Model;

})();

View = (function() {
  function View(context) {
    this.context = context;
    this.$el = $("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>");
    this.timeout_id = null;
    this.context.$el.append(this.$el);
    this.bind_event();
  }

  View.prototype.init = function() {
    var id;
    id = this.context.get_opt("alias") || this.context.at.charCodeAt(0);
    return this.$el.attr({
      'id': "at-view-" + id
    });
  };

  View.prototype.destroy = function() {
    return this.$el.remove();
  };

  View.prototype.bind_event = function() {
    var $menu;
    $menu = this.$el.find('ul');
    return $menu.on('mouseenter.atwho-view', 'li', function(e) {
      $menu.find('.cur').removeClass('cur');
      return $(e.currentTarget).addClass('cur');
    }).on('click', (function(_this) {
      return function(e) {
        _this.choose(e);
        return e.preventDefault();
      };
    })(this));
  };

  View.prototype.visible = function() {
    return this.$el.is(":visible");
  };

  View.prototype.choose = function(e) {
    var $li, content;
    if (($li = this.$el.find(".cur")).length) {
      content = this.context.insert_content_for($li);
      this.context.insert(this.context.callbacks("before_insert").call(this.context, content, $li), $li);
      this.context.trigger("inserted", [$li, e]);
      this.hide(e);
    }
    if (this.context.get_opt("hide_without_suffix")) {
      return this.stop_showing = true;
    }
  };

  View.prototype.reposition = function(rect) {
    var offset, overflowOffset, _ref, _window;
    _window = this.context.app.iframeStandalone ? this.context.app.window : window;
    if (rect.bottom + this.$el.height() - $(_window).scrollTop() > $(_window).height()) {
      rect.bottom = rect.top - this.$el.height();
    }
    if (rect.left > (overflowOffset = $(_window).width() - this.$el.width() - 5)) {
      rect.left = overflowOffset;
    }
    offset = {
      left: rect.left,
      top: rect.bottom
    };
    if ((_ref = this.context.callbacks("before_reposition")) != null) {
      _ref.call(this.context, offset);
    }
    this.$el.offset(offset);
    return this.context.trigger("reposition", [offset]);
  };

  View.prototype.next = function() {
    var cur, next;
    cur = this.$el.find('.cur').removeClass('cur');
    next = cur.next();
    if (!next.length) {
      next = this.$el.find('li:first');
    }
    return next.addClass('cur');
  };

  View.prototype.prev = function() {
    var cur, prev;
    cur = this.$el.find('.cur').removeClass('cur');
    prev = cur.prev();
    if (!prev.length) {
      prev = this.$el.find('li:last');
    }
    return prev.addClass('cur');
  };

  View.prototype.show = function() {
    var rect;
    if (this.stop_showing) {
      this.stop_showing = false;
      return;
    }
    this.context.mark_range();
    if (!this.visible()) {
      this.$el.show();
      this.context.trigger('shown');
    }
    if (rect = this.context.rect()) {
      return this.reposition(rect);
    }
  };

  View.prototype.hide = function(e, time) {
    var callback;
    if (!this.visible()) {
      return;
    }
    if (isNaN(time)) {
      this.context.reset_rect();
      this.$el.hide();
      return this.context.trigger('hidden', [e]);
    } else {
      callback = (function(_this) {
        return function() {
          return _this.hide();
        };
      })(this);
      clearTimeout(this.timeout_id);
      return this.timeout_id = setTimeout(callback, time);
    }
  };

  View.prototype.render = function(list) {
    var $li, $ul, item, li, tpl, _i, _len;
    if (!($.isArray(list) && list.length > 0)) {
      this.hide();
      return;
    }
    this.$el.find('ul').empty();
    $ul = this.$el.find('ul');
    tpl = this.context.get_opt('tpl');
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      item = $.extend({}, item, {
        'atwho-at': this.context.at
      });
      li = this.context.callbacks("tpl_eval").call(this.context, tpl, item);
      $li = $(this.context.callbacks("highlighter").call(this.context, li, this.context.query.text));
      $li.data("item-data", item);
      $ul.append($li);
    }
    this.show();
    if (this.context.get_opt('highlight_first')) {
      return $ul.find("li:first").addClass("cur");
    }
  };

  return View;

})();

KEY_CODE = {
  DOWN: 40,
  UP: 38,
  ESC: 27,
  TAB: 9,
  ENTER: 13,
  CTRL: 17,
  P: 80,
  N: 78
};

DEFAULT_CALLBACKS = {
  before_save: function(data) {
    var item, _i, _len, _results;
    if (!$.isArray(data)) {
      return data;
    }
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      item = data[_i];
      if ($.isPlainObject(item)) {
        _results.push(item);
      } else {
        _results.push({
          name: item
        });
      }
    }
    return _results;
  },
  matcher: function(flag, subtext, should_start_with_space) {
    var match, regexp;
    flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    if (should_start_with_space) {
      flag = '(?:^|\\s)' + flag;
    }
    regexp = new RegExp(flag + '([A-Za-z0-9_\+\-]*)$|' + flag + '([^\\x00-\\xff]*)$', 'gi');
    match = regexp.exec(subtext);
    if (match) {
      return match[2] || match[1];
    } else {
      return null;
    }
  },
  filter: function(query, data, search_key) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      item = data[_i];
      if (~new String(item[search_key]).toLowerCase().indexOf(query.toLowerCase())) {
        _results.push(item);
      }
    }
    return _results;
  },
  remote_filter: null,
  sorter: function(query, items, search_key) {
    var item, _i, _len, _results;
    if (!query) {
      return items;
    }
    _results = [];
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      item.atwho_order = new String(item[search_key]).toLowerCase().indexOf(query.toLowerCase());
      if (item.atwho_order > -1) {
        _results.push(item);
      }
    }
    return _results.sort(function(a, b) {
      return a.atwho_order - b.atwho_order;
    });
  },
  tpl_eval: function(tpl, map) {
    var error;
    try {
      return tpl.replace(/\$\{([^\}]*)\}/g, function(tag, key, pos) {
        return map[key];
      });
    } catch (_error) {
      error = _error;
      return "";
    }
  },
  highlighter: function(li, query) {
    var regexp;
    if (!query) {
      return li;
    }
    regexp = new RegExp(">\\s*(\\w*?)(" + query.replace("+", "\\+") + ")(\\w*)\\s*<", 'ig');
    return li.replace(regexp, function(str, $1, $2, $3) {
      return '> ' + $1 + '<strong>' + $2 + '</strong>' + $3 + ' <';
    });
  },
  before_insert: function(value, $li) {
    return value;
  },
  inserting_wrapper: function($inputor, content, suffix) {
    var new_suffix, wrapped_content;
    new_suffix = suffix === "" ? suffix : suffix || " ";
    if ($inputor.is('textarea, input')) {
      return '' + content + new_suffix;
    } else if ($inputor.attr('contentEditable') === 'true') {
      new_suffix = suffix === "" ? suffix : suffix || "&nbsp;";
      if (/firefox/i.test(navigator.userAgent)) {
        wrapped_content = "<span>" + content + new_suffix + "</span>";
      } else {
        suffix = "<span contenteditable='false'>" + new_suffix + "<span>";
        wrapped_content = "<span contenteditable='false'>" + content + suffix + "</span>";
      }
      if (this.app.document.selection) {
        wrapped_content = "<span contenteditable='true'>" + content + "</span>";
      }
      return wrapped_content;
    }
  }
};

Api = {
  load: function(at, data) {
    var c;
    if (c = this.controller(at)) {
      return c.model.load(data);
    }
  },
  setIframe: function(iframe, standalone) {
    this.setIframe(iframe, standalone);
    return null;
  },
  run: function() {
    return this.dispatch();
  },
  destroy: function() {
    this.shutdown();
    return this.$inputor.data('atwho', null);
  }
};

$.fn.atwho = function(method) {
  var result, _args;
  _args = arguments;
  result = null;
  this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function() {
    var $this, app;
    if (!(app = ($this = $(this)).data("atwho"))) {
      $this.data('atwho', (app = new App(this)));
    }
    if (typeof method === 'object' || !method) {
      return app.reg(method.at, method);
    } else if (Api[method] && app) {
      return result = Api[method].apply(app, Array.prototype.slice.call(_args, 1));
    } else {
      return $.error("Method " + method + " does not exist on jQuery.caret");
    }
  });
  return result || this;
};

$.fn.atwho["default"] = {
  at: void 0,
  alias: void 0,
  data: null,
  tpl: "<li data-value='${atwho-at}${name}'>${name}</li>",
  insert_tpl: "<span id='${id}'>${atwho-data-value}</span>",
  callbacks: DEFAULT_CALLBACKS,
  search_key: "name",
  suffix: void 0,
  hide_without_suffix: false,
  start_with_space: true,
  highlight_first: true,
  limit: 5,
  max_len: 20,
  display_timeout: 300,
  delay: null
};

  });
}).call(this);

(function (factory) {
  if(typeof define==='function' && define.amd){
    // AMD
    define(['jquery'],factory);
  }else if(typeof exports==='object') {
    // CommonJS
    factory(require('jquery'));
  }else {
    // Browser globals
    factory(jQuery);
  }
}(function($){
  // Prefix to use with cookie fallback
  var cookie_local_prefix="ls_";
  var cookie_session_prefix="ss_";

  // Get items from a storage
  function _get(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],vi,ret,tmp;
    if(l<2) throw new Error('Minimum 2 arguments must be given');
    else if($.isArray(a1)){
      // If second argument is an array, return an object with value of storage for each item in this array
      ret={};
      for(var i in a1){
        vi=a1[i];
        try{
          ret[vi]=JSON.parse(s.getItem(vi));
        }catch(e){
          ret[vi]=s.getItem(vi);
        }
      }
      return ret;
    }else if(l==2){
      // If only 2 arguments, return value directly
      try{
        return JSON.parse(s.getItem(a1));
      }catch(e){
        return s.getItem(a1);
      }
    }else{
      // If more than 2 arguments, parse storage to retrieve final value to return it
      // Get first level
      try{
        ret=JSON.parse(s.getItem(a1));
      }catch(e){
        throw new ReferenceError(a1+' is not defined in this storage');
      }
      // Parse next levels
      for(var i=2;i<l-1;i++){
        ret=ret[a[i]];
        if(ret===undefined) throw new ReferenceError([].slice.call(a,1,i+1).join('.')+' is not defined in this storage');
      }
      // If last argument is an array, return an object with value for each item in this array
      // Else return value normally
      if($.isArray(a[i])){
        tmp=ret;
        ret={};
        for(var j in a[i]){
          ret[a[i][j]]=tmp[a[i][j]];
        }
        return ret;
      }else{
        return ret[a[i]];
      }
    }
  }

  // Set items of a storage
  function _set(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],a2=a[2],vi,to_store={},tmp;
    if(l<2 || !$.isPlainObject(a1) && l<3) throw new Error('Minimum 3 arguments must be given or second parameter must be an object');
    else if($.isPlainObject(a1)){
      // If first argument is an object, set values of storage for each property of this object
      for(var i in a1){
        vi=a1[i];
        if(!$.isPlainObject(vi)) s.setItem(i,vi);
        else s.setItem(i,JSON.stringify(vi));
      }
      return a1;
    }else if(l==3){
      // If only 3 arguments, set value of storage directly
      if(typeof a2==='object') s.setItem(a1,JSON.stringify(a2));
      else s.setItem(a1,a2);
      return a2;
    }else{
      // If more than 3 arguments, parse storage to retrieve final node and set value
      // Get first level
      try{
        tmp=s.getItem(a1);
        if(tmp!=null) {
          to_store=JSON.parse(tmp);
        }
      }catch(e){
      }
      tmp=to_store;
      // Parse next levels and set value
      for(var i=2;i<l-2;i++){
        vi=a[i];
        if(!tmp[vi] || !$.isPlainObject(tmp[vi])) tmp[vi]={};
        tmp=tmp[vi];
      }
      tmp[a[i]]=a[i+1];
      s.setItem(a1,JSON.stringify(to_store));
      return to_store;
    }
  }

  // Remove items from a storage
  function _remove(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],to_store,tmp;
    if(l<2) throw new Error('Minimum 2 arguments must be given');
    else if($.isArray(a1)){
      // If first argument is an array, remove values from storage for each item of this array
      for(var i in a1){
        s.removeItem(a1[i]);
      }
      return true;
    }else if(l==2){
      // If only 2 arguments, remove value from storage directly
      s.removeItem(a1);
      return true;
    }else{
      // If more than 2 arguments, parse storage to retrieve final node and remove value
      // Get first level
      try{
        to_store=tmp=JSON.parse(s.getItem(a1));
      }catch(e){
        throw new ReferenceError(a1+' is not defined in this storage');
      }
      // Parse next levels and remove value
      for(var i=2;i<l-1;i++){
        tmp=tmp[a[i]];
        if(tmp===undefined) throw new ReferenceError([].slice.call(a,1,i).join('.')+' is not defined in this storage');
      }
      // If last argument is an array,remove value for each item in this array
      // Else remove value normally
      if($.isArray(a[i])){
        for(var j in a[i]){
          delete tmp[a[i][j]];
        }
      }else{
        delete tmp[a[i]];
      }
      s.setItem(a1,JSON.stringify(to_store));
      return true;
    }
  }

  // Remove all items from a storage
  function _removeAll(storage, reinit_ns){
    var keys=_keys(storage);
    for(var i in keys){
      _remove(storage,keys[i]);
    }
    // Reinitialize all namespace storages
    if(reinit_ns){
      for(var i in $.namespaceStorages){
        _createNamespace(i);
      }
    }
  }

  // Check if items of a storage are empty
  function _isEmpty(storage){
    var l=arguments.length,a=arguments,s=window[storage],a1=a[1];
    if(l==1){
      // If only one argument, test if storage is empty
      return (_keys(storage).length==0);
    }else if($.isArray(a1)){
      // If first argument is an array, test each item of this array and return true only if all items are empty
      for(var i=0; i<a1.length;i++){
        if(!_isEmpty(storage,a1[i])) return false;
      }
      return true;
    }else{
      // If more than 1 argument, try to get value and test it
      try{
        var v=_get.apply(this, arguments);
        // Convert result to an object (if last argument is an array, _get return already an object) and test each item
        if(!$.isArray(a[l-1])) v={'totest':v};
        for(var i in v){
          if(!(
            ($.isPlainObject(v[i]) && $.isEmptyObject(v[i])) ||
            ($.isArray(v[i]) && !v[i].length) ||
            (!v[i])
          )) return false;
        }
        return true;
      }catch(e){
        return true;
      }
    }
  }

  // Check if items of a storage exist
  function _isSet(storage){
    var l=arguments.length,a=arguments,s=window[storage],a1=a[1];
    if(l<2) throw new Error('Minimum 2 arguments must be given');
    if($.isArray(a1)){
      // If first argument is an array, test each item of this array and return true only if all items exist
      for(var i=0; i<a1.length;i++){
        if(!_isSet(storage,a1[i])) return false;
      }
      return true;
    }else{
      // For other case, try to get value and test it
      try{
        var v=_get.apply(this, arguments);
        // Convert result to an object (if last argument is an array, _get return already an object) and test each item
        if(!$.isArray(a[l-1])) v={'totest':v};
        for(var i in v){
          if(!(v[i]!==undefined && v[i]!==null)) return false;
        }
        return true;
      }catch(e){
        return false;
      }
    }
  }

  // Get keys of a storage or of an item of the storage
  function _keys(storage){
    var l=arguments.length,s=window[storage],a=arguments,a1=a[1],keys=[],o={};
    // If more than 1 argument, get value from storage to retrieve keys
    // Else, use storage to retrieve keys
    if(l>1){
      o=_get.apply(this,a);
    }else{
      o=s;
    }
    if(o._cookie){
      // If storage is a cookie, use $.cookie to retrieve keys
      for(var key in $.cookie()){
        if(key!='') {
          keys.push(key.replace(o._prefix,''));
        }
      }
    }else{
      for(var i in o){
        keys.push(i);
      }
    }
    return keys;
  }

  // Create new namespace storage
  function _createNamespace(name){
    if(!name || typeof name!="string") throw new Error('First parameter must be a string');
    if(storage_available){
      if(!window.localStorage.getItem(name)) window.localStorage.setItem(name,'{}');
      if(!window.sessionStorage.getItem(name)) window.sessionStorage.setItem(name,'{}');
    }else{
      if(!window.localCookieStorage.getItem(name)) window.localCookieStorage.setItem(name,'{}');
      if(!window.sessionCookieStorage.getItem(name)) window.sessionCookieStorage.setItem(name,'{}');
    }
    var ns={
      localStorage:$.extend({},$.localStorage,{_ns:name}),
      sessionStorage:$.extend({},$.sessionStorage,{_ns:name})
    };
    if($.cookie){
      if(!window.cookieStorage.getItem(name)) window.cookieStorage.setItem(name,'{}');
      ns.cookieStorage=$.extend({},$.cookieStorage,{_ns:name});
    }
    $.namespaceStorages[name]=ns;
    return ns;
  }

  // Test if storage is natively available on browser
  function _testStorage(name){
    if(!window[name]) return false;
    var foo='jsapi';
    try{
      window[name].setItem(foo,foo);
      window[name].removeItem(foo);
      return true;
    }catch(e){
      return false;
    }
  }

  // Check if storages are natively available on browser
  var storage_available=_testStorage('localStorage');

  // Namespace object
  var storage={
    _type:'',
    _ns:'',
    _callMethod:function(f,a){
      var p=[this._type],a=Array.prototype.slice.call(a),a0=a[0];
      if(this._ns) p.push(this._ns);
      if(typeof a0==='string' && a0.indexOf('.')!==-1){
        a.shift();
        [].unshift.apply(a,a0.split('.'));
      }
      [].push.apply(p,a);
      return f.apply(this,p);
    },
    // Get items. If no parameters and storage have a namespace, return all namespace
    get:function(){
      return this._callMethod(_get,arguments);
    },
    // Set items
    set:function(){
      var l=arguments.length,a=arguments,a0=a[0];
      if(l<1 || !$.isPlainObject(a0) && l<2) throw new Error('Minimum 2 arguments must be given or first parameter must be an object');
      // If first argument is an object and storage is a namespace storage, set values individually
      if($.isPlainObject(a0) && this._ns){
        for(var i in a0){
          _set(this._type,this._ns,i,a0[i]);
        }
        return a0;
      }else{
        var r=this._callMethod(_set,a);
        if(this._ns) return r[a0.split('.')[0]];
        else return r;
      }
    },
    // Delete items
    remove:function(){
      if(arguments.length<1) throw new Error('Minimum 1 argument must be given');
      return this._callMethod(_remove,arguments);
    },
    // Delete all items
    removeAll:function(reinit_ns){
      if(this._ns){
        _set(this._type,this._ns,{});
        return true;
      }else{
        return _removeAll(this._type, reinit_ns);
      }
    },
    // Items empty
    isEmpty:function(){
      return this._callMethod(_isEmpty,arguments);
    },
    // Items exists
    isSet:function(){
      if(arguments.length<1) throw new Error('Minimum 1 argument must be given');
      return this._callMethod(_isSet,arguments);
    },
    // Get keys of items
    keys:function(){
      return this._callMethod(_keys,arguments);
    }
  };

  // Use jquery.cookie for compatibility with old browsers and give access to cookieStorage
  if($.cookie){
    // sessionStorage is valid for one window/tab. To simulate that with cookie, we set a name for the window and use it for the name of the cookie
    if(!window.name) window.name=Math.floor(Math.random()*100000000);
    var cookie_storage={
      _cookie:true,
      _prefix:'',
      _expires:null,
      _path:null,
      _domain:null,
      setItem:function(n,v){
        $.cookie(this._prefix+n,v,{expires:this._expires,path:this._path,domain:this._domain});
      },
      getItem:function(n){
        return $.cookie(this._prefix+n);
      },
      removeItem:function(n){
        return $.removeCookie(this._prefix+n);
      },
      clear:function(){
        for(var key in $.cookie()){
          if(key!=''){
            if(!this._prefix && key.indexOf(cookie_local_prefix)===-1 && key.indexOf(cookie_session_prefix)===-1 || this._prefix && key.indexOf(this._prefix)===0) {
              $.removeCookie(key);
            }
          }
        }
      },
      setExpires:function(e){
        this._expires=e;
        return this;
      },
      setPath:function(p){
        this._path=p;
        return this;
      },
      setDomain:function(d){
        this._domain=d;
        return this;
      },
      setConf:function(c){
        if(c.path) this._path=c.path;
        if(c.domain) this._domain=c.domain;
        if(c.expires) this._expires=c.expires;
        return this;
      },
      setDefaultConf:function(){
        this._path=this._domain=this._expires=null;
      }
    };
    if(!storage_available){
      window.localCookieStorage=$.extend({},cookie_storage,{_prefix:cookie_local_prefix,_expires:365*10});
      window.sessionCookieStorage=$.extend({},cookie_storage,{_prefix:cookie_session_prefix+window.name+'_'});
    }
    window.cookieStorage=$.extend({},cookie_storage);
    // cookieStorage API
    $.cookieStorage=$.extend({},storage,{
      _type:'cookieStorage',
      setExpires:function(e){window.cookieStorage.setExpires(e); return this;},
      setPath:function(p){window.cookieStorage.setPath(p); return this;},
      setDomain:function(d){window.cookieStorage.setDomain(d); return this;},
      setConf:function(c){window.cookieStorage.setConf(c); return this;},
      setDefaultConf:function(){window.cookieStorage.setDefaultConf(); return this;}
    });
  }

  // Get a new API on a namespace
  $.initNamespaceStorage=function(ns){ return _createNamespace(ns); };
  if(storage_available) {
    // localStorage API
    $.localStorage=$.extend({},storage,{_type:'localStorage'});
    // sessionStorage API
    $.sessionStorage=$.extend({},storage,{_type:'sessionStorage'});
  }else{
    // localStorage API
    $.localStorage=$.extend({},storage,{_type:'localCookieStorage'});
    // sessionStorage API
    $.sessionStorage=$.extend({},storage,{_type:'sessionCookieStorage'});
  }
  // List of all namespace storage
  $.namespaceStorages={};
  // Remove all items in all storages
  $.removeAllStorages=function(reinit_ns){
    $.localStorage.removeAll(reinit_ns);
    $.sessionStorage.removeAll(reinit_ns);
    if($.cookieStorage) $.cookieStorage.removeAll(reinit_ns);
    if(!reinit_ns){
      $.namespaceStorages={};
    }
  }
}));

(function() {
  var EmojidexCategories, EmojidexData, EmojidexEmoji, EmojidexIndexes, EmojidexSearch, EmojidexUser, EmojidexUserFavorites, EmojidexUserHistory, EmojidexUtil,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.EmojidexClient = (function() {
    function EmojidexClient(options) {
      this.options = options;
      this.env = {
        api_ver: 1,
        cdn_addr: 'cdn.emojidex.com',
        s_cdn_addr: '',
        asset_addr: 'assets.emojidex.com',
        s_asset_addr: ''
      };
      this.defaults = {
        locale: 'en',
        api_url: 'https://www.emojidex.com/api/v1/',
        cdn_url: "http://" + this.env.cdn_addr + "/emoji/",
        closed_net: false,
        min_query_len: 4,
        size_code: 'px32',
        detailed: false,
        limit: 32
      };
      this.options = $.extend({}, this.defaults, this.options);
      this.closed_net = this.options.closed_net;
      this.api_url = this.options.api_url;
      this.cdn_url = this.options.cdn_url;
      this.size_code = this.options.size_code;
      this.detailed = this.options.detailed;
      this.limit = this.options.limit;
      this.locale = this.options.locale;
      this.Data = new EmojidexData(this);
      this.Categories = new EmojidexCategories(this);
      this.User = new EmojidexUser(this);
      this.Indexes = new EmojidexIndexes(this);
      this.Util = new EmojidexUtil(this);
      this.Search = new EmojidexSearch(this);
      this.Emoji = new EmojidexEmoji(this);
    }

    return EmojidexClient;

  })();

  EmojidexCategories = (function() {
    function EmojidexCategories(EC) {
      var cat;
      this.EC = EC;
      this._categories = this.EC.Data.categories();
      cat = this.EC.Data.categories();
      if (cat === 0) {
        this.sync();
      }
    }

    EmojidexCategories.prototype.sync = function(callback, locale) {
      var _this = this;
      if (locale == null) {
        locale = this.EC.locale;
      }
      return $.ajax({
        url: this.EC.api_url + 'categories',
        dataType: 'json',
        data: {
          locale: locale
        },
        success: function(response) {
          _this._categories;
          return typeof callback === "function" ? callback(response.categories) : void 0;
        }
      });
    };

    EmojidexCategories.prototype.all = function() {
      return this._categories;
    };

    return EmojidexCategories;

  })();

  EmojidexData = (function() {
    function EmojidexData(EC) {
      var _this = this;
      this.EC = EC;
      this._def_auth_info = {
        status: 'none',
        user: '',
        token: null
      };
      this.storage = $.localStorage;
      if (!this.storage.isSet("emojidex")) {
        this.storage.set("emojidex", {});
      }
      if (!this.storage.isSet("emojidex.emoji")) {
        this.storage.set("emojidex.emoji", this.EC.options.emoji || []);
      }
      if (!this.storage.isSet("emojidex.history")) {
        this.storage.set("emojidex.history", this.EC.options.history || []);
      }
      if (!this.storage.isSet("emojidex.favorites")) {
        this.storage.set("emojidex.favorites", this.EC.options.favorites || []);
      }
      if (!this.storage.isSet("emojidex.auth_info")) {
        this.storage.set("emojidex.categories", this.EC.options.categories || []);
      }
      if (!this.storage.isSet("emojidex.auth_info")) {
        this.storage.set("emojidex.auth_info", this.EC.options.auth_info || this._def_auth_info);
      }
      if (this.storage.get('emojidex.cdn_url')) {
        this.EC.cdn_url = this.storage.get('emojidex.cdn_url');
      } else {
        if (this.EC.cdn_url === this.EC.defaults.cdn_url && this.EC.closed_net === false) {
          $.ajax({
            url: this.EC.api_url + "/env",
            dataType: 'json',
            success: function(response) {
              _this.EC.env = response;
              _this.EC.cdn_url = "https://" + _this.EC.env.s_cdn_addr + "/emoji/";
              return _this.EC.Data.storage.set('emojidex.cdn_url', _this.EC.cdn_url);
            }
          });
        }
      }
    }

    EmojidexData.prototype.emoji = function(emoji_set) {
      if (emoji_set != null) {
        this.storage.set("emojidex.emoji", emoji_set);
      }
      return this.storage.get("emojidex.emoji");
    };

    EmojidexData.prototype.favorites = function(favorites_set) {
      if (favorites_set != null) {
        this.storage.set("emojidex.favorites", favorites_set);
      }
      return this.storage.get("emojidex.favorites");
    };

    EmojidexData.prototype.history = function(history_set) {
      if (history_set != null) {
        this.storage.set("emojidex.history", history_set);
      }
      return this.storage.get("emojidex.history");
    };

    EmojidexData.prototype.categories = function(categories_set) {
      if (categories_set != null) {
        this.storage.set("emojidex.categories", categories_set);
      }
      return this.storage.get("emojidex.categories");
    };

    EmojidexData.prototype.auth_info = function(auth_info_set) {
      if (auth_info_set != null) {
        this.storage.set("emojidex.auth_info", auth_info_set);
      }
      return this.storage.get("emojidex.auth_info");
    };

    return EmojidexData;

  })();

  EmojidexEmoji = (function() {
    function EmojidexEmoji(EC) {
      this.EC = EC;
      this.combine = __bind(this.combine, this);
      this._emoji = this.EC.Data.emoji();
      if (this.EC.Data.emoji().length === 0) {
        this.seed();
      }
    }

    EmojidexEmoji.prototype.seed = function(locale) {
      if (locale == null) {
        locale = this.EC.locale;
      }
      switch (locale) {
        case 'en':
          this.EC.Indexes.user('emoji', this.combine);
          return this.EC.Indexes.user('emojidex', this.combine);
        case 'ja':
          this.EC.Indexes.user('絵文字', this.combine);
          return this.EC.Indexes.user('絵文字デックス', this.combine);
      }
    };

    EmojidexEmoji.prototype.all = function() {
      return this._emoji;
    };

    EmojidexEmoji.prototype.search = function(term, callback) {
      var moji, results;
      results = (function() {
        var _i, _len, _ref, _results;
        _ref = this._emoji;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          moji = _ref[_i];
          if (moji.code.match(term)) {
            _results.push(moji);
          }
        }
        return _results;
      }).call(this);
      if (typeof callback === "function") {
        callback(results);
      }
      return results;
    };

    EmojidexEmoji.prototype.starting = function(term, callback) {
      var moji, results;
      results = (function() {
        var _i, _len, _ref, _results;
        _ref = this._emoji;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          moji = _ref[_i];
          if (moji.code.match('^' + term)) {
            _results.push(moji);
          }
        }
        return _results;
      }).call(this);
      if (typeof callback === "function") {
        callback(results);
      }
      return results;
    };

    EmojidexEmoji.prototype.ending = function(term, callback) {
      var moji, results;
      results = (function() {
        var _i, _len, _ref, _results;
        _ref = this._emoji;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          moji = _ref[_i];
          if (moji.code.match(term + '$')) {
            _results.push(moji);
          }
        }
        return _results;
      }).call(this);
      if (typeof callback === "function") {
        callback(results);
      }
      return results;
    };

    EmojidexEmoji.prototype.tags = function(tags, opts) {
      var collect, moji, selection, tag, _i, _len;
      tags = this.EC.Util.breakout(tags);
      selection = opts.selection || this._emoji;
      collect = [];
      for (_i = 0, _len = tags.length; _i < _len; _i++) {
        tag = tags[_i];
        collect.concat((function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = selection.length; _j < _len1; _j++) {
            moji = selection[_j];
            if ($.inArray(tag, moji.tags) >= 0) {
              _results.push(moji);
            }
          }
          return _results;
        })());
      }
      return collect;
    };

    EmojidexEmoji.prototype.categories = function(categories, opts) {
      var category, collect, moji, source, _i, _len;
      categories = this.EC.Util.breakout(categories);
      source = opts.selection || this._emoji;
      collect = [];
      for (_i = 0, _len = categories.length; _i < _len; _i++) {
        category = categories[_i];
        collect.concat((function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = source.length; _j < _len1; _j++) {
            moji = source[_j];
            if (moji.category === category) {
              _results.push(moji);
            }
          }
          return _results;
        })());
      }
      return collect;
    };

    EmojidexEmoji.prototype.advanced = function(searchs) {
      return this.categories(searchs.categories, {
        selection: this.tags(searchs.tags, {
          selection: this.search(searchs.term)
        })
      });
    };

    EmojidexEmoji.prototype.combine = function(emoji) {
      return this._emoji = this.EC.Data.emoji($.extend(this._emoji, emoji));
    };

    EmojidexEmoji.prototype.flush = function() {
      return this._emoji = this.EC.Data.emoji([]);
    };

    return EmojidexEmoji;

  })();

  EmojidexIndexes = (function() {
    function EmojidexIndexes(EC) {
      this.EC = EC;
      this.results = [];
      this.cur_page = 1;
      this.count = 0;
    }

    EmojidexIndexes.prototype._indexesAPI = function(query, callback, opts, func) {
      var param,
        _this = this;
      param = {
        page: 1,
        limit: this.EC.limit,
        detailed: this.EC.detailed
      };
      $.extend(param, opts);
      if (func != null) {
        this.indexed_func = func;
        this.indexed = {
          query: query,
          callback: callback,
          param: param
        };
      }
      return $.ajax({
        url: this.EC.api_url + query,
        dataType: 'json',
        data: param,
        success: function(response) {
          _this.results = response.emoji;
          _this.cur_page = response.meta.page;
          _this.count = response.meta.count;
          _this.EC.Emoji.combine(response.emoji);
          return typeof callback === "function" ? callback(response.emoji) : void 0;
        },
        error: function(response) {
          return _this.results = [];
        }
      });
    };

    EmojidexIndexes.prototype.index = function(callback, opts) {
      return this._indexesAPI('emoji', callback, opts, this.index);
    };

    EmojidexIndexes.prototype.newest = function(callback, opts) {
      return this._indexesAPI('newest', callback, opts, this.newest);
    };

    EmojidexIndexes.prototype.popular = function(callback, opts) {
      return this._indexesAPI('popular', callback, opts, this.popular);
    };

    EmojidexIndexes.prototype.user = function(username, callback, opts) {
      return this._indexesAPI("users/" + username + "/emoji", callback, opts);
    };

    EmojidexIndexes.prototype.select = function(code, callback, opts) {
      return this.EC.Search.find(code, callback, opts);
    };

    EmojidexIndexes.prototype.next = function() {
      if (this.count === this.indexed.param.limit) {
        this.indexed.param.page++;
      }
      return this.indexed_func(this.indexed.data, this.indexed.callback, this.indexed.param, this.indexed_func);
    };

    EmojidexIndexes.prototype.prev = function() {
      if (this.indexed.param.page > 1) {
        this.indexed.param.page--;
      }
      return this.indexed_func(this.indexed.data, this.indexed.callback, this.indexed.param, this.indexed_func);
    };

    return EmojidexIndexes;

  })();

  EmojidexSearch = (function() {
    function EmojidexSearch(EC) {
      this.EC = EC;
      this.Util = new EmojidexUtil;
      this.results = [];
      this.cur_page = 1;
      this.count = 0;
    }

    EmojidexSearch.prototype._searchAPI = function(search_data, callback, opts, call_func) {
      var param,
        _this = this;
      param = {
        page: 1,
        limit: this.EC.limit,
        detailed: this.EC.detailed
      };
      $.extend(param, opts);
      this.searched_func = call_func.ajax;
      this.searched = {
        data: search_data,
        callback: callback,
        param: param
      };
      if (!this.EC.closed_net) {
        return $.ajax({
          url: this.EC.api_url + 'search/emoji',
          dataType: 'json',
          data: param,
          success: function(response) {
            _this.results = response.emoji;
            _this.cur_page = response.meta.page;
            _this.count = response.meta.count;
            _this.EC.Emoji.combine(response.emoji);
            return typeof callback === "function" ? callback(response.emoji) : void 0;
          },
          error: function(response) {
            return _this.results = [];
          }
        });
      } else {
        return typeof call_func.storage === "function" ? call_func.storage(search_data, callback) : void 0;
      }
    };

    EmojidexSearch.prototype.search = function(term, callback, opts) {
      opts = $.extend({
        code_cont: this.EC.Util.escape_term(term)
      }, opts);
      return this._searchAPI(term, callback, opts, {
        ajax: this.search,
        storage: this.EC.Emoji.search
      });
    };

    EmojidexSearch.prototype.starting = function(term, callback, opts) {
      opts = $.extend({
        code_sw: this.Util.escape_term(term)
      }, opts);
      return this._searchAPI(term, callback, opts, {
        ajax: this.starting,
        storage: this.EC.Emoji.starting
      });
    };

    EmojidexSearch.prototype.ending = function(term, callback, opts) {
      opts = $.extend({
        code_ew: this.Util.escape_term(term)
      }, opts);
      return this._searchAPI(term, callback, opts, {
        ajax: this.ending,
        storage: this.EC.Emoji.ending
      });
    };

    EmojidexSearch.prototype.tags = function(tags, callback, opts) {
      opts = $.extend({
        "tags[]": this.Util.breakout(tags)
      }, opts);
      return this._searchAPI(tags, callback, opts, {
        ajax: this.tags,
        storage: this.EC.Emoji.tags
      });
    };

    EmojidexSearch.prototype.advanced = function(search_details, callback, opts) {
      var param;
      param = {
        code_cont: this.Util.escape_term(search_details.term),
        "tags[]": this.Util.breakout(search_details.tags),
        "categories[]": this.Util.breakout(search_details.categories)
      };
      $.extend(param, opts);
      return this._searchAPI(search_details, callback, param, {
        ajax: this.advanced,
        storage: this.EC.Emoji.advanced
      });
    };

    EmojidexSearch.prototype.find = function(code, callback, opts) {
      var param,
        _this = this;
      param = {
        detailed: this.EC.detailed
      };
      $.extend(param, opts);
      if (this.EC.closed_net) {

      } else {
        return $.ajax({
          url: this.EC.api_url + ("/emoji/" + code),
          dataType: 'json',
          data: param,
          success: function(response) {
            _this.EC.Emoji.combine([response]);
            return typeof callback === "function" ? callback(response) : void 0;
          }
        });
      }
    };

    EmojidexSearch.prototype.next = function() {
      if (this.count === this.searched.param.limit) {
        this.searched.param.page++;
      }
      return this.searched_func(this.searched.data, this.searched.callback, this.searched.param, {
        ajax: this.searched_func
      });
    };

    EmojidexSearch.prototype.prev = function() {
      if (this.searched.param.page > 1) {
        this.searched.param.page--;
      }
      return this.searched_func(this.searched.data, this.searched.callback, this.searched.param, {
        ajax: this.searched_func
      });
    };

    return EmojidexSearch;

  })();

  EmojidexUser = (function() {
    function EmojidexUser(EC) {
      this.EC = EC;
      this.auth_info = this.EC.Data._def_auth_info;
      this.History = new EmojidexUserHistory(this.EC);
      this.Favorites = new EmojidexUserFavorites(this.EC);
      this._auto_login();
    }

    EmojidexUser.prototype._auto_login = function() {
      if (this.closed_net) {
        return;
      }
      this.auth_info = this.EC.Data.auth_info();
      if (this.auth_info['token'] != null) {
        return this.sync_user_data();
      } else {
        return this.logout();
      }
    };

    EmojidexUser.prototype.login = function(params) {
      switch (params.authtype) {
        case 'plain':
          return this.plain_auth(params.username, params.password, params.callback);
        case 'basic':
          return this.basic_auth(params.user, params.pass, params.callback);
        case 'google':
          return this.google_auth(params.callback);
        default:
          return this._auto_login();
      }
    };

    EmojidexUser.prototype.logout = function() {
      return this.EC.Data.auth_info(this.EC.Data._def_auth_info);
    };

    EmojidexUser.prototype.plain_auth = function(username, password, callback) {
      var _this = this;
      if (callback == null) {
        callback = null;
      }
      return $.ajax({
        url: this.EC.api_url + 'users/authenticate',
        dataType: 'json',
        data: {
          username: username,
          password: password
        },
        success: function(response) {
          _this._set_auth_from_response(response);
          return typeof callback === "function" ? callback(_this.auth_info) : void 0;
        },
        error: function(response) {
          return _this.auth_info = _this.EC.Data.auth_info({
            status: response.auth_status,
            token: null,
            user: ''
          });
        }
      });
    };

    EmojidexUser.prototype.basic_auth = function(user, pass, callback) {
      if (callback == null) {
        callback = null;
      }
      return false;
    };

    EmojidexUser.prototype.google_auth = function(callback) {
      if (callback == null) {
        callback = null;
      }
      return false;
    };

    EmojidexUser.prototype.set_auth = function(user, token) {
      this.auth_info = this.EC.Data.auth_info({
        status: 'verified',
        token: token,
        user: user
      });
      return this.sync_user_data();
    };

    EmojidexUser.prototype._set_auth_from_response = function(response) {
      this.auth_info = this.EC.Data.auth_info({
        status: response.auth_status,
        token: response.auth_token,
        user: response.auth_user
      });
      return this.sync_user_data();
    };

    EmojidexUser.prototype.sync_user_data = function() {
      this.History.token = this.Favorites.token = this.auth_info['token'];
      this.Favorites.sync();
      return this.History.sync();
    };

    return EmojidexUser;

  })();

  EmojidexUserFavorites = (function() {
    function EmojidexUserFavorites(EC, token) {
      this.EC = EC;
      if (token == null) {
        token = null;
      }
      this.token = token;
      this._favorites = this.EC.Data.favorites();
    }

    EmojidexUserFavorites.prototype._favoritesAPI = function(options) {
      var ajax_obj;
      if (this.token != null) {
        ajax_obj = {
          url: this.EC.api_url + 'users/favorites',
          dataType: 'json'
        };
        return $.ajax($.extend(ajax_obj, options));
      }
    };

    EmojidexUserFavorites.prototype.get = function(callback) {
      var options,
        _this = this;
      options = {
        data: {
          auth_token: this.token
        },
        success: function(response) {
          _this._favorites = _this.EC.Data.favorites(response);
          return typeof callback === "function" ? callback(_this._favorites) : void 0;
        }
      };
      return this._favoritesAPI(options);
    };

    EmojidexUserFavorites.prototype.set = function(emoji_code) {
      var options,
        _this = this;
      options = {
        type: 'POST',
        data: {
          auth_token: this.token,
          emoji_code: emoji_code
        },
        success: function(response) {
          _this._favorites.push(response);
          return _this.EC.Data.favorites(_this._favorites);
        }
      };
      return this._favoritesAPI(options);
    };

    EmojidexUserFavorites.prototype.unset = function(emoji_code) {
      var options,
        _this = this;
      options = {
        type: 'DELETE',
        data: {
          auth_token: this.token,
          emoji_code: emoji_code
        },
        success: function(response) {
          return _this.sync();
        }
      };
      return this._favoritesAPI(options);
    };

    EmojidexUserFavorites.prototype.sync = function() {
      return this.get();
    };

    EmojidexUserFavorites.prototype.all = function() {
      return this._favorites;
    };

    return EmojidexUserFavorites;

  })();

  EmojidexUserHistory = (function() {
    function EmojidexUserHistory(EC, token) {
      this.EC = EC;
      if (token == null) {
        token = null;
      }
      this.token = token;
      this._history = this.EC.Data.history();
    }

    EmojidexUserHistory.prototype._historyAPI = function(options) {
      var ajax_obj;
      if (this.token != null) {
        ajax_obj = {
          url: this.EC.api_url + 'users/history',
          dataType: 'json'
        };
        return $.ajax($.extend(ajax_obj, options));
      }
    };

    EmojidexUserHistory.prototype.get = function() {
      var options,
        _this = this;
      options = {
        data: {
          auth_token: this.token
        },
        success: function(response) {
          return _this._history = _this.EC.Data.history(response);
        }
      };
      return this._historyAPI(options);
    };

    EmojidexUserHistory.prototype.set = function(emoji_code) {
      var options,
        _this = this;
      options = {
        type: 'POST',
        data: {
          auth_token: this.token,
          emoji_code: emoji_code
        },
        success: function(response) {
          var entry, i, _i, _len, _ref;
          _ref = _this._history;
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            entry = _ref[i];
            if (entry.emoji_code === response.emoji_code) {
              _this._history[i] = response;
              _this.EC.Data.history(_this._history);
              return response;
            }
          }
        }
      };
      return this._historyAPI(options);
    };

    EmojidexUserHistory.prototype.sync = function() {
      return this.get();
    };

    EmojidexUserHistory.prototype.all = function() {
      return this._history;
    };

    return EmojidexUserHistory;

  })();

  EmojidexUtil = (function() {
    function EmojidexUtil(EC) {
      this.EC = EC;
    }

    EmojidexUtil.prototype.escape_term = function(term) {
      return term.replace(/\s/g, '_').replace(/(\(|\))/g, '\\$1');
    };

    EmojidexUtil.prototype.de_escape_term = function(term) {
      return term.replace(/_/g, ' ');
    };

    EmojidexUtil.prototype.breakout = function(items) {
      if (items == null) {
        return [];
      }
      if (!(items instanceof Array)) {
        return items = [items];
      }
    };

    EmojidexUtil.prototype.simplify = function(emoji, size_code) {
      var moji, _i, _len, _results;
      if (emoji == null) {
        emoji = this.results;
      }
      if (size_code == null) {
        size_code = this.EC.size_code;
      }
      _results = [];
      for (_i = 0, _len = emoji.length; _i < _len; _i++) {
        moji = emoji[_i];
        _results.push({
          code: this.escape_term(moji.code),
          img_url: "" + this.EC.cdn_url + "/" + size_code + "/" + (this.escape_term(moji.code)) + ".png"
        });
      }
      return _results;
    };

    return EmojidexUtil;

  })();

}).call(this);

(function() {
  var AutoComplete;

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexAutocomplete";
    defaults = {
      limit: 10,
      insertImg: true
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.autocomplete = new AutoComplete(this);
        this.autocomplete.setAutoComplete();
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

  AutoComplete = (function() {
    function AutoComplete(plugin) {
      this.plugin = plugin;
      this.searching_num = 0;
    }

    AutoComplete.prototype.setAutoComplete = function() {
      var at_init, ec, getMatchString, getRegexp, onHighlighter, setAtwho, setSearchedEmojiData,
        _this = this;
      setAtwho = function(at_options) {
        return $(_this.plugin.element).atwho(at_options).on('reposition.atwho', function(e) {
          return $(e.currentTarget).atwho(at_options);
        }).on('hidden.atwho', function(e) {
          return $(e.currentTarget).atwho(at_options);
        });
      };
      setSearchedEmojiData = function(at_obj, match_string) {
        var num, updateAtwho;
        updateAtwho = function(searched_data, at_bak) {
          var at_options;
          at_options = {
            data: searched_data,
            callbacks: {
              highlighter: onHighlighter,
              matcher: function(flag, subtext, should_startWithSpace) {
                var match;
                return match = getMatchString(subtext, getRegexp(flag, should_startWithSpace));
              }
            }
          };
          return at_bak.$inputor.atwho('destroy').atwho($.extend({}, at_bak.setting, at_options)).atwho('run');
        };
        num = ++_this.searching_num;
        ec.Search.search(match_string, function(response) {
          var emoji, searched_data;
          searched_data = (function() {
            var _i, _len, _ref, _results;
            _ref = ec.Search.results;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              emoji = _ref[_i];
              _results.push({
                code: emoji.code.replace(/\s/g, '_'),
                img_url: "" + ec.cdn_url + ec.size_code + "/" + (emoji.code.replace(/\s/g, '_')) + ".png"
              });
            }
            return _results;
          })();
          if (_this.searching_num === num) {
            if (searched_data.length) {
              updateAtwho(searched_data, at_obj);
            }
            return _this.searching_num = 0;
          }
        });
        return match_string;
      };
      getRegexp = function(flag, should_startWithSpace) {
        var regexp, _a, _y;
        _a = decodeURI("%C3%80");
        _y = decodeURI("%C3%BF");
        return regexp = new RegExp("[：" + flag + "]([^：:;@&#~\!\$\+\?\%\*\f\n\r\\\/]+)$", 'gi');
      };
      getMatchString = function(subtext, regexp) {
        var match;
        match = regexp.exec(subtext);
        match = match ? match[2] || match[1] : null;
        return match;
      };
      onHighlighter = function(li, query) {
        var regexp;
        if (!query) {
          return li;
        }
        regexp = new RegExp(">\\s*([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*?)(" + (query.replace(/(\(|\))/g, '\\$1')) + ")([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*)\\s*<", 'ig');
        return li.replace(regexp, function(str, $1, $2, $3) {
          return "> " + $1 + "<strong>" + $2 + "</strong>" + $3 + " <";
        });
      };
      ec = new EmojidexClient;
      at_init = {
        at: ':',
        suffix: '',
        limit: this.plugin.options.limit,
        search_key: "code",
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20'></img>${code}</li>",
        insert_tpl: this.plugin.options.insertImg ? "<img src='${img_url}' height='20' width='20' />" : ":${code}:",
        callbacks: {
          highlighter: onHighlighter,
          matcher: function(flag, subtext, should_startWithSpace) {
            var match;
            match = getMatchString(subtext, getRegexp(flag, should_startWithSpace));
            if (match) {
              return setSearchedEmojiData(this, match);
            }
          }
        }
      };
      return setAtwho(at_init);
    };

    return AutoComplete;

  })();

}).call(this);

(function() {
  var Pallet;

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "emojidexPallet";
    defaults = {
      switch_element: $("#pallet-btn")
    };
    Plugin = (function() {
      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.pallet = new Pallet;
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

  Pallet = (function() {
    function Pallet(emoji_data_array, element, options) {
      this.emoji_data_array = emoji_data_array;
      this.element = element;
      this.options = options;
      this.KEY_ESC = 27;
      this.KEY_TAB = 9;
    }

    Pallet.prototype.setPallet = function() {};

    return Pallet;

  })();

}).call(this);

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
      useLoadingImg: true,
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
        if (this.checkUpdate()) {
          this.options.regexpUtf = RegExp(this.ec.Data.storage.get('emojidex.regexpUtf'), 'g');
          this.options.utfEmojiData = this.ec.Data.storage.get('emojidex.utfEmojiData');
          this.replace();
        } else {
          $.ajax({
            url: this.ec.api_url + 'moji_codes',
            dataType: 'json',
            success: function(response) {
              var regexp;
              _this.ec.Data.storage.set('emojidex.utfInfoUpdated', new Date().toString());
              regexp = response.moji_array.join('|');
              _this.ec.Data.storage.set('emojidex.regexpUtf', regexp);
              _this.options.regexpUtf = RegExp(regexp, 'g');
              _this.ec.Data.storage.set('emojidex.utfEmojiData', response.moji_index);
              _this.options.utfEmojiData = response.moji_index;
              return _this.replace();
            }
          });
        }
      }

      Plugin.prototype.checkUpdate = function() {
        var current, updated;
        if (this.ec.Data.storage.isSet('emojidex.utfInfoUpdated')) {
          current = new Date;
          updated = new Date(this.ec.Data.storage.get('emojidex.utfInfoUpdated'));
          if (current - updated <= 3600000 * 48) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };

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
    function Replacer() {
      var ignore;
      this.loadingNum = void 0;
      ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\';
      this.regexpCode = RegExp(":([^\\s" + ignore + "][^" + ignore + "]*[^\\s" + ignore + "]):|:([^\\s" + ignore + "]):", 'g');
    }

    Replacer.prototype.getEmojiTag = function(emoji_code) {
      return "<img class='emojidex-emoji' src='" + this.plugin.ec.cdn_url + this.plugin.ec.size_code + "/" + emoji_code + ".png' title='" + (this.replaceUnderToSpace(emoji_code)) + "'></img>";
    };

    Replacer.prototype.getLoadingTag = function(emoji_data, type) {
      return "<img class='emojidex-loading-icon' data-emoji='" + emoji_data + "' data-type='" + type + "'></img>";
    };

    Replacer.prototype.getLoadingElement = function(element) {
      return $(element.find('.emojidex-loading-icon'));
    };

    Replacer.prototype.setLoadingTag = function(plugin) {
      var _this = this;
      return plugin.element.find(":not(iframe,textarea,script)").andSelf().contents().filter(function(index, element) {
        var replaced_text;
        if (element.parentElement.tagName !== 'STYLE' && element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
          replaced_text = _this.getTextWithLoadingTag(element.textContent);
          if (replaced_text !== element.textContent) {
            return $(element).replaceWith(replaced_text);
          }
        }
      });
    };

    Replacer.prototype.getTextWithLoadingTag = function(text) {
      var text_bak,
        _this = this;
      text_bak = text;
      text = text.replace(this.plugin.options.regexpUtf, function(matched_string) {
        return _this.getLoadingTag(matched_string, 'utf');
      });
      text = text.replace(this.regexpCode, function(matched_string, pattern1) {
        return _this.getLoadingTag(matched_string, 'code');
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
        emoji_tag = emoji_code;
      }
      return element.fadeOut("normal", function() {
        element.after(emoji_tag);
        element.remove();
        if (match) {
          return emoji_tag.fadeIn("fast", function() {
            if (--_this.loadingNum === 0 && (_this.plugin.options.onComplete != null)) {
              return _this.plugin.options.onComplete(_this.plugin.element);
            }
          });
        } else {
          return _this.loadingNum--;
        }
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
      var checkComplete, checkSearchEnd, replaceCodeToEmojTag_replaceElement, searchEmoji_setEmojiTag, setEomojiTag, target_num,
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
            return _this.fadeOutLoadingTag_fadeInEmojiTag(loading_element, "" + loading_element[0].dataset.emoji, false);
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
      checkComplete = function() {
        if (--target_num === 0 && (_this.plugin.options.onComplete != null)) {
          return _this.plugin.options.onComplete(_this.plugin.element);
        }
      };
      checkSearchEnd = function(searches, element, text, code_emoji) {
        if (searches === 0) {
          return replaceCodeToEmojTag_replaceElement(element, text, code_emoji);
        }
      };
      replaceCodeToEmojTag_replaceElement = function(element, text, code_emoji) {
        var code, replaced_text, _i, _len;
        replaced_text = text;
        for (_i = 0, _len = code_emoji.length; _i < _len; _i++) {
          code = code_emoji[_i];
          replaced_text = replaced_text.replace(code.matched, function() {
            return _this.getEmojiTag(_this.replaceSpaceToUnder(code.code));
          });
        }
        $(element).replaceWith(replaced_text);
        return checkComplete();
      };
      setEomojiTag = function(element) {
        var code_emoji, searches, text;
        if (element.parentElement.tagName !== 'STYLE') {
          code_emoji = [];
          text = element.textContent.replace(_this.plugin.options.regexpUtf, function(matched_string) {
            var emoji;
            for (emoji in _this.plugin.options.utfEmojiData) {
              if (emoji === matched_string) {
                return _this.getEmojiTag(_this.plugin.options.utfEmojiData[emoji]);
              }
            }
          });
          if (text.match(_this.regexpCode)) {
            searches = 0;
            text.replace(_this.regexpCode, function() {
              return searches++;
            });
            return text.replace(_this.regexpCode, function(matched_string, pattarn1, offset, string) {
              var emoji_image;
              emoji_image = $("<img src='" + _this.plugin.ec.cdn_url + _this.plugin.ec.size_code + "/" + (_this.replaceSpaceToUnder(pattarn1)) + ".png'></img>");
              emoji_image.load(function(e) {
                searches--;
                code_emoji.push({
                  matched: matched_string,
                  code: pattarn1
                });
                return checkSearchEnd(searches, element, text, code_emoji);
              });
              return emoji_image.error(function(e) {
                searches--;
                return checkSearchEnd(searches, element, text, code_emoji);
              });
            });
          } else {
            $(element).replaceWith(text);
            return checkComplete();
          }
        }
      };
      if (this.plugin.options.useLoadingImg) {
        this.setLoadingTag(this.plugin);
        return searchEmoji_setEmojiTag(this.plugin.element);
      } else {
        target_num = 0;
        this.plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().filter(function(index, element) {
          if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
            return target_num++;
          }
        });
        return this.plugin.element.find(':not(iframe,textarea,script)').andSelf().contents().filter(function(index, element) {
          if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
            return setEomojiTag(element);
          }
        });
      }
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
        if (element.nodeType === Node.TEXT_NODE && element.textContent.match(/\S/)) {
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
