require 'net/http'
require 'open-uri'

class ApiServices

	def self.check_valid_zip(zip_code)
		url = URI.escape("https://maps.googleapis.com/maps/api/geocode/json?components=country:US|postal_code:#{zip_code}&key=AIzaSyDqkjDvz06uRzbkSRzKhLnWO0e365wndlQ")
		result = open(url).read
		data = JSON.parse(result)
		return data
	end

end