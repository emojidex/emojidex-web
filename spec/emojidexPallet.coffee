describe "emojidexPallet", ->
  beforeEach ->
    jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
    loadFixtures('index.html')
    @jquery = new $

  it "Defined emojidexPallet ?", ->
    # expect(@jquery.emojidexPallet).toBeDefined()
    expect($('#pallet-btn')).toContainText('Open pallet')
