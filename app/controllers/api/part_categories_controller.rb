class Api::PartCategoriesController < ApplicationController
  before_action :set_part_category, only: [:show, :update, :destroy, :file_upload]

  def index
    render json: PartCategory.all
  end

  def show
    render json: @part_category
  end

  def create
    cat = PartCategory.new(cat_params)
    if (cat.save)
      render json: cat
    else
      failed_request(cat)
    end
  end

  def update
    if @part_category.update(cat_params)
      render json: @part_category
    else
      failed_request(@part_category)
    end
  end
 
  def file_upload
    obj = Cloudinary::Uploader.upload(params[:file].path)
    url = obj['url']
    thumb = ActionController::Base.helpers.cl_image_path(
      "#{obj['public_id']}.#{obj['format']}",
      width: 150, height: 150, crop: 'scale'
    )
    @part_category.update(image: thumb) ? render(json: @part_category) : failed_request(@part_category)
  end

  def destroy
    @part_category.destroy
  end

  private
    def set_part_category
      @part_category = PartCategory.find(params[:id])
    end

    def cat_params
      params.require(:part_category).permit(:name)
    end
end
