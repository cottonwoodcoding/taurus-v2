class Api::ServicesController < ApplicationController
  before_action :set_service_category, except: :index
  before_action :set_service, only: [:update, :destroy]

  def index
    render json: Service.all.order('lower(name)')
  end

  def create
    @service = @service_category.services.new(service_params)
    if @service.save
      render json: @service
    else
      failed_request(@service)
    end
  end

  def update
    if @service.update(service_parmas)
      render json: @service
    else
      failed_request(@service)
    end
  end

  def destroy
    @service.destroy
  end


  private
    def set_service_category
      @service_category = ServiceCategory.find(params[:service_category_id])
    end

    def set_service
      @service = Service.find(params[:id])
    end

    def service_params
      params.require(:service).permit(:name, :description)
    end
end
