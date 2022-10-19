Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'transactions/index'
      post 'transactions/create'
      get '/show/:id', to: 'transactions#show'
      delete '/destroy/:id', to: 'transactions#destroy'
      get 'users/index'
      post 'users/create'
    end
  end
  root to: "transactions#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
