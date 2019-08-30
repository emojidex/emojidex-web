/* eslint-disable no-undef */
export default class CustomizationTab {
  constructor(palette) {
    this.palette = palette
    this.initialized = false
    this.tabList = $('<li id="tab-customization" class="pull-right"><a href="#tab-content-customization" data-toggle="pill"><i class="emjdx-customization"></a></li>')
    this.tabContent = $('<div class="tab-pane" id="tab-content-customization"><div class="emojidex-category-name emjdx-customization">Customization</div></div>')
    this.getBaseEmoji()
  }

  async getBaseEmoji() {
    const response = await this.palette.EC.Customizations.get()
    this.createCustomizationPage(response)
  }

  createCustomizationPage(response) {
    $('.customization-emoji-list').remove()
    $('.customization-pagination').remove()
    const emojiList = $('<div class="customization-emoji-list clearfix"></div>')

    response.forEach(emoji => {
      const button = $(`<button class='emoji-btn btn btn-default pull-left'>
        <img alt='${emoji.code}' title='${emoji.code}' class='img-responsive center-block' src='https://cdn.emojidex.com/emoji/px32/${emoji.code}.png'>
      </button>`)
      button.click(() => {
        this.createEditView(emoji)
      })
      emojiList.append(button)
    })
    this.tabContent.append(emojiList)

    const { meta } = this.palette.EC.Customizations
    if (meta.total_count === 0) {
      return
    }

    const curPage = meta.total_count === 0 ? 0 : meta.page
    const maxPage = curPage === 0 ? 0 : Math.ceil(meta.total_count / this.palette.EC.limit)
    const prevFunc = async () => {
      const response = await this.palette.EC.Customizations.prev()
      this.createCustomizationPage(response)
    }

    const nextFunc = async () => {
      const response = await this.palette.EC.Customizations.next()
      this.createCustomizationPage(response)
    }

    const pagination = this.palette.getPagination('customization', prevFunc, nextFunc, curPage, maxPage)
    this.tabContent.append(pagination)
  }

  createEditView(emoji) {
    const content = $(`<div class="customization-info on">
      <div class="btn-close" aria-hidden="true"><i class="emjdx-abstract flip-vertical"></i></div>
      <div class="emoji-name">${emoji.code}</div>
      <div class="clearfix"></div>
      <hr>
      <div class="customization-emoji mt-m">
        <div class="customization-preview pull-left text-center"></div>
        <div class="customization-select pull-right"></div>
        <div class="clearfix"></div>
        <div class="text-center mt-m"><button class="insert-button btn btn-default">Insert</button></div>
      </div>
    </div>`)
    content.find('.insert-button').click(() => {
      if ($('.customization-preview').children()) {
        this.insertEmoji()
      }
    })
    content.find('.btn-close').click(() => {
      $('.customization-info').remove()
    })
    this.tabContent.append(content)

    this.createSelect(emoji)
  }

  async createSelect(emoji) {
    const { components } = emoji.customizations[0]
    const selects = []
    for (let i = 0; i < components.length; i++) {
      // create options
      const component = components[i]
      const optionPromises = []
      for (let j = 0; j < component.length; j++) {
        if (component[j]) {
          optionPromises.push(async () => {
            const result = await this.palette.EC.Search.find(component[j])
            const url = `https://${this.palette.EC.env.cdnAddr}/emoji/px32/${emoji.customizations[0].base}/${i}/${this.palette.EC.Util.escapeTerm(result.code)}.png`
            return { order: j, element: $(`<option value="${result.moji}" data-url="${url}">${result.code}</option>`) }
          })
        } else {
          optionPromises.push(() => {
            return { order: j, element: $('<option></option>') }
          })
        }
      }

      // set options to select-tag
      const options = await Promise.all(optionPromises.map(o => o())) // eslint-disable-line no-await-in-loop
      const select = $('<select class="form-control zwj-selects"></select>')
      options.sort((a, b) => a.order < b.order ? -1 : 1)
      options.forEach(option => select.append(option.element))
      selects.push({ order: i, element: $('<div class="mt-m"></div>').append(select) })
    }

    selects.sort((a, b) => a.order < b.order ? -1 : 1)
    selects.forEach(select => $('.customization-select').append(select.element))

    this.setZWJEmojis()
    this.setIconSelectMenu()
  }

  async setZWJEmojis() {
    $('.customization-preview').empty()

    const reg = new RegExp(`${this.palette.EC.defaults.cdnUrl}[a-z0-9]+/`, 'g')
    const size = `${this.palette.EC.defaults.cdnUrl}seal/`
    const result = await this.palette.EC.Util.emojifyToHTML(this.getZWJEmojis())
    $('.customization-preview').append(result.replace(reg, size))
  }

  getZWJEmojis() {
    const values = $('.zwj-selects').map((index, element) => {
      if ($(element).val()) {
        return $(element).val()
      }

      return ''
    }).get()
    return values.join('\u{200D}')
  }

  setIconSelectMenu() {
    $.widget('custom.iconselectmenu', $.ui.selectmenu, {
      _renderItem(ul, item) {
        const span = $(`<span class="${item.element.data('url') ? 'ui-icon' : ''}"></span>`)
        if (item.element.data('url')) {
          span.append(`<img src=${item.element.data('url')} />`)
        }

        const wrapper = $('<div>', { text: item.label })
        wrapper.append(span)

        return $('<li>').append(wrapper).appendTo(ul)
      }
    })

    $('.zwj-selects').each((i, element) => {
      $(element).iconselectmenu({
        appendTo: '#tab-content-customization',
        change: () => {
          this.setZWJEmojis()
        }
      }).iconselectmenu('menuWidget')
        .addClass('ui-menu-icons')
    })
  }

  insertEmoji() {
    const codes = this.getZWJEmojis()

    if (this.palette.activeInputArea === null) {
      this.clipboard = new Clipboard('.insert-button', {
        text: () => {
          return codes
        }
      })
      return
    }

    const elem = this.palette.activeInputArea
    if (elem.is('[contenteditable="true"]')) {
      elem.focus()
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)

      range.insertNode($($('.customization-preview').children()[0]).clone()[0])
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
    elem.val(startTxt + codes + stopTxt)
    elem.focus()
    elem.caret('pos', pos + codes.length)
  }
}
/* eslint-enable no-undef */
