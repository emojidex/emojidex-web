describe "emojidexPallet", ->
  beforeEach ->
    jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
    loadFixtures('index.html')
    $("#pallet-btn").emojidexPallet()
    $('#pallet-btn').click()

  it "show emojidexPallet", ->
    expect($('#pallet-btn')).toContainText('Open pallet')

  it "Defined emojidexPallet ?", ->

    expect($('#pallet-btn')).toContainText('Open pallet')
