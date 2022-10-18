class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions, id: false, primary_key: :transaction_id  do |t|
      t.uuid :transaction_id,  null:false
      t.datetime :transaction_date
      t.string :title
      t.string :general_ledger_account
      t.decimal :amount
      t.uuid :user_id

      t.timestamps
    end
  end
end
