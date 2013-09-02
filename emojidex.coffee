# emojidex coffee plugin for jQuery/Zepto and compatible
#
# =LICENSE=
# When used with the emojidex service enabled this library is
#   licensed under the LGPL[https://www.gnu.org/licenses/lgpl.html].
# When modified to not use the emojidex service this library is
#   dual licensed under
#   GPL v3[https://www.gnu.org/licenses/gpl.html]
#   AGPL v3[https://www.gnu.org/licenses/agpl.html]
# 
# The
# Copyright 2013 Genshin Souzou Kabushiki Kaisha

class Emojidex
  input_target: null
  pallet: null

  constructor: (target, options) ->
    console.log "Setting up new emojidex object."
    @input_target = target
    @setup_pallet()
    @create_default_pallet_switch() if options["default_pallet_switch"]

  setup_pallet: () ->
    @pallet = $('<div/>', {
      id: 'pallet'
    })
    @pallet.html "pppppppppp"

  create_default_pallet_switch: () ->
    pallet_switch = $('<button/>', {
      id: 'pallet_switch',
      text: 'e',
    }).insertAfter(@input_target)
    @set_pallet_switch(pallet_switch)

  set_pallet_switch: (target) ->
    target.popover({
      trigger: 'click',
      content: @pallet
    })

  ProcessOptions: (options) ->
    console.log "Processing emojidex options"

(($, window) ->
  $.extend $.fn, emojidex: (options) ->
    @defaultOptions =
      inline_editing: false,
      static_pallet: false,
      default_pallet_switch: true
    settings = $.extend({}, @defaultOptions, options)
    
    @each (i, el) =>
      $el = $(el)
      if !$.data($el, "plugin_#{'emojidex'}")
        $.data($el, "plugin_#{'emojidex'}", new Emojidex($el, settings))
      
      $.data($el, "plugin_#{'emojidex'}").ProcessOptions(settings)
    @
) this.jQuery or this.Zepto, this
