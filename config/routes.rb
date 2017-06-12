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

    get '/parts/search'
    put '/parts/:id/file_upload', to: 'parts#file_upload'
    resources :parts, only: [:index, :show, :destroy]

    # Site Resources
    get 'site', to: 'site#show'
    put 'site/file_upload', to: 'site#file_upload'
    put 'site', to: 'site#update'
  end

  get '*unmatched_route', to: 'application#client'
end
