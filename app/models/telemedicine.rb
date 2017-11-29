class Telemedicine < ApplicationRecord
	serialize :json_data, JSON
	mount_uploader :profile_image, ImageUploader
	mount_uploader :photo_id_image, PhotoIdImageUploader
end
