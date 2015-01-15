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
      # api_uri: 'https://www.emojidex.com/api/v1/'
      api_uri: 'http://localhost:3000/api/v1/'
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
    @cur_page = opts.page || 1
    @cur_limit = @limit
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
  # 1. { authtype: 'plain', username: 'username-or-email', password: '****'}
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

  # regular login with username/email and password
  _plain_login: (username, password, callback = null) ->
    url = @api_uri + 'users/authenticate?' + $.param(username: username, password: password)
    $.getJSON(url)
      .error (response) =>
        @auth_status = response.auth_status
        @auth_token = null
        @user = ''
      .success (response) =>
        @_set_auth_from_response(response)
        callback(response.auth_token) if callback

  # auth with google oauth2
  _google_login: (callback = null) ->
    return false

  # sets auth parameters from a successful auth request [login]
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
    if @auth_token != null
      $.post(@api_uri + 'users/history?' + \
        $.param({auth_token: @auth_token, emoji_code: emoji_code}))

  get_favorites: () ->
    if @auth_token != null
      $.ajax
        url: @api_uri + 'users/favorites'
        data:
          auth_token: @auth_token

        success: (response) ->
          @favorites = response

        error: (response) ->
          @favorites = []

  set_favorites: (emoji_code) ->
    if @auth_token != null
      $.ajax
        type: 'POST'
        url: @api_uri + 'users/favorites'
        data:
          auth_token: @auth_token
          emoji_code: emoji_code

        success: (response) ->
          # @get_favorites() # re-obtain favorites

  unset_favorites: (emoji_code) ->
    if @auth_token != null
      $.ajax
        type: 'DELETE'
        url: @api_uri + 'users/favorites'
        data:
          auth_token: @auth_token
          emoji_code: emoji_code

        success: (response) ->
          # @get_favorites()

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

  # fills in @results, @cur_page, and @count and calls callback
  _succeed: (response, callback) ->
    @results = response.emoji
    @cur_page = response.meta.page
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
