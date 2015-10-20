emojidex-web
============
emojidex-web contains coffeescript and SLIM sources which compile into a set of javascript jQuery
modules. Anyone can use these modules on their site to enable emoji without any complex
bundling or dealing with image assets or server-side processing. A variety of tools are
included which allow emojidex to be used for display in a variety of ways, automatic
conversion from emoji codes, and various types of emoji input tools and widgets.<br>
demo: http://emojidex.github.io/emojidex-web

使い方
--------
使い方は簡単です。

１：下記を参考に必要なjavascriptとcssを読み込んでください。
```html
<head>
  ...
  <link href="css/emojidex.css" rel="stylesheet" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="js/emojidex.js"></script>
  ...
</head>
```

２：emojidex-webのスクリプトを実行して下さい。

Building
--------
You will need node with a usable npm, grunt, bower. In general grunt and bower should be
installed globally or should be present and usable in your path. We'll assume you have a
working node/npm that you either installed using your package manager or built yourself.

### Get the source
First off we need the actual source to build. Clone this repository if you haven't already.
```shell
git clone git@github.com:emojidex/emojidex-web.git
cd emojidex-web
```

### Install Packages and Obtain Required Sources
```shell
npm install
bower install
```

### Build
For a regular one-off build:
```shell
grunt
```

For development mode with dynamic compilation and dev server:
```shell
grunt dev
```
A live version of the latest build will be availble at http://localhost:8000/dist/

License
=======
emojidex and emojidex tools are licensed under the [emojidex Open License](https://www.emojidex.com/emojidex/emojidex_open_license).

©2013 the emojidex project / Genshin Souzou K.K. [Phantom Creation Inc.]
