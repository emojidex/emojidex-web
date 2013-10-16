require 'json'

module Emojidex
  # listing, search and on-the-fly conversion of standard UTF emoji
  class UTF
    attr_reader :list

    def initialize
      file = File.join(File.dirname(File.expand_path(__FILE__)),
                       './utf/utf-emoji.json')
      @list = JSON.parse file
    end

    def where(options = {})
    end
  end
end
