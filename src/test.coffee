(->
  
  # namespace
  window.cacheModule = window.cacheModule or {}
  
  # alias
  aCacheModule = window.cacheModule
  storage = window.localStorage
  
  # LocalStorageがサポートされているかの判定式
  supportStorage = storage
  PREFIX = "yoheimcache:"
  version = "?ver=3.0.3"
  
  # バージョンが変わっている場合には、キャッシュを削除する。
  (->
    if supportStorage
      ver = storage.getItem("yoheimVersion")
      if ver isnt version
        storage.clear()
        storage.setItem "yoheimVersion", version
    return
  )()
  
  # localStorage用のキー生成
  createKey = (str) ->
    PREFIX + str + version

  
  # バージョン付きのURL
  urlWithVersion = (url) ->
    url + version

  
  # 引数の内容から、imgタグを生成する。
  createImgTag = (src, cssClass, options) ->
    tag = "<img src=\"" + (src or "") + "\" class=\"" + (cssClass or "") + "\" "
    for prop of options
      tag += " " + prop + "=\"" + options[prop] + "\""  if options.hasOwnProperty(prop)
    tag += "/>"
    tag

  
  #
  #    画像のロード
  #  
  aCacheModule.loadImage = (src, cssClass, options) ->
    options = options or {}
    unless supportStorage
      
      # LocalStorageがサポートされていない場合は、imgタグを出力する
      document.write createImgTag(src, cssClass, options)
      return
    else
      
      # LocalStorageにキャッシュがある場合、その画像を表示する
      base64 = storage.getItem(createKey(src))
      if base64
        document.write createImgTag(base64, cssClass, options)
        return
      else
        
        # LocalStorageにキャッシュが無い場合は、imgタグを出力する
        document.write createImgTag(src, cssClass, options)
        
        # そして、その後画像を別途取得して、LocalStorageへ保存しておく
        window.addEventListener "load", (->
          canvas = document.createElement("canvas")
          return  if not canvas or not canvas.getContext or not canvas.getContext("2d")
          image = new Image()
          image.src = src
          image.onload = ->
            
            # 画像をbase64にするためにCanvasを利用するので、
            # クロスドメインの画像は無理かも。。
            canvas = document.createElement("canvas")
            canvas.width = @width
            canvas.height = @height
            canvas.getContext("2d").drawImage this, 0, 0
            base64 = canvas.toDataURL()
            storage.setItem createKey(src), base64
            return

          return
        ), false
    return

  return
)()