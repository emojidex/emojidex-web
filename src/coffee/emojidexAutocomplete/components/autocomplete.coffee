class AutoComplete
    constructor: (@plugin) ->
      @searching_num = 0
      @EC = new EmojidexClient
        onReady: (EC) =>
          @setAutoComplete()

    setAutoComplete: ->
      setAtwho = (at_options) =>
        $(@plugin.element).atwho(at_options).on('reposition.atwho', (e) ->
          $(e.currentTarget).atwho(at_options)
        ).on('hidden.atwho', (e) ->
          $(e.currentTarget).atwho(at_options)
        )
        @plugin.options.onComplete?()

      setSearchedEmojiData = (at_obj, match_string) =>
        updateAtwho = (searched_data, at_bak) ->
          at_options =
            data: searched_data
            callbacks:
              highlighter: onHighlighter
              matcher: (flag, subtext, should_startWithSpace) ->
                match = getMatchString subtext, getRegexp(flag, should_startWithSpace)

          at_bak.$inputor.atwho('destroy').atwho($.extend {}, at_bak.setting, at_options).atwho('run')

        # start: setSearchedEmojiData --------
        num = ++@searching_num
        @EC.Search.search(match_string, (response) =>

          searched_data = for emoji in @EC.Search.results
            code: emoji.code.replace(/\s/g, '_')
            img_url: "#{@EC.cdn_url}#{@EC.size_code}/#{emoji.code.replace /\s/g, '_'}.png"

          if @searching_num == num
            updateAtwho(searched_data, at_obj) if searched_data.length
            @searching_num = 0
        )

        return match_string

      getRegexp = (flag, should_startWithSpace) ->
        # À & ÿ
        _a = decodeURI("%C3%80")
        _y = decodeURI("%C3%BF")

        # flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        # flag = '(?:^|\\s)' + flag if should_startWithSpace
        regexp = new RegExp "[：#{flag}]([^：:;@&#~\!\$\+\?\%\*\f\n\r\\\/]+)$",'gi'

      getMatchString = (subtext, regexp) ->
        match = regexp.exec subtext
        match = if match then match[2] || match[1] else null
        return match

      onHighlighter = (li, query) ->
        return li if not query
        regexp = new RegExp(">\\s*([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*?)(#{query.replace(/(\(|\))/g, '\\$1')})([^:;@&#~\!\$\+\?\%\*\f\n\r\\\/]*)\\s*<", 'ig')
        li.replace regexp, (str, $1, $2, $3) -> "> #{$1}<strong>#{$2}</strong>#{$3} <"

      # start: setAutoComplete --------
      at_init =
        at: ':'
        suffix: ''
        limit: @plugin.options.listLimit
        search_key: "code"
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20'></img>${code}</li>"
        insert_tpl: if @plugin.options.insertImg then "<img src='${img_url}' height='20' width='20' />" else ":${code}:"
        callbacks:
          highlighter: onHighlighter
          matcher: (flag, subtext, should_startWithSpace) ->
            match = getMatchString subtext, getRegexp(flag, should_startWithSpace)
            setSearchedEmojiData(@, match) if match

      setAtwho(at_init)
