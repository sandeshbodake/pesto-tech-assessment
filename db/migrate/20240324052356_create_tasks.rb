class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks, id: :uuid do |t|
      t.string :title
      t.string :description
      t.string :status
      t.references :user, type: :uuid

      t.timestamps
    end
  end
end
