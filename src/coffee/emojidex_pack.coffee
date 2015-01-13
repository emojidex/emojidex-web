###
emojidex coffee plugin for jQuery/Zepto and compatible

=LICENSE=
Licensed under the emojidex Open License
https://www.emojidex.com/emojidex/emojidex_open_license

Copyright 2013 Genshin Souzou Kabushiki Kaisha
###

do ($ = jQuery, window, document) ->
  pluginName = "emojidex"
  defaults =
    emojiarea:
      plain_text: ".emojidex-plain_text"
      content_editable: ".emojidex-content_editable"

  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(@, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))

  class Plugin
    constructor: (@element, options) ->
      @emoji_data_array = []

      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName

      @api_emoji = new EmojiLoaderService @element, @options
      @api_emoji.load =>
        @emoji_data_array.push @api_emoji.emoji_data
        @checkLoadedEmojiData()

    checkLoadedEmojiData: ->
      if @emoji_data_array
        @setAutoComplete @options

        # @emoji_pallet = new EmojiPallet @emoji_data_array, $("#ep"), @options
        # @emoji_pallet.setPallet()

    setAutoComplete: (options) ->
      emoji = []
      for emoji_data in @emoji_data_array
        for category of emoji_data
          for moji in emoji_data[category]
            emoji.push
              code: moji.code
              img_url: moji.img_url

      testCallback = (data)->
        console.log 111

      at_config =
        callback: testCallback
        at: ":"
        limit: 10
        search_key: "code"
        data: emoji
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        insert_tpl: "<img src='${img_url}' height='20' width='20' />"
      $(options.emojiarea["plain_text"]).atwho(at_config)
      $(options.emojiarea["content_editable"]).atwho(at_config)

    setEmojiarea: (options) ->
      options.emojiarea["plaintext"].emojiarea wysiwyg: false
      # options.emojiarea["wysiwyg"].emojiarea wysiwyg: true
      options.emojiarea["wysiwyg"].on "change", ->
        console.dir @
        # console.dir options.emojiarea["rawtext"].text
        options.emojiarea["rawtext"].text $(this).val()
      options.emojiarea["wysiwyg"].trigger "change"

###
emojidex coffee client
* Provides search, index caching and combining and asset URI resolution

=LICENSE=
Licensed under the emojidex Open License
https://www.emojidex.com/emojidex/emojidex_open_license

Copyright 2013 Genshin Souzou Kabushiki Kaisha
###

class @EmojidexClient
  constructor: (opts = {}) ->
    @defaults =
      locale: 'en'
      pre_cache_utf: false
      pre_cache_extended: false
      pre_cache_categories: true
      api_uri: 'https://www.emojidex.com/api/v1/'
      cdn_uri: 'http://cdn.emojidex.com/emoji'
      size_code: 'px32'
      detailed: false
      limit: 32

    opts = $.extend {}, @defaults, opts
    
    @storage = $.localStorage

    # set end points
    @api_uri = opts.api_uri
    @cdn_uri = opts.cdn_uri
    @size_code = opts.size_code

    # common opts
    @detailed = opts.detailed
    @limit = opts.limit

    # init storage and state instances
    @_init_storages(opts)
    @results = opts.results || []
    @page = 1
    @count = 0

    # short-circuit next()
    @next = () ->
      null

    @auto_login()

    if opts.pre_cache_utf
      switch opts.locale
        when 'en' then @user_emoji('emoji')
        when 'ja' then @user_emoji('絵文字')

    if opts.pre_cache_extended
      switch opts.locale
        when 'en' then @user_emoji('emojidex')
        when 'ja' then @user_emoji('絵文字デックス')

  _init_storages: (opts) ->
    @storage.set("emojidex", {}) if @storage.get("emojidex") == null

    @storage.set("emojidex.emoji", []) if @storage.get("emojidex.emoji") == null
    @emoji = opts.emoji || @storage.get("emojidex.emoji")

    @storage.set("emojidex.history", []) if @storage.get("emojidex.history") == null
    @history = opts.history || @storage.get("emojidex.history")

    @favorites.set("emojidex.favorites", []) if @storage.get("emojidex.favorites") == null
    @favorites = opts.favorites || @storage.get("emojidex.favorites")

    @categories = opts.categories || \
      (@get_categories(null, {locale: opts.locale}) if opts.pre_cache_categories)

  # Executes a general search (code_cont)
  search: (term, callback = null, opts) ->
    @next = () ->
      @search(term, callback, $.extend(opts, {page: opts.page + 1}))
    opts = @_combine_opts(opts)
    $.getJSON((@api_uri +  'search/emoji?' + $.param(($.extend {}, \
        {code_cont: @_escape_term(term)}, opts))))
      .error (response) =>
        @results = []
      .success (response) =>
        @_succeed(response, callback)

  # Searches by a tag
  tag_search: (tags, callback = null, opts) ->
    @next = () ->
      @tag_search(term, callback, $.extend(opts, {page: opts.page + 1}))
    opts = @_combine_opts(opts)
    $.getJSON((@api_uri +  'search/emoji?' + $.param(($.extend {}, \
        {"tags[]": @_breakout(tags)}, opts))))
      .error (response) =>
        @results = []
      .success (response) =>
        @_succeed(response, callback)

  # Searches using an array of keys and an array of tags
  advanced_search: (term, tags = [], categories = [], callback = null, opts) ->
    @next = () ->
      @advanced_search(term, tags, categories, callback, $.extend(opts, {page: opts.page + 1}))
    opts = @_combine_opts(opts)
    params = {code_cont: @_escape_term(term)}
    params = $.extend(params, {"tags[]": @_breakout(tags)}) if tags.length > 0
    params = $.extend(params, {"categories[]": @_breakout(categories)}) if categories.length > 0
    $.getJSON((@api_uri +  'search/emoji?' + $.param(($.extend params, opts))))
      .error (response) =>
        @results = []
      .success (response) =>
        @_succeed(response, callback)

  # Obtains a user emoji collection
  user_emoji: (username, callback = null, opts) ->
    opts = @_combine_opts(opts)
    $.getJSON((@api_uri +  'users/' + username + '/emoji?' + $.param(opts)))
      .error (response) =>
        @results = []
      .success (response) =>
        @_succeed(response, callback)

  # Gets the full list of caetgories available
  get_categories: (callback = null, opts) ->
    opts = @_combine_opts(opts)
    $.getJSON((@api_uri +  'categories?' + $.param(opts)))
      .error (response) =>
        @categories = []
        @storage.set("emojidex.categories", @categories)
      .success (response) =>
        @categories = response.categories
        @storage.set("emojidex.categories", @categories)
        callback(response.categories) if callback

  # Checks for local saved login data, and if present sets the username and api_key
  auto_login: () ->
    @auth_token = null
    @user = ''
    @auth_status = 'none'
    #@username = @storage.get("emojidex.username") || null
    # TODO ローカルを確認してクッキー度にログイン情報(usernameとapi_key)があれば使う
    # TODO api_keyの暗号を解かすことを忘れなく


  login: (params = {username: null, authtype: 'none'}) ->
    switch params.authtype
      when "none"
        # TODO check for user auth
        return
      when "plain"
        @_plain_login(params.username, params.password, params.callback)
      when "google"
        @_google_login(params.callback)
      else
        return

  _plain_login: (username, password, callback = null) ->
    $.getJSON((@api_uri +  'users/authenticate?' + \
      $.param({username: username, password: password})))
      .error (response) =>
        @auth_status = response.auth_status
        @api_token = null
        @user = ''
      .success (response) =>
        @auth_status = response.auth_status
        @auth_token = response.auth_token
        @user = response.auth_user
        @get_user_data()
        callback(response.auth_token) if callback

  _google_login: (callback = null) ->
    return false

  get_user_data: () ->
    @get_favorites()
    @get_history()

  get_history: (opts) ->
    if @auth_token != null
      $.getJSON((@api_uri +  'users/history?' + $.param({auth_token: @auth_token})))
        .error (response) =>
          @history = []
        .success (response) =>
          @history = response

  set_history: (emoji_code) ->
   # if @api_key != null
   #   # TODO ユーザー履歴に追加
   # else
   #   # TODO グローバル履歴に追加

  get_favorites: () ->
    if @auth_token != null
      $.getJSON((@api_uri +  'users/favorites?' + $.param({auth_token: @auth_token})))
        .error (response) =>
          @favorites = []
        .success (response) =>
          @favorites = response

  set_favorites: (emoji_code) ->
   # if @api_key != null
   #   # TODO お気に入りに追加

  # Concatenates and flattens the given emoji array into the @emoji array
  combine_emoji: (emoji) ->
    $.extend @emoji, emoji

  # Converts an emoji array to [{code: "moji_code", img_url: "http://cdn...moji_code.png}] format
  simplify: (emoji = @emoji, size_code = @size_code) ->
    ({code: @_de_escape_term(moji.code), img_url: "#{@cdn_uri}/#{size_code}/#{moji.code}.png"} \
      for moji in emoji)

  # Combines opts against common defaults
  _combine_opts: (opts) ->
    $.extend {}, { page: 1, limit: @limit, detailed: @detailed }, opts

  # fills in @results, @page, and @count and calls callback
  _succeed: (response, callback) ->
    @results = response.emoji
    @page = response.meta.page
    @count = response.meta.count
    @combine_emoji(response.emoji)
    callback(response.emoji) if callback

  # Breakout into an array
  _breakout: (items) ->
    return [] if items == null
    items = [items] unless items instanceof Array
    items

  # Escapes spaces to underscore
  _escape_term: (term) ->
    term.split(' ').join('_')

  # De-Escapes underscores to spaces
  _de_escape_term: (term) ->
    term.split('_').join(' ')

class EmojiLoader
  emoji_data: null
  element: null
  options: null
  emoji_regexps: null

  getCategorizedData: (emoji_data) ->
    new_emoji_data = {}
    for emoji in emoji_data

      if emoji.category is null
        unless new_emoji_data.uncategorized?
          new_emoji_data.uncategorized = [emoji]
        else
          new_emoji_data.uncategorized.push emoji

      else
        unless new_emoji_data[emoji.category]?
          new_emoji_data[emoji.category] = [emoji]
        else
          new_emoji_data[emoji.category].push emoji

    return new_emoji_data

  setEmojiCSS_getEmojiRegexps: (emoji_data) ->
    regexp_for_utf = ""
    regexp_for_code = ":("

    emoji_css = $('<style type="text/css" />')
    for category of emoji_data
      emoji_in_category = emoji_data[category]
      for emoji in emoji_in_category
        regexp_for_utf += emoji.moji + "|"
        regexp_for_code += emoji.code + "|"
        emoji_css.append "i.emojidex-" + emoji.code + " {background-image: url('" + emoji.img_url + "')}"
    $("head").append emoji_css
    
    return utf: regexp_for_utf.slice(0, -1), code: regexp_for_code.slice(0, -1) + "):"

  getEmojiTag: (emoji_code) ->
    return '<i class="emojidex-' + emoji_code + '"></i>'
  
  replaceForUTF: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string) ->
      for category of options.emoji_data
        for emoji in options.emoji_data[category]
          if emoji.moji is matched_string
            return EmojiLoader::getEmojiTag emoji.code
  
  replaceForCode: (options) ->
    replaced_string = options.s_replace.replace new RegExp(options.regexp, "g"), (matched_string) ->
      matched_string = matched_string.replace /:/g, ""
      for category of options.emoji_data
        for emoji in options.emoji_data[category]
          if emoji.code is matched_string
            return EmojiLoader::getEmojiTag emoji.code

  setEmojiIcon: (loader) ->
    $(@element).find(":not(iframe,textarea,script)").andSelf().contents().filter(->
      @nodeType is Node.TEXT_NODE
    ).each ->
      replaced_string = @textContent
      replaced_string = EmojiLoader::replaceForUTF s_replace: replaced_string, regexp: loader.emoji_regexps.utf, emoji_data: loader.emoji_data if loader.emoji_regexps.utf?
      replaced_string = EmojiLoader::replaceForCode s_replace: replaced_string, regexp: loader.emoji_regexps.code, emoji_data: loader.emoji_data if loader.emoji_regexps.code?
      $(@).replaceWith replaced_string

class EmojiLoaderService extends EmojiLoader
  constructor: (@element, @options) ->
    super

  load: (callback)->
    onLoadEmojiData = (emoji_data) =>
      # fix data for At.js --------
      for emoji in emoji_data
        emoji.code = emoji.code.replace RegExp(" ", "g"), "_"
        emoji.img_url = "http://assets.emojidex.com/emoji/px32/#{emoji.code}.png"

      # console.dir emoji_data
      @emoji_data = @getCategorizedData emoji_data
      @emoji_regexps = @setEmojiCSS_getEmojiRegexps @emoji_data
      @setEmojiIcon @
      callback @

    # start main --------
    @getEmojiDataFromAPI onLoadEmojiData
    @

  getEmojiDataFromAPI: (callback) ->
    loaded_num = 0
    user_names = ["emojidex", "emoji"]
    emoji_data = []

    for user_name in user_names
      $.ajaxSetup beforeSend: (jqXHR, settings) ->
        # set user_name for loaded flag
        jqXHR.user_name = user_name

      $.ajax
        url: "https://www.emojidex.com/api/v1/users/" + user_name + "/emoji"
        dataType: "json"
        type: "get"

        success: (user_emoji_json, status, xhr) ->
          # console.log "success: load json"
          emoji_data = emoji_data.concat user_emoji_json.emoji
          if ++loaded_num is user_names.length
            callback emoji_data

        error: (data) ->
          console.log "error: load json"
          console.log data

class EmojiPallet
  constructor: (@emoji_data_array, @element, @options) ->
    @KEY_ESC = 27
    @KEY_TAB = 9

  setPallet: ->
    # console.log @options

    # @element.click ->
    #   showPallet()
