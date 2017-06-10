class Part < ApplicationRecord
  belongs_to :part_category
  serialize :images, Array
  serialize :features, Array
  serialize :speicification, Array
  validates_presence_of :name

  def self.search(query)
    where("name LIKE ? OR description LIKE ?", "%#{query}%", "%#{query}%")
  end
end
