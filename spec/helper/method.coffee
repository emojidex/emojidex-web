@helperBefore = ->
  jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
  # loadFixtures('index.html')
  $('body').append("<div id='spec-wrap'>#{readFixtures 'index.html'}</div>");

@helperAfter = ->
  $('#spec-wrap').remove()

@spec_timer = (option) ->
  default_option =
    time: 100
    callback: undefined
  $.extend default_option, option

  setTimeout(default_option.callback, default_option.time) if default_option.callback?

@remove_watch = (object, id) ->
  object.unwatch id
  object.removeData id
