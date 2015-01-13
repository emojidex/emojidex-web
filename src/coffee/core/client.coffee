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

    # short-circuit next()
    @next = () ->
      null

    @auto_login()

  _init_storages: (opts) ->
    @storage = $.localStorage

    @storage.set("emojidex", {}) if @storage.get("emojidex") == null

    @storage.set("emojidex.emoji", []) if @storage.get("emojidex.emoji") == null
    @emoji = opts.emoji || @storage.get("emojidex.emoji")

    @storage.set("emojidex.history", []) if @storage.get("emojidex.history") == null
    @history = opts.history || @storage.get("emojidex.history")

    @storage.set("emojidex.favorites", []) if @storage.get("emojidex.favorites") == null
    @favorites = opts.favorites || @storage.get("emojidex.favorites")

    @storage.set("emojidex.categories", []) if @storage.get("emojidex.categories") == null
    @categories = opts.categories || @storage.get("emojidex.categories")

    @_pre_cache(opts)

  _pre_cache: (opts) ->
    if opts.pre_cache_utf
      switch opts.locale
        when 'en' then @user_emoji('emoji')
        when 'ja' then @user_emoji('絵文字')

    if opts.pre_cache_extended
      switch opts.locale
        when 'en' then @user_emoji('emojidex')
        when 'ja' then @user_emoji('絵文字デックス')

    if opts.pre_cache_categories
      @get_categories(null, {locale: opts.locale})

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
