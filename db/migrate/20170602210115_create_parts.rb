class CreateParts < ActiveRecord::Migration[5.1]
  def change
    create_table :parts do |t|
      t.string :name
      t.string :description
      t.string :number
      t.float :price
      t.float :sale_price
      t.integer :qty_on_hand
      t.text :images
      t.text :specifications
      t.text :features
      t.belongs_to :part_category, foreign_key: true

      t.timestamps
    end
  end
end
