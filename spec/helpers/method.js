function helperBefore() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  jasmine.getFixtures().fixturesPath = '../build/spec/fixture/';
  $('body').append(`<div id='spec-wrap'>${readFixtures('index.html')}</div>`);
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

function remove_watch(object, id) {
  object.unwatch(id);
  object.removeData(id);
}

function simulateTypingIn($inputor, pos=22) {
  let oDocument = $inputor[0].ownerDocument;
  let oWindow = oDocument.defaultView || oDocument.parentWindow;
  if ($inputor.attr('contentEditable') === 'true' && oWindow.getSelection) {
    $inputor.focus();
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
