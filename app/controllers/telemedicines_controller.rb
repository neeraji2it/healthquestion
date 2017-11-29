class TelemedicinesController < ApplicationController
  before_action :set_telemedicine, only: [:show, :edit, :update, :destroy]

  def index
    @telemedicines = Telemedicine.all
  end

  def telemedicines_servise    
  end

  def telemedicines_servise_save 
    @dob = Date.strptime(params[:dob], "%m/%d/%Y")
    if params["gender"] == "Female"   
      @telemedicine = Telemedicine.create(email: params[:email], telemedicine_law: params[:telemedicine_law], zip_code: params[:zip_code], gender: params[:gender], dob: @dob, json_data: params[:female], profile_image: params[:profile_image], photo_id_image: params[:photo_id_image])
    else     
      @telemedicine = Telemedicine.create(email: params[:email], telemedicine_law: params[:telemedicine_law], zip_code: params[:zip_code], gender: params[:gender], dob: @dob,have_you_had_a_physical_exam_with_a_healthcare_provider: params["Have you had a physical exam with a healthcare provider in the past five years?"], have_you_know_your_blood_pressure: params["Have you know your blood pressure?"], profile_image: params[:profile_image], photo_id_image: params[:photo_id_image])
      params.delete("profile_image")
      params.delete("photo_id_image")
      @telemedicine = @telemedicine.update_attributes(json_data: params)
    end    
    render :json => true
  end

  def dosage_preference_list
    @drug_name = params[:drug_name]
  	respond_to do |format|
      format.js
    end
  end

  def treated_for_ed
    @medications = params[:medications]
    respond_to do |format|
      format.js
    end
  end

  def get_erections
    @erections = params[:erections] ? params[:erections] : []
    respond_to do |format|
      format.js
    end
  end

  def payment_view
    @per_nonth_quntity = params[:per_nonth_quntity]
    @drug_name = params[:drug_name]
    @drug_shipped_type = params[:drug_shipped_type]
    @drug_strength = params[:drug_strength]
    @total_price = params[:total_price]
    respond_to do |format|
      format.js
    end
  end

  def update_drug
    @drug_strength = DRUG_PREFERENCE[params[:drug_name]].keys
    render json: @drug_strength
  end

  def check_valid_zip
    @data = ApiServices.check_valid_zip(params[:user][:zip_code])
    respond_to do |format|
      format.json { render :json => @data["results"].present? }
    end
  end
end
