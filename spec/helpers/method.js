function helperBefore() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  // TODO: fixtureの読み込み方法
  // jasmine.getFixtures().fixturesPath = 'build/spec/fixture/';
  // $('body').append(`<div id='spec-wrap'>${readFixtures('index.html')}</div>`);
  return new Promise((resolve) => {
    if ($('#spec-wrap').length === 0) {
      $('body').append(`<div id='spec-wrap'>${html}</div>`);
      resolve()
    } else {
      resolve()
    }
  })
}

function helperAfter() {
  return new Promise((resolve) => {
    $('#spec-wrap').remove();
    resolve()
  })
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
  return CSC.onReadyFrame().then(() => {
    return CSC.clear();
  });
}

function closePalette() {
  // $('#spec-wrap').remove(); してもパレットが残ることがあるため
  return new Promise((resolve) => {
    $('button.pull-right[aria-label="Close"]').click();
    $('#emojidex-emoji-palette').remove();
    resolve()
  })
}

function showPalette(callback) {
  $('.ui-dialog').watch({
    id: 'dialog',
    properties: 'display',
    callback() {
      removeWatch($('.ui-dialog'), 'dialog');
      callback();
    }
  });
  specTimer(1000).then(() => {
    $('.emojidex-palette-button')[0].click();
  });
}

function preparePaletteButtons(done, options) {
  let limitForSpec = 1;
  $("#palette-btn").emojidexPalette({
    paletteEmojisLimit: limitForSpec,
    onEmojiButtonClicked: options && options.onEmojiButtonClicked ? options.onEmojiButtonClicked : undefined,
    onComplete: () => {
      $("#palette-input").emojidexPalette({
        paletteEmojisLimit: limitForSpec,
        onComplete: () => { done(); }
      });
    }
  });
}

function loginUser(user, password) {
  specTimer(1000).then(() => {
    $('#tab-user a').click();
    $('#palette-emoji-username-input').val(user);
    $('#palette-emoji-password-input').val(password);
    $('#palette-emoji-login-submit').click();
  });
}

function beforePalette(done) {
  console.log('ready palette ---')
  clearStorage().then(() => {
    return helperBefore();
  }).then(() => {
    preparePaletteButtons(done);
  });
}

function afterPalette(done) {
  closePalette().then(() => {
    return helperAfter();
  }).then(() => {
    done();
  })
}