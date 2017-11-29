class CreateTelemedicines < ActiveRecord::Migration[5.1]
  def change
    create_table  :telemedicines do |t|
    	t.string		:email
    	t.boolean		:telemedicine_law    	
    	t.integer		:zip_code
    	t.string		:gender
    	t.date			:dob
      t.string    :have_you_had_a_physical_exam_with_a_healthcare_provider
      t.string    :have_you_know_your_blood_pressure
      t.boolean   :payment_success, default: false
      t.string    :profile_image
      t.string    :photo_id_image
    	t.text			:json_data
      t.timestamps
    end
  end
end
