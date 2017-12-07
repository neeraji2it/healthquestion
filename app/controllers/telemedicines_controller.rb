class TelemedicinesController < ApplicationController
  before_action :set_telemedicine, only: [:show, :edit, :update, :destroy]
  before_action :clean_select_multiple_params, only: [:telemedicines_servise_save]

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
      @is_selected_different_pharmacy = params[:payment].present? ? params[:payment][:is_selected_different_pharmacy] : nil
      @telemedicine = Telemedicine.create(email: params[:email], telemedicine_law: params[:telemedicine_law], zip_code: params[:zip_code], gender: params[:gender], dob: @dob,have_you_had_a_physical_exam_with_a_healthcare_provider: params["Have you had a physical exam with a healthcare provider in the past five years?"], have_you_know_your_blood_pressure: params["Have you know your blood pressure?"], profile_image: params[:profile_image], photo_id_image: params[:photo_id_image], do_you_have_a_drug_preference: params["Do you have a drug preference?"], is_selected_different_pharmacy: @is_selected_different_pharmacy)

      params.delete("profile_image")
      params.delete("photo_id_image")
      params.delete("female")
      if @telemedicine.have_you_had_a_physical_exam_with_a_healthcare_provider == "No" or @telemedicine.have_you_know_your_blood_pressure == "I Do not know my blood pressure"
        params.delete("user")
        params.delete("payment")
      end
      
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
    @different_pharmacy = params[:different_pharmacy]
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

  private

  def clean_select_multiple_params hash = params
    hash.each do |k, v|
      case v
      when Array then v.reject!(&:blank?)
      when Hash then clean_select_multiple_params(v)
      end
    end
  end
end
