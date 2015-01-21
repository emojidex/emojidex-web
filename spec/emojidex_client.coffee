describe "EmojidexClient", ->
  ec = new EmojidexClient

  it "Defined EmojidexClient", ->
    expect(EmojidexClient).toBeDefined()

  it "EmojidexClient.search", (done)->
    ec.search "", (emoji_data)->
      expect(emoji_data).toBeDefined()
      done()