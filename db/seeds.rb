# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
NUM_OF_USERS = 10
User.destroy_all
NUM_OF_USERS.times do |i|
  User.create!({ name: Faker::Name.unique.name })
end

NUM_OF_TRANSACTIONS = 20
Transaction.destroy_all
NUM_OF_TRANSACTIONS.times do |id|
  Transaction.create!({
                transaction_date: Faker::Date.between(from: 1.days.ago, to: 6.months.ago).strftime("%d/%m/%Y"),
                title: Faker::Lorem.sentence(word_count: 3),
                general_ledger_account: Faker::Lorem.sentence(word_count: 5),
                amount: rand(1.5..2000),
                user_id: User.last.id
              })
end