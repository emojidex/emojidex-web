###
emojidex coffee client
* Provides search, index caching and combining and asset URI resolution

=LICENSE=
Licensed under the emojidex Open License
https://www.emojidex.com/emojidex/emojidex_open_license

Copyright 2013 Genshin Souzou Kabushiki Kaisha
###

class EmojidexClient
  constructor: (pre_cache_utf = false,
                  locale = 'en',
                  api_uri = 'https://www.emojidex.com/api/v1/',
                  cdn_uri = 'http://cdn.emojidex.com') ->
    @api_uri = api_uri
    @cdn_uri = cdn_uri
    @emoji = []
    @history = []
    @favorites = []

    if auto_login
      get_history
      get_favorites

    if pre_cache_utf
      switch locale
        when 'en' then user_emoji('emoji')
        when 'ja' then user_emoji('絵文字')

  # Breaks down a search string into arrays of search keys and tags and performs a search
  search_by_string: (search_string, page = 1, limit = 20) ->
    keys = []
    tags = []
    # TODO ストリングを分解する
    search(keys, tags, page, limit)

  # Searches using an array of keys and an array of tags
  search: (keys, tags, page = 1, limit = 20) ->
    

  # Obtains a collection
  user_emoji: (callback, username, page = 1, limit = 20) ->
    $.getJSON((@api_uri +  'users/' + username + '/emoji?' + $.param({page: page, limit: limit})),
      (data) ->
        _cc(data, callback)
    )

  # Checks for local saved login data, and if present sets the username and api_key
  auto_login: () ->
    @username = nil
    @api_key = nil
    # TODO ローカルを確認してクッキー度にログイン情報(usernameとapi_key)があれば使う
    # TODO api_keyの暗号を解かすことを忘れなく

  login: (username = nil, password = nil) ->
    # TODO usernameとpasswordでログインし、成功したら@usernameと@api_keyを設定する. passwordを保存しないこと
    # TODO 絶対にapi_keyを保存する時に暗号化すること!

  get_history: (page = 1, limit = 50) ->
   # if @api_key != nil
   #   # TODO get history

  set_history: (emoji_code) ->
   # if @api_key != nil
   #   # TODO ユーザー履歴に追加
   # else
   #   # TODO グローバル履歴に追加

  get_favorites: (page = 1, limit = 50) ->
   # if @api_key != nil
   #   # TODO get favorites

  set_favorites: (emoji_code) ->
   # if @api_key != nil
   #   # TODO お気に入りに追加

  # Collects data and runs Callback
  _cc: (data, callback) ->
    alert data
