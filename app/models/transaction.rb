class Transaction < ApplicationRecord
  self.primary_key = :transaction_id
  belongs_to :user

  before_create do
    self.transaction_id = SecureRandom.uuid
  end
end
