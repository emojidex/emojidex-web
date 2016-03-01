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

@placeCaretAtEnd = (elm) ->
  elm.focus()
  range = document.createRange()
  range.selectNodeContents elm
  range.collapse false
  sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange range

@KEY_CODE =
  DOWN: 40
  UP: 38
  ESC: 27
  TAB: 9
  ENTER: 13
  CTRL: 17
  P: 80
  N: 78

@triggerAtwhoAt = ($inputor) ->
  simulateTypingIn $inputor
  simulateChoose $inputor

@simulateTypingIn = ($inputor, flag, pos=31) ->
  $inputor.data("atwho").setContextFor flag || "@"
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
  $inputor.trigger("keyup")

@simulateChoose = ($inputor) ->
  e = $.Event("keydown", keyCode: KEY_CODE.ENTER)
  $inputor.trigger(e)
