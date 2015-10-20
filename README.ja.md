emojidex-web
============
emojidex-webはウェブサイトやJavaScriptベースのアプリ等で、emojidexの様々なサービスが使えるツールや、
ウィジェットが含まれたjQueryプラグインです。

開発にはCoffeeScriptとSlimを使用しています。そこから簡単に使えるJavaScriptモジュールにコンパイルされます。  

このライブラリを使用してemojidexのサービスを利用する際には、使用される全ての絵文字はemojidexのCDNから自動的に取得され、クライアント側にキャッシュされます。
それにより、絵文字を自身のサーバーへアップロードしたり、アプリに追加する必要はありません。


デモと機能解説:
[http://emojidex.github.io/emojidex-web](http://emojidex.github.io/emojidex-web)

使い方
--------
使い方は簡単です。

###1\. 下記を参考に必要なjavascriptとcssを読み込んでください。
```html
<head>
  ...
  <link href="css/emojidex.css" rel="stylesheet" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="js/emojidex.js"></script>
  ...
</head>
```
###2\. emojidex-webの設定

#### via JavaScript
```js
$(document).ready(function() {
  $("body").emojidexReplace();
  $(".emojidex-plain_text").emojidexAutocomplete();
  $(".emojidex-content_editable").emojidexAutocomplete();
});
```
以上で終了です。

##機能説明
### .emojidexReplace()
指定されたエレメントのテキスト要素を全文検索し、「:」で囲まれた絵文字コード（例：「:smile:」）と、UTF絵文字（例：「😄」）を対応したemojidexの絵文字画像に置き換えます。
emojidexに対応した絵文字が無い場合は、元のテキストがそのまま使用されます。

=画像

### Options
#### Default options
```js
$('*').emojidexReplace({
  onComplete: undefined,
  useLoadingImg: true,
});
```
#### options.onComplete
Type: `Function(jQueryエレメント)` Dfault: `undefined`
絵文字が置き換わった後に実行する関数を指定する事が出来ます。引数に置換が完了した、ターゲットエレメントのjQueryエレメントが入ります。

例：
```js
$("body").emojidexReplace({
  onComplete: function(element) {
    console.log('Completed emojidexReplace!!');
  }
});
```

#### options.useLoadingImg
Type: `Boolean` Dfault: `true`
置換実行中にローディング画像を表示するか、しないかを設定出来ます。



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
