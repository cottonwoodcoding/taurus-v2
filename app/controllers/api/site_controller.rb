class Api::SiteController < ApplicationController
  before_action :set_site

  def show
    render json: @site
  end

  def update
    @site.update(site_params) ? render(json: @site) : failed_request(@site)
  end

  def file_upload
    url = Cloudinary::Uploader.upload(params[:file].path)['url']
    @site.update(params[:column] => url) ? render(json: @site) : failed_request(@site)
  end

  private
    def site_params
      params.require(:site).permit(:name, :street, :city,
                                   :state, :zip, :phone,
                                   :main_logo_url, :nav_logo_url)
    end

    def set_site
      @site = Site.first
    end
end
