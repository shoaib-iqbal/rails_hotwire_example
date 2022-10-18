class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: false, primary_key: :user_id do |t|
      t.uuid :user_id, null:false
      t.string :name

      t.timestamps
    end
  end
end
