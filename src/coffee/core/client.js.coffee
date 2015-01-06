###
emojidex coffee client
* Provides search, index caching and combining and asset URI resolution

=LICENSE=
Licensed under the emojidex Open License
https://www.emojidex.com/emojidex/emojidex_open_license

Copyright 2013 Genshin Souzou Kabushiki Kaisha
###

class @EmojidexClient
  @defaults: { locale: 'en', pre_cache_utf: false, \
              api_uri: 'https://www.emojidex.com/api/v1/', cdn_uri: 'http://cdn.emojidex.com', \
              detailed: false, limit: 32 }
  constructor: (opts = {}) ->
    opts = $.extend {}, @defaults, opts

    # set end points
    @api_uri = opts.api_uri
    @cdn_uri = opts.cdn_uri

    # common opts
    @detailed = opts.detailed
    @limit = opts.limit

    # init arrays
    @emoji = opts.emoji || []
    @history = opts.history || []
    @favorites = opts.favorites || []
    @search_results = opts.search_results || []

    if @auto_login()
      get_history
      get_favorites

    if opts.pre_cache_utf
      switch opts.locale
        when 'en' then user_emoji('emoji')
        when 'ja' then user_emoji('絵文字')

  # Executes a general search (code_cont)
  search: (term, callback = null, opts) ->
    opts = @_combine_opts(opts)
    $.getJSON((@api_uri +  'search/emoji?' + $.param({code_cont: term} + opts)))
      .error (response) ->
        @search_results = []
      .success (response) ->
        @search_results = response.emoji
        _combine_emoji(response.emoji)
        callback(response.emoji) if callback

  # Breaks down a search string into arrays of search keys and tags and performs a search
  search_by_string: (search_string, page = 1, limit = 20) ->
    keys = []
    tags = []
    # TODO ストリングを分解する
    advanced_search(keys, tags, page, limit)

  # Searches using an array of keys and an array of tags
  advanced_search: (keys, tags = [], page = 1, limit = 20) ->
    codes = {}
    for key in keys
      alert (typeof key)

  # Executes a search query
  #query: (query_hash)
    # TODO fill in query stuff

  # Obtains a collection
  user_emoji: (username, callback = null, page = 1, limit = 20, detailed = false) ->
    $.getJSON((@api_uri +  'users/' + username + '/emoji?' + $.param({page: page, limit: limit, detailed: detailed})))
      .error (response) ->
        @search_results = []
      .success (response) ->
        @search_results = response.emoji
        _combine_emoji(response.emoji)
        callback(response.emoji) if callback

  # Checks for local saved login data, and if present sets the username and api_key
  auto_login: () ->
    @username = null
    @api_key = null
    # TODO ローカルを確認してクッキー度にログイン情報(usernameとapi_key)があれば使う
    # TODO api_keyの暗号を解かすことを忘れなく

  login: (username = null, password = nil) ->
    # TODO usernameとpasswordでログインし、成功したら@usernameと@api_keyを設定する. passwordを保存しないこと
    # TODO 絶対にapi_keyを保存する時に暗号化すること!

  get_history: (page = 1, limit = 50) ->
   # if @api_key != null
   #   # TODO get history

  set_history: (emoji_code) ->
   # if @api_key != null
   #   # TODO ユーザー履歴に追加
   # else
   #   # TODO グローバル履歴に追加

  get_favorites: (page = 1, limit = 50) ->
   # if @api_key != null
   #   # TODO get favorites

  set_favorites: (emoji_code) ->
   # if @api_key != null
   #   # TODO お気に入りに追加

  # Combines opts against common defaults
  _combine_opts: (opts) ->
    $.extend {}, { page: 1, limit: @limit, detailed: @detailed }, opts

  # Adds the given emoji array into the @emoji array and removes collisions/dupes
  _combine_emoji: (emoji) ->
    @emoji.push emoji...
    # TODO flatten array
