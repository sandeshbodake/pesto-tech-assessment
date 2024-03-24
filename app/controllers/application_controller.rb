# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Expirable
  include Pundit::Authorization
end
