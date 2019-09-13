emojidex-web
============
emojidex-webはウェブサイトやJavaScriptベースのアプリ等で、emojidexの様々なサービスが使える
ツールや、ウィジェットが含まれたjQueryプラグインです。

開発にはCoffeeScriptとSlimを使用しています。そこから簡単に使えるJavaScriptモジュールに
コンパイルされます。  

このライブラリを使用してemojidexのサービスを利用する際には、使用される全ての絵文字はemojidexの
CDNから自動的に取得され、クライアント側にキャッシュされます。
それにより、絵文字を自身のサーバーへアップロードしたり、アプリに追加する必要はありません。


デモと機能説明:
[http://emojidex.github.io/emojidex-web](http://emojidex.github.io/emojidex-web)

使い方
------
使い方は簡単です。

1\. 下記を参考に必要なjavascriptとcssを読み込んでください。
```html
<head>
  ...
  <link href="http://cdn.emojidex.com/scripts/css/emojidex.min.css" rel="stylesheet" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="http://cdn.emojidex.com/scripts/javascript/emojidex.min.js"></script>
  ...
</head>
```
2\. emojidex-webの設定  
JavaScriptで使う場合
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

機能説明
--------
### .emojidexReplace()
指定されたエレメントのテキスト要素を全文検索し、「:」で囲まれた絵文字コード
（例：「`:smile:`」）と、UTF絵文字（例：「`😄`」）を対応したemojidexの絵文字画像に置き換えます。
emojidexに対応した絵文字が無い場合は、元のテキストがそのまま使用されます。

```
emojidexReplace :kissing_heart:

UTF moji codes to emoji:
❤🛅😄😡💌💌😈👍💩
💙💙💙

Acknowledged ZWJ emoji:
👨‍👩‍👦

:code: to emoji:
❤:octopus::boar::frog:\:hand_salute: no_match:😄::no match::heart eyes(wh):
```

↓

![emojidex replace image](http://emojidex.github.io/emojidex-web/img/samples/emojidex_replace.png)

### Options
#### Defaults
```js
emojidexReplace({
  useLoadingImg: true,
  autoUpdate: true,
  selector: '*',
  ignore: 'script, noscript, canvas, img, style, iframe, input, textarea, pre, code',
  ignoreContentEditable: true
});
```

#### options.useLoadingImg
Type: `Boolean` Default: `true`

置換実行中に[CSSに指定されている]ローディング画像を表示するか、しないかを設定出来ます。

#### options.autoUpdate
Type: `Boolean` Default: `true`

Ajax処理等で、動的に追加された要素に対しても置換処理を行うかを`Boolean`で指定出来ます。

#### options.selector
Type: `String` Default: `*`

置換処理を許可する要素を文字列で指定出来ます。　※options.ignoreの後に判定します。

#### options.ignore
Type: `String` Default: `script, noscript, canvas, img, style, iframe, input, textarea, pre, code`

置換処理を除外する要素を文字列で指定出来ます。

#### options.ignoreContentEditable
Type: `Boolean` Default: `true`

[contenteditable="true"]の要素の置換を無視するかどうかを設定出来ます。


### .emojidexAutocomplete()
input, textarea, [contenteditable="true"]で「:」から始まる文字列を使ってemojidexの対応絵文字検索し、
候補をリスト表示します。

input, textareaでは候補を選択すると「:【対応する絵文字コード】:」がプレーンテキストで挿入されます。
[contenteditable="true"]では、候補に表示される絵文字の画像が挿入されます。

### Options
#### Default options
```js
emojidexAutocomplete({
  listLimit: 15,
  content_editable: {
    insertImg: true
  }
});
```

#### options.listLimit
Type: `Int` Default: `15`

候補リストの最大数を設定出来ます。

#### options.content_editable.insertImg
Type: `Boolean` Default: `true`

ターゲットが[contenteditable="true"]の時に画像挿入するか、プレーンテキストを挿入するかの設定が
出来ます。
`false`に設定するとプレーンテキストが挿入されます。


### .emojidexPalette()
設定された要素をクリックする事で、様々な機能を持った絵文字パレットを表示する事が出来ます。

パレットの絵文字タイルをクリックすると、クリップボードに絵文字のコードがコピーされます。
また、絵文字の検索や、emojidex.comにログインする機能を使う事で、お気に入りや使用履歴等と連携する事が出来ます。

### Options
#### Default options
```js
emojidexPalette({
  onEmojiButtonClicked: undefined,
  paletteEmojisLimit: 50
});
```

#### options.onEmojiButtonClicked
Type: `Function({imageTag: クリックした絵文字のimgタグ, emojiCode: クリックした絵文字のcode})` Default: `undefined`

パレットの絵文字ボタンをクリックした時に実行される関数を設定することが出来ます。

#### options.paletteEmojisLimit
Type: `Int` Default: `50`

パレットに一度に表示する絵文字の上限を設定する事が出来ます。



ビルドの仕方
------------
nodeにnpmとyarnが必要です。

### ソースの取得
まだクローンしていなければ、以下を実行する事でクローンが出来ます。
```shell
git clone git@github.com:emojidex/emojidex-web.git
cd emojidex-web
```

### パッケージの取得
```shell
yarn install
```

### ビルド
一発ビルド:
```shell
yarn build
```
distフォルダ内に出力されます。

開発用の動的ビルド:
```shell
yarn dev
```
編集の際に再コンパイルされ、
[http://localhost:8000/dist/](http://localhost:8000/dist/)
から確認出来ます。


プレミアムアカウントへの無料アップグレード
=============================
あなたが開発者としてemojidexのパッケージやモジュールを使用している場合、プレミアムアカウントへの無料アップグレードをすることが出来ます。

件名を「開発者アカウント」にして以下を記載して、info@emojidex.comにご連絡ください。
1. あなたのemojidexでのユーザー名
2. あなたが取り組もうとしているプロジェクト


テスト
==========
specには2種類あります。
1つはテストアカウントを使用したもの、もう1つはR-18を有効にしたプレミアムアカウントを使用したものです。

__テストURL: localhost:8888/?random=false__

テストアカウントを使用したテスト
-----------------------
`emojidex-web`のディレクトリ内で下記のコマンドを実行してください。

```shell
yarn gulp spec
もしくは
yarn test
```

プレミアムアカウントを使用したテスト
---------------
プレミアムアカウントを取得した後、下記の情報を含むファイル`.env`を`emojidex-web`のディレクトリ内に作成します。

例：
```
USERNAME=Your_UserName
EMAIL=your@email.com
PASSWORD=YourPassword123
AUTH_TOKEN=0123456789abcdef
```
各値はあなたのものに変更してください。
`AUTH_TOKEN`は[ユーザー情報ページ](https://emojidex.com/profile)の一番下、「認証トークンの表示」をクリックすることで確認できます（要ログイン）。

上記ファイル作成後、`emojidex-web`のディレクトリ内で下記のコマンドを実行してください。

```shell
yarn gulp spec
もしくは
yarn test
```

ライセンス
==========
emojidexとemojidex関連のツール全てが
[emojidex Open License](https://www.emojidex.com/emojidex/emojidex_open_license)
にてライセンスされています。

©2013 emojidex / 株式会社幻創社
