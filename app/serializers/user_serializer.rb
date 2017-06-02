class UserSerializer < ActiveModel::Serializer
  attributes :uid, :provider, :name, :email
end
