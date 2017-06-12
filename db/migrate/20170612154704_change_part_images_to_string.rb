class ChangePartImagesToString < ActiveRecord::Migration[5.1]
  def change
    rename_column :parts, :images, :image
    change_column :parts, :image, :string
  end
end
