class Api::V1::TransactionsController < ApplicationController
  def index
    @transactions = Transaction.all.order(created_at: :desc)
    render json: @transactions.to_json(except: [:created_at,:updated_at],
                               include: [user: { only: [:name]}])
  end

  def create
    @transaction = Transaction.create!(transaction_params)
    if @transaction
      render json: @transaction
    else
      render json: @transaction.errors
    end
  end

  private
  def transaction_params
    params.permit(:transaction_date, :title, :general_ledger_account, :amount,:user_id)
  end

  def recipe
    @transaction ||= Transaction.find(params[:id])
  end
end
