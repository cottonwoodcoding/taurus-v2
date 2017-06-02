class ServiceCategory < ApplicationRecord
  validates_uniqueness_of :name
  has_many :services, dependent: :destroy
end
