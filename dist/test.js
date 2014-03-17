(function() {
  (function() {
    var PREFIX, aCacheModule, createImgTag, createKey, storage, supportStorage, urlWithVersion, version;
    window.cacheModule = window.cacheModule || {};
    aCacheModule = window.cacheModule;
    storage = window.localStorage;
    supportStorage = storage;
    PREFIX = "yoheimcache:";
    version = "?ver=3.0.3";
    (function() {
      var ver;
      if (supportStorage) {
        ver = storage.getItem("yoheimVersion");
        if (ver !== version) {
          storage.clear();
          storage.setItem("yoheimVersion", version);
        }
      }
    })();
    createKey = function(str) {
      return PREFIX + str + version;
    };
    urlWithVersion = function(url) {
      return url + version;
    };
    createImgTag = function(src, cssClass, options) {
      var prop, tag;
      tag = "<img src=\"" + (src || "") + "\" class=\"" + (cssClass || "") + "\" ";
      for (prop in options) {
        if (options.hasOwnProperty(prop)) {
          tag += " " + prop + "=\"" + options[prop] + "\"";
        }
      }
      tag += "/>";
      return tag;
    };
    aCacheModule.loadImage = function(src, cssClass, options) {
      var base64;
      options = options || {};
      if (!supportStorage) {
        document.write(createImgTag(src, cssClass, options));
        return;
      } else {
        base64 = storage.getItem(createKey(src));
        if (base64) {
          document.write(createImgTag(base64, cssClass, options));
          return;
        } else {
          document.write(createImgTag(src, cssClass, options));
          window.addEventListener("load", (function() {
            var canvas, image;
            canvas = document.createElement("canvas");
            if (!canvas || !canvas.getContext || !canvas.getContext("2d")) {
              return;
            }
            image = new Image();
            image.src = src;
            image.onload = function() {
              canvas = document.createElement("canvas");
              canvas.width = this.width;
              canvas.height = this.height;
              canvas.getContext("2d").drawImage(this, 0, 0);
              base64 = canvas.toDataURL();
              storage.setItem(createKey(src), base64);
            };
          }), false);
        }
      }
    };
  })();

}).call(this);
