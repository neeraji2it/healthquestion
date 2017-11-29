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

ActiveRecord::Schema.define(version: 20171121053258) do

  create_table "telemedicines", force: :cascade do |t|
    t.string "email"
    t.boolean "telemedicine_law"
    t.integer "zip_code"
    t.string "gender"
    t.date "dob"
    t.string "have_you_had_a_physical_exam_with_a_healthcare_provider_in_the_past_five_years"
    t.string "have_you_know_your_blood_pressure"
    t.boolean "payment_success", default: false
    t.string "profile_image"
    t.string "photo_id_image"
    t.text "json_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
