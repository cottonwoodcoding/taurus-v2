class Part < ApplicationRecord
  belongs_to :part_category
  serialize :images, Array
  serialize :features, Array
  serialize :speicification, Array
  validates_presence_of :name

  def self.search(query)
    where("lower(name) LIKE ? OR lower(description) LIKE ?", "%#{query.downcase}%", "%#{query.downcase}%")
  end
end
