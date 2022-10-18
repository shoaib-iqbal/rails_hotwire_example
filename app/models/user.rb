class User < ApplicationRecord
  self.primary_key = :user_id
  has_many :transactions, dependent: :destroy

  before_validation do
    self.user_id = SecureRandom.uuid
  end
  validates_uniqueness_of :name
end
