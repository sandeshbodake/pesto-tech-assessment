# frozen_string_literal: true

class Api::V1::PasswordsController < Api::V1::BaseController
  skip_before_action :authenticate_user!
  skip_before_action :authenticate_user_using_x_auth_token

  def create
    user = User.find_for_database_authentication(email: session_params[:email])
    if user.present?
      user.reset_password_link
    else
      render_error({ error: t("not_found", entity: "Email") }, :not_found)
    end
  end

  def update
    user = User.find_by(reset_password_token: session_params[:token])
    if user.present? && user.password_token_valid?
      if user.reset_password(session_params[:password], session_params[:password_confirmation])
        sign_in(user)
        render_json({ auth_token: user.authentication_token, user: })
      else
        render_error({ error:  user.errors.full_messages }, :unprocessable_entity)
      end
    else
      render_error({ error: t("expired", entity: "Password Link") }, :not_found)
    end
  end

  private
    def session_params
      params.require(:user).permit(:email, :token, :password, :password_confirmation)
    end
end
