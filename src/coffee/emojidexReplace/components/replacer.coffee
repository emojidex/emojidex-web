class Replacer
  constructor: ->
    @promiseWaitTime = 5000

    ignore = '\'":;@&#~{}<>\\r\\n\\[\\]\\!\\$\\+\\?\\%\\*\\/\\\\'
    @regexpCode = RegExp ":([^\\s#{ignore}][^#{ignore}]*[^\\s#{ignore}]):|:([^\\s#{ignore}]):", 'g'

    @targets = []
    @complete_num = 0

  setTargets: (node) ->
    unless node.parentNode and node.parentNode.isContentEditable
      child = node.firstChild
      while child
        switch child.nodeType
          when Node.ELEMENT_NODE
            if $(child).is @plugin.options.ignore
              break
            if child.isContentEditable
              break
            @setTargets child
            break
          when Node.TEXT_NODE
            if child.data.indexOf('function(') is -1
              @targets.push child if child.data.match(/\S/)
            break
        child = child.nextSibling

  getEmojiTag: (emoji) ->
    get_image_tag = (emoji_code) =>
      "<img class='emojidex-emoji' src='#{@plugin.EC.cdn_url}#{@plugin.EC.size_code}/#{@replaceSpaceToUnder emoji_code}.png' title='#{@replaceUnderToSpace emoji_code}'></img>"

    emoji_code = if emoji.code? then emoji.code else emoji
    if emoji.link?
      return "<a href='#{emoji.link}'>#{get_image_tag emoji_code}</a>"
    else
      return get_image_tag emoji_code

  getLoadingTag: (emoji_data, type) ->
    "<span class='emojidex-loading-icon' data-emoji='#{emoji_data}' data-type='#{type}'></span>"

  getLoadingElement: (element) ->
    $ element.find '.emojidex-loading-icon'

  setLoadingTag: (element) ->
    return new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: setLoadingTag - Timeout')
      , @promiseWaitTime

      @targets = []
      @setTargets element[0]

      if @targets.length
        checker = new CountChecker @targets.length, ->
          resolve()
        for target in @targets
          $(target).replaceWith @getAddedLoadingTagText(target)
          checker.check()
      else
        resolve()

  getAddedLoadingTagText: (target_element) ->
    replaced_text = target_element.data
    replaced_text = replaced_text.replace @plugin.options.regexpUtf, (matched_string) =>
      @getLoadingTag matched_string, 'utf'
    replaced_text = replaced_text.replace @regexpCode, (matched_string) =>
      @getLoadingTag matched_string.replace(/:/g, ''), 'code'
    return replaced_text

  fadeOutLoadingTag_fadeInEmojiTag: (element, emoji, match = true) ->
    emoji_tag = undefined
    if match
      emoji_tag = $(@getEmojiTag emoji).hide()
    else
      emoji_tag = ":#{emoji}:"

    return new Promise (resolve, reject) =>
      timeout = setTimeout ->
        reject new Error('emojidex: fadeOutLoadingTag_fadeInEmojiTag - Timeout')
      , @promiseWaitTime

      element.fadeOut
        duration: 'normal'
        done: =>
          element.after emoji_tag
          element.remove()
          if match
            emoji_tag.fadeIn
              duration: "fast"
              done: =>
                resolve()
          else
            resolve()

  replaceSpaceToUnder: (string) ->
    string.replace /\s/g, '_'

  replaceUnderToSpace: (string) ->
    string.replace /_/g, ' '
