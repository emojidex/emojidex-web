class Pallet
  constructor: (@emoji_data_array, @element, @options) ->
    @KEY_ESC = 27
    @KEY_TAB = 9

  setPallet: ->
    # console.log @options

    # @element.click ->
    #   showPallet()