describe "emojidexPallet", ->
  beforeEach ->
    jasmine.getFixtures().fixturesPath = '../build/spec/fixture/'
    loadFixtures('index.html')
    @jquery = new $

  it "Defined emojidexPallet ?", ->
    # expect(@jquery.emojidexPallet).toBeDefined()
    expect($('#pallet-btn')).toContainText('Open pallet')

    # spyEvent = spyOnEvent('#pallet-btn', 'click')
    # $('#pallet-btn').click()
    # expect('click').toHaveBeenTriggeredOn('#pallet-btn')
    # expect(spyEvent).toHaveBeenTriggered()
