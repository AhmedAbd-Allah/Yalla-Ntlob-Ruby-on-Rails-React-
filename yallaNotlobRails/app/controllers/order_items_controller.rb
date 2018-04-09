class OrderItemsController < ApplicationController
  before_action :set_order_item, only: [:show, :update, :destroy]

  # GET /order_items
  def index
    @order_items = OrderItem.where(order_id: request.headers["order-id"])
    @items_list = []
    @order_items.each do |i|
      @user = User.find(i[:user_id])
      @items_list.push({"item_id": i[:id] ,
        "user_id": @user[:id] ,
        "name": @user[:name] , "item": i[:item] ,
        "count": i[:count],
        "price": i[:price],
        "comment": i[:comment]})
    end
    render json: @items_list
  end

  # GET /order_items/1
  def show
    render json: @order_item
  end

  # POST /order_items
  def create
    @order_item = OrderItem.new(order_item_params)

    if @order_item.save
      render json: @order_item, status: :created, location: @order_item
    else
      render json: @order_item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /order_items/1
  def update
    if @order_item.update(order_item_params)
      render json: @order_item
    else
      render json: @order_item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /order_items/1
  def destroy
    @order_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order_item
      @order_item = OrderItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_item_params
      params.require(:order_item).permit(:order_id, :user_id, :item, :count, :price, :comment)
    end
end
