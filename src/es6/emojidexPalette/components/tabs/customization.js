/* eslint-disable no-undef */
export default class CustomizationTab {
  constructor(palette) {
    this.palette = palette
    this.initialized = false
    this.tabList = $('<li id="tab-customization" class="pull-right"><a href="#tab-content-customization" data-toggle="pill"><i class="emjdx-customization"></a></li>')
    this.tabContent = $('<div class="tab-pane" id="tab-content-customization"><div class="emojidex-category-name emjdx-customization">Customization</div></div>')
    this.getBaseEmoji()
  }

  getBaseEmoji() {
    return this.palette.EC.Customizations.get(result => {
      $('.customization-emoji-list').remove()
      $('.customization-pagination').remove()

      const emojiList = $('<div class="customization-emoji-list clearfix"></div>')
      result.forEach(emoji => {
        const button = $(`<button class='emoji-btn btn btn-default pull-left'>
          <img alt='${emoji.code}' title='${emoji.code}' class='img-responsive center-block' src='https://cdn.emojidex.com/emoji/px32/${emoji.code}.png'>
        </button>`)
        button.click(() => {
          this.createEditView(emoji)
        })
        emojiList.append(button)
      })
      this.tabContent.append(emojiList)

      if (this.palette.EC.Customizations.meta.total_count === 0) {
        return
      }

      const pagination = this.palette.getPagination(
        'customization',
        () => this.palette.EC.Customizations.prev(),
        () => this.palette.EC.Customizations.next(),
        this.palette.EC.Customizations.curPage,
        this.palette.EC.Customizations.maxPage
      )
      return this.tabContent.append(pagination)
    })
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

  createSelect(emoji) {
    const { components } = emoji.customizations[0]
    const selectPromises = []
    for (let i = 0; i < components.length; i++) {
      selectPromises.push(new Promise(selectResolve => {
        // create options
        const component = components[i]
        const optionPromises = []
        for (let j = 0; j < component.length; j++) {
          if (component[j]) {
            optionPromises.push(new Promise(optionResolve => {
              this.palette.EC.Search.find(component[j], result => {
                const url = `https://${this.palette.EC.env.cdn_addr}/emoji/px32/${emoji.customizations[0].base}/${i}/${this.palette.EC.Util.escapeTerm(result.code)}.png`
                optionResolve({ order: j, element: $(`<option value="${result.moji}" data-url="${url}">${result.code}</option>`) })
              })
            }))
          } else {
            optionPromises.push(new Promise(optionResolve => {
              optionResolve({ order: j, element: $('<option></option>') })
            }))
          }
        }

        // set options to select-tag
        Promise.all(optionPromises).then(options => {
          const select = $('<select class="form-control zwj-selects"></select>')
          options.sort((a, b) => {
            return a.order < b.order ? -1 : 1
          })
          options.forEach(option => {
            select.append(option.element)
          })
          selectResolve({ order: i, element: $('<div class="mt-m"></div>').append(select) })
        })
      }))
    }

    // set selects to div-tag
    Promise.all(selectPromises).then(selects => {
      selects.sort((a, b) => {
        return a.order < b.order ? -1 : 1
      })
      selects.forEach(select => {
        $('.customization-select').append(select.element)
      })
      this.setZWJEmojis()
      this.setIconSelectMenu()
    })
  }

  setZWJEmojis() {
    $('.customization-preview').empty()

    const reg = new RegExp(`${this.palette.EC.defaults.cdn_url}[a-z0-9]+/`, 'g')
    const size = `${this.palette.EC.defaults.cdn_url}seal/`
    this.palette.EC.Util.emojifyToHTML(this.getZWJEmojis()).then(result => {
      $('.customization-preview').append(result.replace(reg, size))
    })
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

      return elem.change()
    }

    const pos = elem.caret('pos')
    const txt = elem.val()
    const startTxt = txt.substring(0, pos)
    const stopTxt = txt.substring(pos, txt.length)
    elem.val(startTxt + codes + stopTxt)
    elem.focus()
    return elem.caret('pos', pos + codes.length)
  }
}
/* eslint-enable no-undef */
