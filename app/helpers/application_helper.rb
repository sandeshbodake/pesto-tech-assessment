# frozen_string_literal: true

module ApplicationHelper
  def get_client_props
    {
      user: current_user,
      is_admin: current_user&.super_admin?
    }
  end
end
