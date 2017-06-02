class ApplicationController < ActionController::API
  include ActionController::Serialization
  include DeviseTokenAuth::Concerns::SetUserByToken

  def failed_request(model)
    render json: {errors: model.errors.full_messages.join(',')}, status: :unprocessable_entity
  end

  def client
    render file: "#{Rails.root}/public/index.html"
  end
end
