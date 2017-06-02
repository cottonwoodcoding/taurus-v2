class PartCategory < ApplicationRecord
  validates_uniqueness_of :name
end
