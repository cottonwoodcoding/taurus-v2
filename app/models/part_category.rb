class PartCategory < ApplicationRecord
  has_many :parts, dependent: :destroy
  validates_uniqueness_of :name
end
