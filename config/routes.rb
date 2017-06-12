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
    put '/part_categories/:id/file_upload', to: 'part_categories#file_upload'
    put '/service_categories/:id/file_upload', to: 'service_categories#file_upload'
    resources :parts, only: [:index, :show, :destroy]

    # Site Resources
    get 'site', to: 'site#show'
    put 'site/file_upload', to: 'site#file_upload'
    put 'site', to: 'site#update'

    # Contact Resources
    post 'contact', to: 'contact#create'
  end

  get '*other', to: 'static#index'
end
