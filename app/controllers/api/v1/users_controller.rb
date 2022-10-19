class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all.order(created_at: :desc)
    render json: @users
  end
  def create
    @user = User.create!(user_params)
    if @user
      render json: @user
    else
      render json: @user.errors
    end
  end
  def user_params
    params.permit(:name)
  end
end
