class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    @orders = Order.where(owner_id: request.headers["owner-id"])

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(order_params)
    @order.status = 0;
    if @order.save
      @user_ids = params[:ids]
      @user_ids.each do |i|
        @order_invitation = OrderInvitation.new(user_id:i,order_id:@order['id'],status:0)
        @order_invitation.save
      end
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(status:1)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
    render json: { group: @order ,status: 200, msg: 'group have been deleted.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:order_type, :status, :meal_image, :date_time ,:owner_id,:restaurant)
    end
end
