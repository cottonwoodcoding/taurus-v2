class Site < ApplicationRecord
  validates_presence_of :name, :street, :city, :state, :zip, :phone, :main_logo_url, :nav_logo_url
end
