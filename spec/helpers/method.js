function helperBefore() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  // TODO: fixtureの読み込み方法
  // jasmine.getFixtures().fixturesPath = 'build/spec/fixture/';
  // $('body').append(`<div id='spec-wrap'>${readFixtures('index.html')}</div>`);

  if ($('#spec-wrap').length === 0) {
    $('body').append(`<div id='spec-wrap'>${html}</div>`);
  }
}

function helperAfter() {
  $('#spec-wrap').remove();
}

function spec_timer(option) {
  let default_option = {
    time: 100,
    callback: undefined
  };
  $.extend(default_option, option);

  if (default_option.callback != null) { return setTimeout(default_option.callback, default_option.time); }
}

function specTimer(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

function removeWatch(object, id) {
  object.unwatch(id);
  object.removeData(id);
}

function simulateMouseEvent(target) {
  let mde = document.createEvent("MouseEvents");
  mde.initMouseEvent("mousedown", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  target.dispatchEvent(mde);
}

function simulateTypingIn($inputor, pos) {
  if (pos === undefined) {
    let text = $inputor[0].innerText || $inputor[0].innerHTML;
    pos = $inputor[0].innerHTML.lastIndexOf(text[text.length -1]) + 1;
  }

  let oDocument = $inputor[0].ownerDocument;
  let oWindow = oDocument.defaultView || oDocument.parentWindow;
  $inputor.focus();
  if ($inputor.attr('contentEditable') === 'true' && oWindow.getSelection) {
    let sel = oWindow.getSelection();
    let range = oDocument.createRange();
    range.setStart($inputor.contents().get(0), pos);
    range.setEnd($inputor.contents().get(0), pos);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  } else {
    $inputor.caret('pos', pos);
  }
  $inputor.trigger('keyup');
}

function clearStorage() {
  let CSC = new CrossStorageClient('https://www.emojidex.com/hub',
    {frameId: 'emojidex-client-storage-hub'});
  return CSC.onConnect().then(() => {
    return CSC.clear();
  });
}

function closePalette() {
  // $('#spec-wrap').remove(); してもパレットが残ることがあるため
  $('button.pull-right[aria-label="Close"]').click();
  $('#emojidex-emoji-palette').remove();
}
