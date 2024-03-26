# frozen_string_literal: true

require "test_helper"

class Api::V1::TasksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = create :user, :admin
    sign_in @admin
    @tasks = create_list(:task, 3, user: @admin)
    @headers = headers(@admin)
  end

  def test_list_all_tasks_for_a_user
    get api_v1_tasks_url, headers: @headers

    assert_response :success
    task = response_body["tasks"].first
    assert_equal %w{ id description title created_at updated_at user_id }.sort, task.keys.sort
  end

  def test_create_a_valid_task
    payload = {
      task: {
        title: "Call Zach!",
        description: "Call to inform about the meeting."
      }
    }

    assert_difference "@admin.tasks.count" do
      post api_v1_tasks_url, params: payload, headers: @headers
    end

    assert_response :success
    assert_equal response_body["notice"], t("successfully_created", entity: "Note")
  end

  def test_returb_error_on_creating_task_with_blank_title
    post api_v1_tasks_url, params: { task: { title: "", description: "zach@example.com" } },
         headers: @headers
    assert_response :unprocessable_entity

    assert_equal response_body["error"], "Title can't be blank"
  end

  def test_returb_error_on_creating_task_with_blank_description
    post api_v1_tasks_url, params: { task: { title: "Zach", description: "" } },
         headers: @headers
    assert_response :unprocessable_entity

    assert_equal response_body["error"], "Description can't be blank"
  end
end
