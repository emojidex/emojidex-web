emojidex-web
============
emojidex-webはウェブサイトやJavaScriptベースのアプリ等で、emojidexの様々なサービスが使えるツールや、
ウィジェットが含まれたjQueryプラグインです。

開発にはCoffeeScriptとSlimを使用しています。そこから簡単に使えるJavaScriptモジュールにコンパイルされます。  

このライブラリを使用してemojidexのサービスを利用する際には、使用される全ての絵文字はemojidexのCDNから自動的に取得され、クライアント側にキャッシュされます。
それにより、絵文字を自身のサーバーへアップロードしたり、アプリに追加する必要はありません。


デモと機能説明:
[http://emojidex.github.io/emojidex-web](http://emojidex.github.io/emojidex-web)

使い方
--------
使い方は簡単です。

###1\. 下記を参考に必要なjavascriptとcssを読み込んでください。
```html
<head>
  ...
  <link href="http://assets.emojidex.com/scripts/css/emojidex-web.min.css" rel="stylesheet" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="http://assets.emojidex.com/scripts/javascript/emojidex-web.min.js"></script>
  ...
</head>
```
###2\. emojidex-webの設定

#### via JavaScript
```js
$(document).ready(function() {
  ...
  $("body").emojidexReplace();
  $(".emojidex-plain_text").emojidexAutocomplete();
  $(".emojidex-content_editable").emojidexAutocomplete();
  ...
});
```
以上で終了です。

##機能説明
### .emojidexReplace()
指定されたエレメントのテキスト要素を全文検索し、「:」で囲まれた絵文字コード（例：「`:smile:`」）と、UTF絵文字（例：「😄」）を対応したemojidexの絵文字画像に置き換えます。
emojidexに対応した絵文字が無い場合は、元のテキストがそのまま使用されます。

```
emojidexReplace :kissing_heart:

UTF moji codes to emoji:
❤🛅😄😡💌😈👍#️⃣

:code: to emoji:
❤:octopus::boar::frog:\:hand_salute: no_match:😄::no match::heart eyes(wh):
```

↓

![emojidex replace image](http://emojidex.github.io/emojidex-web/img/emojidex_replace.png)

### Options
#### Default options
```js
emojidexReplace({
  onComplete: undefined,
  useLoadingImg: true,
});
```
#### options.onComplete
Type: `Function(jQueryエレメント)` Default: `undefined`

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
Type: `Boolean` Default: `true`

置換実行中にローディング画像を表示するか、しないかを設定出来ます。

### .emojidexAutocomplete()
input, textarea, [contenteditable=true]で「:」から始まる文字列を使ってemojidexの対応絵文字検索し、候補をリスト表示します。

input, textareaでは候補を選択すると「:【対応する絵文字コード】:」がプレーンテキストで挿入されます。
[contenteditable="true"]では、候補に表示される絵文字の画像が挿入されます。

### Options
#### Default options
```js
emojidexAutocomplete({
  listLimit: 10,
  insertImg: true
});
```
#### options.listLimit
Type: `Int` Default: `10`

候補リストの最大数を設定出来ます。

#### options.insertImg
Type: `Boolean` Default: `true`

ターゲットが[contenteditable=true]の時に画像挿入するか、プレーンテキストを挿入するかの設定が出来ます。
`false`に設定するとプレーンテキストが挿入されます。

ビルドの仕方
------------
nodeにnpmとgruntとbowerが必要です。

### ソースの取得
まだクローンしていなければ、以下を実行する事でクローンが出来ます。
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
distフォルダ内に出力されます。

開発用の動的ビルド:
```shell
grunt dev
```
編集の際に再コンパイルされ、
[http://localhost:8000/dist/](http://localhost:8000/dist/)
から確認出来ます。

ライセンス
==========
emojidexとemojidex関連のツール全てが
[emojidex Open License](https://www.emojidex.com/emojidex/emojidex_open_license)
にてライセンスされています。

©2013emojidex / 幻信創造株式会社
