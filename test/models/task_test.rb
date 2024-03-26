require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @task = build(:task, user: @user)
  end

  def test_task_is_valid
    assert @task.valid?
  end

  def test_title_cannot_be_blank
    @task.title = nil
    @task.save
    assert_not @task.valid?
    assert_equal @task.errors.full_messages, ["Title can't be blank"]
  end

  def test_description_cannot_be_blank
    @task.description = nil
    @task.save
    assert_not @task.valid?
    assert_equal @task.errors.full_messages, ["Description can't be blank"]
  end

  def test_task_should_not_be_valid_without_a_user
    @task.user = nil
    @task.save
    assert_not @task.valid?
    assert_equal @task.errors.full_messages, ["User must exist"]
  end

  def test_title_should_not_be_duplicate
    @task.save
    duplicate_task = @task.dup
    duplicate_task.save
    assert_not duplicate_task.valid?
    assert_equal duplicate_task.errors.full_messages, ["Title has already been taken"]
  end
end
