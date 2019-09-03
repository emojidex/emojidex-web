import Clipboard from 'clipboard'
import EmojidexClient from 'emojidex-client/src/es6/client.js'

// import CategoryTab from './tabs/category'
// import IndexTab from './tabs/index'
// import SearchTab from './tabs/search'
import UserTab from './tabs/user'
// import CustomizationTab from './tabs/customization'

/* eslint-disable no-undef */
export default class Palette {
  constructor(plugin) {
    this.plugin = plugin
    this.activeInputArea = null
    this.tabs = []
    return this.init()
  }

  async init() {
    this.EC = await new EmojidexClient({ limit: this.plugin.options.paletteEmojisLimit })

    // start main --------
    $('input, textarea, [contenteditable="true"]').on('focus keyup mouseup', e => {
      this.activeInputArea = $(e.currentTarget)
    })

    this.createDialog()
    await this.setPalette()

    if ($(this.plugin.element).attr('type') === 'text' || $(this.plugin.element).prop('tagName') === 'TEXTAREA') {
      this.addButton(this.plugin.element)
    } else {
      this.addPaletteToElement(this.plugin.element)
    }

    return this
  }

  createDialog() {
    if ($('#emojidex-dialog-content').length !== 0) {
      return
    }

    this.dialog = $('<div id="emojidex-dialog-content"></div>')
    this.dialog.dialog({
      classes: {
        'ui-dialog': 'emojidex-ui-dialog'
      },
      autoOpen: false,
      width: 520,
      title: 'emojidex',

      create() {
        $('.ui-dialog-titlebar-close').hide()

        const closeButton = $('<button type="button" class="btn btn-default btn-xs pull-right" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
        closeButton.click(() => $('#emojidex-dialog-content').dialog('close'))

        $('.ui-dialog-titlebar').append(closeButton)
        $('.ui-dialog-title').html('<a target="_blank" href="https://www.emojidex.com"><img src="https://cdn.emojidex.com/logo-hdpi.png" alt="emojidex" /></a>')
        $('.emojidex-ui-dialog').wrap('<span id="emojidex-emoji-palette"></span>')
      },

      open() {
        $('.emojidex-ui-dialog').css('min-height', 455) // height style is ignored, set here.
        $('.ui-dialog :button').blur()
        $('.nav.nav-pills a').blur()
      }
    })
  }

  async setPalette() {
    if ($('#emoji-palette').length !== 0) {
      return
    }

    const tabList = $('<ul class="nav nav-pills"></ul>')
    const tabContent = $('<div class="tab-content"></div>')

    // TODO: おそらく処理の順番の関係で動作が不安定になっているのだけれども、今はユーザータブを修正しているところなので後で直す
    // this.tabs.push(new IndexTab(this))
    // const categories = await this.EC.Categories.sync()
    // for (let i = 0; i < categories.length; i++) {
    //   const category = categories[i]
    //   this.tabs.push(new CategoryTab(this, category, tabList[0].children.length))
    // }

    const userTab = await new UserTab(this)
    this.tabs.push(userTab)
    // this.tabs.push(new SearchTab(this))
    // this.tabs.push(new CustomizationTab(this))

    for (let j = 0; j < this.tabs.length; j++) {
      const tab = this.tabs[j]
      tabList.append(tab.tabList)
      tabContent.append(tab.tabContent)
    }

    this.emojiPalette = $('<div id="emoji-palette" class="emoji-palette"></div>')
    this.emojiPalette.append(tabList.add(tabContent))
    this.emojiPalette.find('ul').after('<hr>')

    this.dialog.append(this.emojiPalette)

    const authInfo = await this.EC.Data.authInfo()
    if (authInfo && authInfo.token) {
      await userTab.login({ authtype: 'session' })
    }
  }

  setEmojiList(kind, emojiList) {
    const emojiDivs = $(`<div class='${kind}-emoji-list clearfix'></div>`)
    for (let i = 0; i < emojiList.length; i++) {
      const emoji = emojiList[i]
      const emojiButton = $('<button>', { class: 'emoji-btn btn btn-default pull-left' })
      emojiButton.prop('emoji_data', emoji)

      const emojiButtonImage = $('<img>', {
        alt: `${emoji.code}`,
        title: `${emoji.code}`,
        class: 'img-responsive center-block',
        src: `${this.EC.cdnUrl}px32/${emoji.code.replace(/\s/g, '_')}.png`
      })

      let clickFunc
      if (typeof this.plugin.options.onEmojiButtonClicked === 'function') {
        clickFunc = () => {
          this.plugin.options.onEmojiButtonClicked(
            {
              imageTag: emojiButtonImage.attr('class', 'emojidex-emoji').prop('outerHTML'),
              emojiCode: `:${emoji.code}:`
            }
          )
        }
      } else {
        clickFunc = e => {
          this.insertEmojiAtCaret($(e.currentTarget).prop('emoji_data'))
        }
      }

      emojiButton.append(emojiButtonImage)
      emojiButton.click(clickFunc)
      emojiDivs.append(emojiButton)
    }

    return emojiDivs
  }

  mojiOrCode(emoji) {
    if (emoji.moji !== null && emoji.moji !== '') {
      return emoji.moji
    }

    return `:${emoji.code}:`
  }

  insertEmojiAtCaret(emoji) {
    const code = this.mojiOrCode(emoji)
    if (this.clipboard) {
      this.clipboard.destroy()
    }

    if (this.EC.User.authInfo.token) {
      this.EC.User.History.set(emoji.code.replace(/\s/g, '_'))
    }

    if (this.activeInputArea === null) {
      this.clipboard = new Clipboard('.emoji-btn', {
        text() {
          return code
        }
      })
      return
    }

    const elem = this.activeInputArea
    if (elem.is('[contenteditable="true"]')) {
      elem.focus()
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)

      const tag = $.parseHTML(this.EC.Util.emojiToHTML(emoji))
      range.insertNode(tag[0])
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)

      elem.change()
      return
    }

    const pos = elem.caret('pos')
    const txt = elem.val()
    const startTxt = txt.substring(0, pos)
    const stopTxt = txt.substring(pos, txt.length)
    elem.val(startTxt + code + stopTxt)
    elem.focus()
    elem.caret('pos', pos + code.length)
  }

  getPagination(kind, prevFunc, nextFunc, curPage, maxPage) {
    const pagination = $(`<div class='${kind}-pagination text-center pagination-container'><ul class='pagination mb-0'></ul></div>`)

    pagination.find('.pagination')
      .append($(`<li class="palette-pager${(curPage > 1) ? '' : ' disabled'}"><span>&laquo;</span></li>`).click(() => {
        if (curPage > 1) {
          prevFunc()
        }
      }))
    pagination.find('.pagination').append($(`<li class='palette-num disabled'><span>${curPage} / ${maxPage}</span></li>`))
    pagination.find('.pagination')
      .append($(`<li class="palette-pager${(curPage < maxPage) ? ' ' : ' disabled'}"><span>&raquo;</span></li>`).click(() => {
        if (curPage < maxPage) {
          nextFunc()
        }
      }))

    return pagination
  }

  // TODO: resultを何に使っているのか、indexesを修正後に確認する
  toggleSorting() {
    if (this.EC.User.isSubscriber()) {
      const result = []
      const iterable = this.getInitializedTabs()
      for (let i = 0; i < iterable.length; i++) {
        const tab = iterable[i]
        let item
        if (!tab.tabContent.find('.sort-selector').length) {
          item = tab.tabContent.find('ul.pagination').after(this.getSorting(tab))
        }

        result.push(item)
      }

      return result
    }

    return this.getInitializedTabs().map(tab => this.removeSorting(tab))
  }

  // TODO: initializedのみにする必要ある？
  getInitializedTabs() {
    const initializedTabs = []
    for (let i = 0; i < this.tabs.length; i++) {
      const tab = this.tabs[i]
      if (tab.initialized) {
        initializedTabs.push(tab)
      }
    }

    return initializedTabs
  }

  getSorting(targetTab) {
    if (!this.EC.User.isSubscriber()) {
      return ''
    }

    const sortSelector = $('<select class="sort-selector form-control pull-right"></select>')
    sortSelector.append($('<option value="score">Score</option>'))
    sortSelector.append($('<option value="newest">Newest</option>'))
    sortSelector.append($('<option value="liked">Most Liked</option>'))
    sortSelector.val(targetTab.sortType)
    sortSelector.change(() => {
      targetTab.sortType = sortSelector.val()
      targetTab.resetTabContent()
    })
    return sortSelector
  }

  removeSorting(targetTab) {
    targetTab.tabContent.find('.sort-selector').remove()
    targetTab.resetTabContent()
  }

  openDialog() {
    $('#emojidex-dialog-content').dialog('open')
  }

  addButton(element) {
    const reposition = () => {
      const margin = 5
      const position = $(element).position()
      position.top += margin
      position.left += $(element).outerWidth() - paletteButton.outerWidth() - margin
      paletteButton.css(position)
    }

    const paletteButton = $('<i class="emojidex-palette-button emjdx-faces">')
    paletteButton.click(() => {
      this.openDialog()
    })

    $(element).addClass('with-emojidex-palette')
    $(element).hover(reposition)
    $(element).focus(reposition)
    reposition()

    $(element).after(paletteButton)
  }

  addPaletteToElement(element) {
    $(element).click(() => this.openDialog())
  }

  capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}
/* eslint-enable no-undef */
