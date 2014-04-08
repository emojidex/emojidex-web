class EmojisPallet
  constructor: (@emojis_data_array, @element, @options) ->
    @KEY_ESC = 27
    @KEY_TAB = 9

  setPallet: ->
    console.log @options

    obj = $.parseJSON '{"name": "John"}'
    console.log obj

    # @element.click ->
    #   showPallet()