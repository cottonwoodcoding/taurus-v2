# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170612204235) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "part_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "parts", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "number"
    t.float "price"
    t.float "sale_price"
    t.integer "qty_on_hand"
    t.string "image"
    t.text "specifications"
    t.text "features"
    t.bigint "part_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_thumb"
    t.index ["part_category_id"], name: "index_parts_on_part_category_id"
  end

  create_table "service_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "services", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.bigint "service_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["service_category_id"], name: "index_services_on_service_category_id"
  end

  create_table "sites", force: :cascade do |t|
    t.string "name", null: false
    t.string "street", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip", null: false
    t.string "phone", null: false
    t.string "main_logo_url", null: false
    t.string "nav_logo_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "parts", "part_categories"
  add_foreign_key "services", "service_categories"
end
