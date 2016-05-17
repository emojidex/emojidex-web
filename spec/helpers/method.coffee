@helperBefore = ->
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
  jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
  $('body').append "<div id='spec-wrap'>#{readFixtures 'index.html'}</div>"

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

@simulateTypingIn = ($inputor, pos=22) ->
  oDocument = $inputor[0].ownerDocument
  oWindow = oDocument.defaultView || oDocument.parentWindow
  if $inputor.attr('contentEditable') == 'true' && oWindow.getSelection
    $inputor.focus()
    sel = oWindow.getSelection()
    range = oDocument.createRange()
    range.setStart $inputor.contents().get(0), pos
    range.setEnd $inputor.contents().get(0), pos
    range.collapse false
    sel.removeAllRanges()
    sel.addRange(range)
  else
    $inputor.caret('pos', pos)
  $inputor.trigger('keyup')

@clearStorage = ->
  CSC = new CrossStorageClient 'https://www.emojidex.com/hub',
    frameId: 'emojidex-client-storage-hub'
  CSC.onConnect().then =>
    CSC.clear()
