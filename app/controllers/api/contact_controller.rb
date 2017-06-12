class Api::ContactController < ApplicationController
  def create
    ContactMailer.send_message(contact_params).deliver!
  end

  private
    def contact_params
      params.require(:contact).permit(:first_name, :last_name, :email, :phone, :message)
    end
end
