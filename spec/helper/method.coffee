@spec_timer = (option) ->
  default_option =
    time: 3000
    callback: undefined
  $.extend default_option, option

  setTimeout(default_option.callback, default_option.time) if default_option.callback?
