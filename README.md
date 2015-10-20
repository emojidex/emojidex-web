emojidex-web
============
emojidex-web provides a variety of tools and widgets to quickly incorporate emojidex 
into any website or JavaScript based app. It's written in CoffeeScript and SLIM which 
compiles into a JavaScript module that can be easily included into your project.  
  
By default all emoji assets are dynamically loaded from the emojidex CDN and dynamically 
cached by the client. There is no need to store any assets on your own server or bundle 
them with your app. The module is self contained and enclosed and should not interfere 
with other components of your site or app.  
  
Check out the demo at: 
[http://emojidex.github.io/emojidex-web](http://emojidex.github.io/emojidex-web)

Usage
-----
Basic usage is simple.

1. First off load up the stylesheets and scripts:
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

Building
--------
You will need node with a usable npm, grunt and bower.

### Get the source
First off we need the actual source to build. Clone this repository if you haven't already:
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
Modules will be built in the dist dierctory.

For development mode with dynamic compilation and dev server:
```shell
grunt dev
```
A live version of the latest build will be availble at 
[http://localhost:8000/dist/](http://localhost:8000/dist/).

License
=======
emojidex and emojidex tools are licensed under the [emojidex Open License](https://www.emojidex.com/emojidex/emojidex_open_license).

©2013 the emojidex project / Genshin Souzou K.K. [Phantom Creation Inc.]
