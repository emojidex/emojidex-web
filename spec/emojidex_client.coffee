describe "EmojidexClient", ->
  ec = new EmojidexClient

  it "Defined EmojidexClient ?", ->
    expect(EmojidexClient).toBeDefined()

  describe "Mthods: emoji info", ->
    it "search", (done) ->
      ec.search "", (emoji_data) ->
        expect(emoji_data.length).toBeTruthy()
        done()

    it "tag_search", (done) ->
      ec.tag_search "", (emoji_data) ->
        expect(emoji_data).toBeTruthy()
        done()

    it "advanced_search", (done) ->
      ec.advanced_search "", [], [], (emoji_data) ->
        expect(emoji_data.length).toBeTruthy()
        done()

    it "user_emoji", (done) ->
      ec.user_emoji "emojidex", (emoji_data) ->
        expect(emoji_data.length).toBeTruthy()
        done()

    it "get_categories", (done) ->
      ec.get_categories (categories) ->
        expect(categories.length).toBeTruthy()
        done()
