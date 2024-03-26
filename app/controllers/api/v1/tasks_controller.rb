# frozen_string_literal: true

class Api::V1::TasksController < Api::V1::BaseController
  before_action :load_task, only: [:update, :destroy]

  def index
    @tasks = current_user.tasks
  end

  def create
    current_user.tasks.create!(task_params.merge({ user_id: current_user.id }))
    render_message(t("successfully_created", entity: "Task"))
  end

  def update
    @task.update!(task_params)
    render_message(t("successfully_updated", entity: "Task"))
  end

  def destroy
    @task.destroy!
    render_message(t("successfully_deleted", count: 1, entity: "Task"))
  end

  private
    def task_params
      params.require(:task).permit(:title, :description, :status)
    end

    def load_task
      @task = current_user.tasks.find(params[:id])
    end
end
