# frozen_string_literal: true

class RegistrationsController < Devise::RegistrationsController
  include ApiResponders
  skip_before_action :verify_authenticity_token if Rails.env.development?

  before_action :load_resource

  def update
    if resource.update_with_password(update_params)
      resource.update(password_changed: true)
      bypass_sign_in resource, scope: :user
      render_message(t("successfully_updated", entity: "Password"))
    else
      clean_up_passwords resource
      render_error(resource.errors_to_sentence)
    end
  end

  private
    def update_params
      resource_params.permit(:password, :password_confirmation, :current_password)
    end

    def resource_params
      params.require(:user)
    end

    def load_resource
      self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    end
end
