class AddImageToServiceCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :service_categories, :image, :string
  end
end
