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

        ac = new EmojiAutoComplete @
        ac.setAutoComplete()

        # @emoji_pallet = new EmojiPallet @emoji_data_array, $("#ep"), @options
        # @emoji_pallet.setPallet()

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
      api_uri: 'https://www.emojidex.com/api/v1/'
      cdn_uri: 'http://cdn.emojidex.com/emoji'
      size_code: 'px32'
      detailed: false
      limit: 32
    opts = $.extend {}, @defaults, opts

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
    @page = opts.page || 1
    @count = opts.count || 0

    @_auto_login()

    # short-circuit next()
    @next = () ->
      null

  _init_storages: (opts) ->
    @storage = $.localStorage

    @storage.set("emojidex", {}) unless @storage.isSet("emojidex")

    @storage.set("emojidex.emoji", opts.emoji || []) unless @storage.isSet("emojidex.emoji")
    @emoji = @storage.get("emojidex.emoji")

    @storage.set("emojidex.history", opts.history || []) unless @storage.isSet("emojidex.history")
    @history = @storage.get("emojidex.history")

    @storage.set("emojidex.favorites", opts.favorites || []) unless @storage.isSet("emojidex.favorites")
    @favorites = @storage.get("emojidex.favorites")

    @storage.set("emojidex.categories", opts.categories || []) unless @storage.isSet("emojidex.categories")
    @categories = @storage.get("emojidex.categories")

    @_pre_cache(opts)

  _pre_cache: (opts) ->
    if @emoji.length == 0
      switch opts.locale
        when 'en'
          @user_emoji('emoji')
          @user_emoji('emojidex')
        when 'ja'
          @user_emoji('絵文字')
          @user_emoji('絵文字デックス')

    if @categories.length == 0
      @get_categories(null, {locale: opts.locale})

  # Checks for local saved login data, and if present sets the username and api_key
  _auto_login: () ->
    if @storage.get("emojidex.auth_token") != null
      @auth_status = @storage.get("emojidex.auth_status")
      @auth_token = @storage.get("emojidex.auth_token")
      @user = @storage.get("emojidex.user")
      @get_user_data()
    else
      @logout()

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

  # login
  # takes a hash with one of the following combinations:
  # 1. { authtype: 'plain', user: 'username-or-email', password: '****'}
  # 2. { authtype: 'google', #TODO
  # * if no hash is given auto login is attempted
  login: (params) ->
    switch params.authtype
      when 'plain'
        @_plain_login(params.username, params.password, params.callback)
      when 'google'
        @_google_login(params.callback)
      else
        @_auto_login()

  # logout:
  # 'logs out' by clearing user data
  logout: () ->
    @auth_status = 'none'
    @storage.set("emojidex.auth_status", @auth_status)
    @user = ''
    @storage.set("emojidex.user", @user)
    @auth_token = null
    @storage.set("emojidex.auth_token", @auth_token)

  _plain_login: (username, password, callback = null) ->
    $.getJSON((@api_uri +  'users/authenticate?' + \
      $.param({username: username, password: password})))
      .error (response) =>
        @auth_status = response.auth_status
        @auth_token = null
        @user = ''
      .success (response) =>
        @_set_auth_from_response(response)
        callback(response.auth_token) if callback

  _google_login: (callback = null) ->
    return false

  _set_auth_from_response: (response) ->
    @auth_status = response.auth_status
    @storage.set("emojidex.auth_status", @auth_status)
    @auth_token = response.auth_token
    @storage.set("emojidex.auth_token", @auth_token)
    @user = response.auth_user
    @storage.set("emojidex.user", @user)
    @get_user_data()

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
  simplify: (emoji = @results, size_code = @size_code) ->
    ({code: @_escape_term(moji.code), img_url: "#{@cdn_uri}/#{size_code}/#{@_escape_term(moji.code)}.png"} \
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

class EmojiAutoComplete
    constructor: (@plugin) ->

    setAutoComplete: ->
      setAtwho = (at_options) =>
        targets = [
          @plugin.options.emojiarea["plain_text"]
          @plugin.options.emojiarea["content_editable"]
        ]
        for target in targets
          target.atwho(at_options).on('reposition.atwho', (e) ->
            $(e.currentTarget).atwho(at_options)
          ).on('hidden.atwho', (e) ->
            $(e.currentTarget).atwho(at_options)
          )

      setSearchedEmojiData = (at_obj, match_string) ->
        updateAtwho = (searched_data) ->
          at_options =
            data: searched_data
            callbacks:
              matcher: (flag, subtext, should_startWithSpace) ->
                getMatchString subtext, getRegexp(flag, should_startWithSpace)

          at_obj.$inputor.atwho('destroy').atwho($.extend {}, at_obj.setting, at_options).atwho('run')

        # start: setSearchedEmojiData --------
        num = ++searching_num
        ec.search(match_string, (response) ->
          searched_data = ec.simplify()

          if searching_num == num
            updateAtwho(searched_data) if searched_data.length
        )
        return match_string

      getRegexp = (flag, should_startWithSpace) ->
        # À & ÿ
        _a = decodeURI("%C3%80")
        _y = decodeURI("%C3%BF")

        flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        flag = '(?:^|\\s)' + flag if should_startWithSpace

        regexp = new RegExp "#{flag}([A-Za-z#{_a}-#{_y}0-9_\+\-]*)$|#{flag}([^\\x00-\\xff]*)$",'gi'

      getMatchString = (subtext, regexp) ->
        match = regexp.exec subtext
        match = if match then match[2] || match[1] else null

      # start: setAutoComplete --------
      searching_num = 0
      ec = new EmojidexClient
      at_init =
        at: ":"
        limit: 10
        search_key: "code"
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        insert_tpl: "<img src='${img_url}' height='20' width='20' />"
        callbacks:
          matcher: (flag, subtext, should_startWithSpace) ->
            match = getMatchString subtext, getRegexp(flag, should_startWithSpace)
            setSearchedEmojiData(@, match) if match

      setAtwho(at_init)

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
        emoji.img_url = "http://cdn.emojidex.com/emoji/px32/#{emoji.code}.png"

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
