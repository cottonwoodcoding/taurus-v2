Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
  end

  get '*unmatched_route', to: 'application#client'
end
