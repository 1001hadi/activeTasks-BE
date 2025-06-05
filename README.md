# Active Task BackEnd

[Project backEnd Repo:](https://github.com/1001hadi/activeTasks-FE)

#

## Build Process =>

1 - Start project and install the necessary packages

- mongoose, express, dotenv, jsonwebtoken,bcryptjs ,cors,multer
- Files structures: Create folders and files
- setup the server.mjs and import necessary file and middlewares

2 - Data base setup

- create folder and file to setup Data base with Mongoose
- call it in server.mjs

3 - Setup Schemas

- create user schema
- create task schema
- add sub schema for checklist

4 - Create Auth Routes / middlewares

- start with Authentication "Register and login" users route
  - generate JWt token based on user ID
  - to get secret key[node -e "console.log(require('crypto').randomBytes(32).toString('he
    x'))"], got this from stack overflow.
- get user route
- update user route
- make sure give description for each routes
- create protect route middleware
- create admin access middleware
- add protect middleware to needed route
- complete the auth controller

- Register route controller
  - check for existing user
  - check if it has admin role & token
  - hash the password
  - return user register data (JWT)
  - handle error
  -
- Login route controller

  - check for valid user (with email)
  - check if password match with bcrypt
  - return user login data (JWT)
  - handle error

- Get profile route controller

  - find user with their ID from (req)
  - check if user exist
  - handle error

- Edit user profile controller

  - find user with ID
  - update name, email, password
  - return the updated data
  - handle error

- handle profile image upload
  - add uploads folder to store added image
  - add post rout for upload image
  - write logic on auth controllers
  - add upload file middleware
    - create file configuration function
    - create file filter function
    - test on postman/thunderClient
    -

5 - Create user routes

    - create routes controller for users routes
    - route must be privet
      - use auth middlewares for admin only duty
      - test on go with thunderClient / Postman

    - create get all users route
      - don't show their password(select)
      - add each users task count
      - add users tasks status

    - create get specific user route
      - get specific user with findById
      - don't show their password(select)

    - create delete user route
      - find user and delete from req.param
      - check if user existed for error handling
      - response with removed user

6 - Create task routes

    - create task routes and export them
    - use auth middlewares for admin only duty
    - create controller for each route
    - import controller to taskRoutes

    - create task route
      - import the Task schema
      - destructure needed task variables from req.body
      - make sure check for assigned to be an array
      - create task var and assign variables from req.body to it
      - return task var in response.

    - get all tasks for admin only route
      - get task status from req.query to track the tasks
      - create obj to store task status
      - If status exists, add it to obj
      - populate task from status obj for admin and user separately
      - add completed checklist to track completed tasks
      - count the status summary and return their count
      - response the status data
      - handle error

    - get task by id route
      - initialize the task from req.param with id
      - populate the task
      - check if task exist
      - response the task
      - handle error

    - update/ edit task route
      - find the task from prams.id
      - check if task existed
      - assign the property that can be Edit
      - check the if assignedTo is array
      - response the edited task
      - handle error

    - remove task route
      - find the task from prams.id
      - check if the task exist
      - remove the task and response
      - handle error


    - edit task status route
      - find the task from prams.id
      - check if task existed
      - check if assigned task id matched to user id
      - if not matched and not admin, cant' edit
      - only admin can edit directly
      - check if completed, assign it to 100 for progress bar
      - response the edited task
      - handle error

    - edit task checklist route
      - must have dynamic calculation of checklist for progress
      - user can't remove only edit checklist!
      - find the task from prams.id
      - users only allowed to edit their checklist
      - edit progress after checklist updated!
      - task must show completed when all checklist marked
      -  save and response the edited checklist
      - handle error

    - main dashboard route
      - ge total of status
      - include all status
      - handle status percentage and add total count
      - get all priority levels
      - get recent tasks(5 or 10)
      - select needed properties
      - handle error

    - user dashboard route
      - get data(task) for logged in user
      - get user specific tasks
      - get task percentage by status
      - get user total status
      - get user task priority levels
      - get user recent task (5 or 10)
      - response and handle error
