#### About

##### Prerequisites

The setups steps expect following tools installed on the system.

- Github
- Ruby 3.3.0
- Rails 7.1.3
##### 1. Check out the repository

```bash
git clone https://github.com/sandeshbodake/pesto-tech-assessment/
```

##### 2. Setup database.yml file

Set your postgres username and password

##### 3. Create and setup the database

Run the following commands to create and setup the database.

```ruby
rails db:create && rails db:migrate
```

##### 5. Start the Rails server

You can start the rails server using the command given below.

```ruby
bin/dev
```
