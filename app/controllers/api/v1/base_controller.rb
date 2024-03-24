# frozen_string_literal: true

class Api::V1::BaseController < ApplicationController
  include ApiResponders
  include Loggable
  include ApiRescuable
  include Authenticable

  skip_before_action :verify_authenticity_token if Rails.env.development?
end
