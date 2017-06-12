class AddImageThumbToParts < ActiveRecord::Migration[5.1]
  def change
    add_column :parts, :image_thumb, :string
  end
end
