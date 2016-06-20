class CountChecker
  constructor: (@limit, @callback) ->
    @count = 0

  check: ->
    if ++@count is @limit
      @callback()
