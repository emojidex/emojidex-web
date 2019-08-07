/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function helperBefore() {
  // TODO: fixtureの読み込み方法
  // jasmine.getFixtures().fixturesPath = 'build/spec/fixture/';
  // $('body').append(`<div id='spec-wrap'>${readFixtures('index.html')}</div>`);
  return new Promise(resolve => {
    if ($('#spec-wrap').length === 0) {
      $('body').append(`<div id='spec-wrap'>${html}</div>`)
      resolve()
    } else {
      resolve()
    }
  })
}

function helperAfter() {
  return new Promise(resolve => {
    $('#spec-wrap').remove()
    resolve()
  })
}

function specTimer(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

function removeWatch(object, id) {
  object.unwatch(id)
  object.removeData(id)
}

function simulateMouseEvent(target) {
  const mde = document.createEvent('MouseEvents')
  mde.initMouseEvent('mousedown', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null)
  target.dispatchEvent(mde)
}

function simulateTypingIn($inputor, pos) {
  if (pos === undefined) {
    const text = $inputor[0].innerText || $inputor[0].innerHTML
    pos = $inputor[0].innerHTML.lastIndexOf(text[text.length - 1]) + 1
  }

  const oDocument = $inputor[0].ownerDocument
  const oWindow = oDocument.defaultView || oDocument.parentWindow
  $inputor.focus()
  if ($inputor.attr('contentEditable') === 'true' && oWindow.getSelection) {
    const sel = oWindow.getSelection()
    const range = oDocument.createRange()
    range.setStart($inputor.contents().get(0), pos)
    range.setEnd($inputor.contents().get(0), pos)
    range.collapse(false)
    sel.removeAllRanges()
    sel.addRange(range)
  } else {
    $inputor.caret('pos', pos)
  }

  $inputor.trigger('keyup')
}

async function clearStorage() {
  const CSC = new CrossStorageClient('https://www.emojidex.com/hub', { frameId: 'emojidex-client-storage-hub' })
  await CSC.onReadyFrame()
  await CSC.clear()
}

function closePalette() {
  // $('#spec-wrap').remove(); してもパレットが残ることがあるため
  return new Promise(resolve => {
    $('button.pull-right[aria-label="Close"]').click()
    $('#emojidex-emoji-palette').remove()
    resolve()
  })
}

async function showPalette() {
  await watchDOM('.ui-dialog', {
    properties: 'display',
    trigger: () => {
      $('.emojidex-palette-button')[0].click()
    }
  })
}

async function preparePaletteButtons(options) {
  const limitForSpec = 1
  $('#palette-btn').emojidexPalette({
    paletteEmojisLimit: limitForSpec,
    onEmojiButtonClicked: options && options.onEmojiButtonClicked ? options.onEmojiButtonClicked : undefined
  })
  await $('#palette-btn').data().plugin_emojidexPalette
  $('#palette-input').emojidexPalette({ paletteEmojisLimit: limitForSpec })
  await $('#palette-input').data().plugin_emojidexPalette
}

function watchDOM(selector, options = {}) {
  options.properties = options.properties || 'prop_innerHTML'
  return new Promise(done => {
    $(selector).watch({
      id: 'watchDOM',
      properties: options.properties,
      watchChildren: true,
      callback(data) {
        if (options.regex) {
          if (data.vals[0].match(options.regex)) {
            removeWatch($(selector), 'watchDOM')
            done(data)
          }
        } else {
          removeWatch($(selector), 'watchDOM')
          done(data)
        }
      }
    })

    if (options.trigger) {
      options.trigger()
    }
  })
}

async function tryLoginUser(user, password) {
  $('#tab-user a').click()
  $('#palette-emoji-username-input').val(user)
  $('#palette-emoji-password-input').val(password)
  await watchDOM('#tab-content-user', { trigger: () => {
    $('#palette-emoji-login-submit').click()
  } })
}

async function logout() {
  await watchDOM('#tab-content-user', { trigger: () => {
    $('#palette-emoji-logout').click()
  } })
}

async function beforePalette() {
  await clearStorage()
  await helperBefore()
  await preparePaletteButtons()
}

async function afterPalette() {
  await closePalette()
  await helperAfter()
}

function hasPremiumAccount() {
  return typeof premiumUserInfo !== 'undefined' && premiumUserInfo !== null
}

function hasUserAccount() {
  return typeof userInfo !== 'undefined' && userInfo !== null
}
/* eslint-enable no-unused-vars */
/* eslint-enable no-undef */
