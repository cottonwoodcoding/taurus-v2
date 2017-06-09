Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :service_categories do
      resources :services
    end

    resources :services, only: [:index]

    resources :part_categories do
      resources :parts
    end

    resources :parts, only: [:index, :show, :destroy]
  end

  get '*unmatched_route', to: 'application#client'
end
