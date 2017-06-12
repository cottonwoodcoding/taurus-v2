class AddImageToPartCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :part_categories, :image, :string
  end
end
