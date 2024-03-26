# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    devise_scope :user do
      post "login", to: "sessions#create", as: "login"
      delete "logout", to: "sessions#destroy", as: "logout"
    end

    resources :users, only: [:show, :create, :update, :destroy], constraints: { id: /.*/ }
    resources :tasks, only: [:index, :create, :update]

    resources :cypress_runs, only: [:create]
  end
end
