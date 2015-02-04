class AutoComplete
    constructor: (@plugin) ->

    setAutoComplete: ->
      setAtwho = (at_options) =>
        $(@plugin.element).atwho(at_options).on('reposition.atwho', (e) ->
          $(e.currentTarget).atwho(at_options)
        ).on('hidden.atwho', (e) ->
          $(e.currentTarget).atwho(at_options)
        )

      setSearchedEmojiData = (at_obj, match_string) ->
        updateAtwho = (searched_data) ->
          at_options =
            data: searched_data
            callbacks:
              matcher: (flag, subtext, should_startWithSpace) ->
                getMatchString subtext, getRegexp(flag, should_startWithSpace)

          at_obj.$inputor.atwho('destroy').atwho($.extend {}, at_obj.setting, at_options).atwho('run')

        # start: setSearchedEmojiData --------
        num = ++searching_num
        ec.Search.search(match_string, (response) ->

          searched_data = for emoji in ec.Search.results
            code: emoji.code.replace /[ ]/g, "_"
            img_url: "http://cdn.emojidex.com/emoji/px32/#{emoji.code.replace /[ ]/g, '_'}.png"

          if searching_num == num
            updateAtwho(searched_data) if searched_data.length
        )

        return match_string

      getRegexp = (flag, should_startWithSpace) ->
        # À & ÿ
        _a = decodeURI("%C3%80")
        _y = decodeURI("%C3%BF")

        flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        flag = '(?:^|\\s)' + flag if should_startWithSpace

        regexp = new RegExp "#{flag}([A-Za-z#{_a}-#{_y}0-9_\+\-]*)$|#{flag}([^\\x00-\\xff]*)$",'gi'

      getMatchString = (subtext, regexp) ->
        match = regexp.exec subtext
        match = if match then match[2] || match[1] else null

      # start: setAutoComplete --------
      searching_num = 0
      ec = new EmojidexClient
      at_init =
        at: ":"
        limit: @plugin.options.limit
        search_key: "code"
        tpl: "<li data-value=':${code}:'><img src='${img_url}' height='20' width='20' /> ${code}</li>"
        insert_tpl: "<img src='${img_url}' height='20' width='20' />"
        callbacks:
          matcher: (flag, subtext, should_startWithSpace) ->
            match = getMatchString subtext, getRegexp(flag, should_startWithSpace)
            setSearchedEmojiData(@, match) if match

      setAtwho(at_init)
