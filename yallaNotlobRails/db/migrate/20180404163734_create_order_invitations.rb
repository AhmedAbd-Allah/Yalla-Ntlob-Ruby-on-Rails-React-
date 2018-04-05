class CreateOrderInvitations < ActiveRecord::Migration[5.1]
  def change
    create_table :order_invitations do |t|
      t.references :user, foreign_key: true
      t.references :order, foreign_key: true
      t.string :status

      t.timestamps
    end
  end
end
