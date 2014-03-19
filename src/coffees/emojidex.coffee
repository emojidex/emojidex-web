###
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
###

class EmojisLoader
  emojis_data: null
  element: null
  options: null

class EmojisLoaderPOE extends EmojisLoader
  constructor: (@element, @options) ->
    super

  load: ->
    onLoadEmojisData = (emojis_data) =>
      @emojis_data = @getCategorizedData emojis_data
      @emoji_regexps = @setEmojiCSS_getEmojiRegexps @emojis_data
      @setEmojiIcon @emojis_data
      # Plugin::prepareAutoComplete emojis_data, options
      
    # start main --------
    $.getJSON @options.path_json, onLoadEmojisData

  getCategorizedData: (emojis_data) ->
    new_emojis_data = {}
    for emoji in emojis_data
      unless new_emojis_data[emoji.category]? 
        new_emojis_data[emoji.category] = [emoji]
      else
        new_emojis_data[emoji.category].push emoji
    return new_emojis_data

  setEmojiCSS_getEmojiRegexps: (emojis_data) ->
    regexp_for_utf = ""
    regexp_for_code = ":("

    emojis_css = $('<style type="text/css" />')
    for category of emojis_data
      emojis_in_category = emojis_data[category]
      for emoji in emojis_in_category
        regexp_for_utf += emoji.moji + "|"
        regexp_for_code += emoji.code + "|"
        emojis_css.append "i.emojidex-" + emoji.moji + " {background-image: url('" + $.emojiarea.path + emoji.code + ".svg')}"
    $("head").append emojis_css
    
    return [regexp_for_utf.slice(0, -1), regexp_for_code.slice(0, -1) + "):"]

  setEmojiIcon: (emojis_data) ->
    getEmojiTag = (emoji_utf) ->
      return '<i class="emojidex-' + emoji_utf + '"></i>'
    
    replaceForUTF = (replaced_string) =>
      replaced_string = replaced_string.replace new RegExp(@emoji_regexps[0], "g"), (matched_string) ->
        return getEmojiTag matched_string
    
    replaceForCode = (replaced_string, emojis_data) =>
      replaced_string = replaced_string.replace new RegExp(@emoji_regexps[1], "g"), (matched_string) ->
        matched_string = matched_string.replace /:/g, ""
        for category of emojis_data
          for emoji in emojis_data[category]
            if emoji.code is matched_string
              return getEmojiTag emoji.moji

    # start main --------
    $(@element).find(":not(iframe,textarea,script)").andSelf().contents().filter(->
      @nodeType is Node.TEXT_NODE
    ).each ->
      replaced_string = @textContent
      replaced_string = replaceForUTF replaced_string
      replaced_string = replaceForCode replaced_string, emojis_data
      $(@).replaceWith replaced_string


class EmojisLoaderAPI extends EmojisLoader
  constructor: (@json_url) ->
    super
    console.log 222

do ($ = jQuery, window, document) ->
  pluginName = "emojidex"
  defaults =
    emojiarea:
      plaintext: "emojidex-plaintext"
      wysiwyg: "emojidex-wysiwyg"
      value_output: "emojidex-rawtext"

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))

  class Plugin
    constructor: (@element, options) ->
      # start main --------
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @setEmojiarea @options
      $.emojiarea.path = options.path_img
      
      @poe_emojis = new EmojisLoaderPOE @element, @options
      @poe_emojis.load()

      @api_emojis = new EmojisLoaderAPI

    getEmojiDataFromAPI: (callback) ->
      $.ajax
        url: "https://www.emojidex.com/api/v1/emoji"
        dataType: "jsonp"
        jsonpCallback: "callback"
        type: "get"
        success: (emojis_data) ->
          console.log "success: load jsonp"
          console.log emojis_data
          # callback emojis_data
          return
        error: (data) ->
          console.log "error: load jsonp"
          console.log data
          return

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        options.emojiarea["value_output"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"

    prepareAutoComplete: (emojis_data, options) ->
      emojis = []
      for category of emojis_data
        for emoji in emojis_data[category]
          emojis.push emoji.code
      emojis = $.map emojis, (value) ->
        key: value
        name: value

      emoji_config =
        at: ":"
        data: emojis
        tpl: "<li data-value=':${key}:'><img src='../src/assets/img/utf/${name}.svg'  height='20' width='20' /> ${name}</li>"
        insert_tpl: "<img src='../src/assets/img/utf/${name}.svg' height='20' width='20' />"
      options.emojiarea["plaintext"].atwho(emoji_config)
      options.emojiarea["wysiwyg"].atwho(emoji_config)
