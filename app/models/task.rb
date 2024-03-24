class Task < ApplicationRecord
  belongs_to :user
  validates :title, :description, presence: true
  validates :title, uniqueness: true
  enum status: { to_do: 0, in_progress: 1, done: 2 }
end
