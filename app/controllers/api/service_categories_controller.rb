class Api::ServiceCategoriesController < ApplicationController
  before_action :set_service_category, only: [:show, :update, :destroy]

  def index
    render json: ServiceCategory.all
  end

  def show
    render json: @service_category
  end

  def create
    cat = ServiceCategory.new(cat_params)
    if (cat.save)
      render json: cat
    else
      failed_request(cat)
    end
  end

  def update
    if @service_category.update(cat_params)
      render json: @service_category
    else
      failed_request(@service_category)
    end
  end

  def destroy
    @service_category.destroy
  end

  private
    def set_service_category
      @service_category = ServiceCategory.find(params[:id])
    end

    def cat_params
      params.require(:service_category).permit(:name)
    end
end
