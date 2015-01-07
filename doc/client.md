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

Initialization/Instantiation
----------------------------

Basic initialization and usage:
```js
client = new EmojidexClient();
```

Search
------

Basic code search:
```js
client.search("smile");
```
