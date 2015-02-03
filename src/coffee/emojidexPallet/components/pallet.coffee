class Pallet
  constructor: (@plugin) ->
    @ec = new EmojidexClient
    @setPallet @plugin.element

  setPallet: (element) ->
    body = ''

    $(element).click (e) =>
      tab_list = $ '<ul class="nav nav-tabs"></ul>'
      tab_content = $ '<div class="tab-content"></div>'

      @ec.Categories.sync (categories) =>
        console.dir categories
        for category in categories
          # tab_pane = $("<div class='tab-pane#{if tab_list[0].children.length is 0 then " active" else ""}' id='#{category_name}'></div>")
          tab_list.append "<li class='#{if tab_list[0].children.length is 0 then " active" else ""}'><a href='##{category.name}' data-toggle='tab'>#{category.name[0]}</a></li>"



        @setWindow(tab_list)


  setWindow: (body) ->
    template = $("
      <div id='templage'>
        <div class='window emoji-pallet'>
          <div class='window-header'>
            <button type='button' class='close' data-dismiss='window' aria-hidden='true'>
              x
            </button>
            <h4 class='window-title text-primary'>
            </h4>
          </div>
          <div class='window-body'>
          </div>
        </div>
      </div>
    ").html()

    ep = new Window
      template: template
      title: 'emoji pallet'
      bodyContent: body
