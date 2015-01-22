emojidex Coffee/Java Script Client Usage
========================================

The emojidex Coffee/Java Script client is set up to handle searching, listing, login, history, 
favorites etc. against the emojidex API.
  
All examples here will be given as JavaScript. If you are bundling/using the client as Coffee 
(which is the recommend way to use it) please use the original coffee file and convert syntax 
accordingly.

Design
======

The client is a state machine as much as it can be. Instance variables will usually apply to 
the current state and will often be automatically changed after an operation. As such:  
*DO NOT RELY ON INSTANCE VARIABLES TO BE ACCURATE AFTER CONSECUTIVE OR PARALLEL OPERATIONS*
Be careful not to create race conditions. Utilize callbacks efficiently.
  
_ALWAYS_ create a separate instance of the client for each widget or component you are using 
the client in. If you have two separate pieces of code operating on the same view or in the same 
module each piece of code should have a different client instance.

Argument Layout
---------------

For the sake of uniformity and familiarity most methods will have the same layout:
```coffee
client_method(primary, secondary = [], callback = null, opts)
```
That is:
  1. primary: the primary argument, such as the search term
  2. secondary: secondary, teritary, etc. arguments are always pre-initialized to some value, but 
    can always be set to null to ignore them (the _breakout method checks and fixes nulls).  
  3. callback: always the second to last argument, defines a callback method to which the results 
    will be passed after a successful transaction.
  4. opts: can be ignored. The opts hash can contain any overrides you may want and is where you 
    can manually specify "page", "limit", and "detailed" on a per-operation basis.

Usage
=====

Basic usage is listed here. For more usage patterns please check the JavaScript tabs on 
[developer.emojidex.com](http://developer.emojidex.com).

Initialization/Instantiation
----------------------------

Basic initialization and usage:
```js
emojidex = new EmojidexClient();
```

Initialization can take a variety of overrides:

override key	| default value | description
----------------|---------------|------------
locale			| 'en'			| The language to use (currently only 'en' and 'ja' are supported)
size_code		| 'px32'		| The size this client will use. Default is 32px, see [here](http://developer.emojidex.com/#asset-formats) for more
limit			| 32			| Default limit per page. Protip: Use next() to get the next page.
detailed		| false			| Get detailed emoji info by default (not needed for most purposes)

A few other overrides exist but these are mostly just there for specialized distrobutions 
(EG static deployment on intranets or limited internet access). Note that activating the overrides 
not listed above could violate the Terms of Service or Open License. If you have questions please 
open an issue on github.

Plain Auth / Login
------------------

If an API Key / Auth Token is already obtained it will be saved in local storage. The easiest way 
to obtain an API Key is with basic authentication using a username or e-mail address and password.
```js
emojidex.login({"authtype": "plain", "username": "MeMeMe", "password": "******"});
```

If you need to log the user out you can log out by calling the logout method. Please avoid calling 
this method unless you have a really good reason.
```js
emojidex.logout();
```

Search
------
Search results can be taken in a callback or can be found in the .results instance variable:
```js
emojidex.results
> [{category: 'faces', code 'smiley face with winking eye'}, ...]
```

Basic code search:  
```coffee
# coffee signature
search: (term, callback = null, opts) ->
# coffee usage
emojidex.search("smile")
```
```js
// JS usage
emojidex.search("smile");
```

Advanced code search: 
*note that more tags will yeiled fewer results (AND) and more categories will yield more results (OR)*
```coffee
# coffee signature
advanced_search: (term, tags = [], categories = [], callback = null, opts) ->
# coffee usage
emojidex.advanced_search("smile", ["happy"], ["faces", "people"])
```
```js
// JS usage
emojidex.advanced_search("smile", ["happy"], ["faces", "people"]);
```

Tag search:
```coffee
# coffee signature
tag_search: (tags, callback = null, opts) ->
# coffee usage
emojidex.tag_search(["open source", "education"])
```
```js
// JS usage
emojidex.tag_search(["open source", "education"]);
```

History
-------

History is automatically obtained upon login / is saved locally so you will generally not need to 
call "get_history", it will simply be available in:
```js
emojidex.history
```

Add an item to history (please call whenever a user "uses" an emoji) using the emoji code:
```js
emojidex.set_history("combat_knife");
```

Favorites
---------

Favorites are automatically obtained upon login/ are saved locally so you will generally not need 
to call "get_favorites", it will simply be available in:
```js
emojidex.favorites
```

Add an emoji to user favorites: 
*note that despite "favorites" being plural this method takes a single emoji code*
```js
emojidex.set_favorites("combat_knife");
```

Remove an emoji from user favorites:
*note that despite "favorites" being plural this method takes a single emoji code*
```js
emojidex.unset_favorites("combat_knife");
```

The Magic "next" Method
-----------------------
All search methods will set the "next" method to get the next page of that search. 
You can call a search, then later simply call next() and get the next page. 
*When next is called and there are no more results an empty array will be returned*

```js
// first 32 results are returned and put in .results
emojidex.search("face");
// next 32 results are returned and put in .results
emojidex.next();
```

Utility Methods
---------------
```js
// adds an aray of emoji to the emoji available in the emoji instance variable, removing dupes
selection = emojidex.combine_emoji(emoji_we_want_users_to_use_on_our_site);

// returns an array of only emoji codes and asset URLs (default is from the results array)
results_for_a_list = simplify();
simple_list_of_seal_sized_emoji = emojidex.simplify(emojidex.results, 'seal');
```
