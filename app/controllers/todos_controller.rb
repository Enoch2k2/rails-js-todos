class TodosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @todos = Todo.all
    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end

  def show
    @todo = Todo.find_by_id(params[:id])
    render json: @todo
  end

  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo, status: 201
    else
      render json: { errors: @todo.errors.full_messages }, status: :bad_request
    end
  end

  private
    def todo_params
      params.require(:todo).permit(:title, :complete)
    end
end
