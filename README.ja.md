emojidex-web
============
emojidex-webにはウェブサイトやJavaScriptベースのアプリに様々なemojidexが使えるツールや
ウィジェットが含まれています。CoffeeScriptとSLIMのソースが簡単に使えるJavaScript
モジュールにコンパイルされます。  

普通の使い方では全ての絵文字が絵文字デックスのCDNから動的に取得されてクライアント側に
キャッシュつれます。自分のサーバーへのアップロードやアプリにパッケージする必要が
ありません。本モジュールが自己完結型でサイトやアプリ内の他の部分に影響しないはずです。  

仕様デモと機能解説:
[http://emojidex.github.io/emojidex-web](http://emojidex.github.io/emojidex-web)

使い方
--------
使い方は簡単です。

1. 下記を参考に必要なjavascriptとcssを読み込んでください。
```html
<head>
  ...
  <link href="css/emojidex.css" rel="stylesheet" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="js/emojidex.js"></script>
  ...
</head>
```
2. *coming soon*

ビルドの仕方
------------
nodeにnpmとgruntとbowerが必要です。

### ソースの取得
まだクローンしてなければ、以下の通りでクローンが出来ます。
```shell
git clone git@github.com:emojidex/emojidex-web.git
cd emojidex-web
```

### パッケージの取得
```shell
npm install
bower install
```

### ビルド
一発ビルド:
```shell
grunt
```
distの下に出力されます。

開発用の動的ビルド:
```shell
grunt dev
```
編集の際に再コンパイルされ、
[http://localhost:8000/dist/](http://localhost:8000/dist/)から見れます。

ライセンス
==========
emojidexとemojidex関連のツールが全て
[emojidex Open License](https://www.emojidex.com/emojidex/emojidex_open_license)
にてライセンスされています。

©2013emojidex / 幻信創造株式会社
