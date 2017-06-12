class Api::PartsController < ApplicationController
  before_action :set_part_category, except: [:destroy, :show, :search, :file_upload]
  before_action :set_part, only: [:update, :destroy, :show, :file_upload]

  def index
    render json: @part_category.parts.order('lower(name)')
  end

  def show
    render json: @part
  end

  def create
    @part = @part_category.parts.new(part_params)
    if @part.save
      render json: @part
    else
      failed_request(@service)
    end
  end

  def file_upload
    obj = Cloudinary::Uploader.upload(params[:file].path)
    url = obj['url']
    thumb = ActionController::Base.helpers.cl_image_path(
      "#{obj['public_id']}.#{obj['format']}",
      width: 150, height: 150, crop: 'scale'
    )
    @part.image = url
    @part.image_thumb = thumb
    @part.save ? render(json: @part) : failed_request(@part)
  end

  def update
    if @part.update(part_params) 
      render json: @part
    else
      failed_request(@service)
    end
  end

  def destroy
    @part.destroy
  end

  def search
    parts = Part.search(params[:query])
    render json: parts
  end
  
  private 
    def set_part_category
      @part_category = PartCategory.find(params[:part_category_id])
    end

    def set_part
      @part = Part.find(params[:id])
    end

    def part_params
      params[:part] = JSON.parse(params[:part])
      params.require(:part).permit(
        :name, :description, :number, :price, :sale_price, :qty_on_hand,
        features: [], 
        specifications: [:specName, :specValue ]
      )
    end
end
