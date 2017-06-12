class ContactMailer < ApplicationMailer
  include SendGrid
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.contact_mailer.send.subject
  #
  def send_message(contact_params)
    @first_name = contact_params[:first_name]
    @last_name = contact_params[:last_name]
    @email = contact_params[:email]
    @phone = contact_params[:phone]
    @message = contact_params[:message]
    mail to: ENV['EMAILS'], subject: "New Message About Taurus Trailer From: #{@first_name} #{@last_name}"
  end
end
