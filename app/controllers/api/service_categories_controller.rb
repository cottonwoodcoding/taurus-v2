class Api::ServiceCategoriesController < ApplicationController
  before_action :set_service_category, only: [:show, :update, :destroy, :file_upload]

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

  def file_upload
    obj = Cloudinary::Uploader.upload(params[:file].path)
    url = obj['url']
    thumb = ActionController::Base.helpers.cl_image_path(
      "#{obj['public_id']}.#{obj['format']}",
      width: 150, height: 150, crop: 'scale'
    )
    @service_category.update(image: thumb) ? render(json: @service_category) : failed_request(@service_category)
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
