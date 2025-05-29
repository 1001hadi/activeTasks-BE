# Active Tasks

## requirements:

1: Must have authentication and have admin auth

- login page
- need input fields for email and password
- direct to register page if not user

- register page
- need name,email,pass and invite code
- direct to login if already a user

2: Admin
-- Main page/ Dashboard for admin

- must have navbar / sidebar to display Menu
- progress bar can be added for tasks and task type
- display All tasks and task process in dashboard
  - can use table to display tasks with the priority and published date
  - admin can see all tasks with see all and direct admin to manage tasks page
  - only admin can create / edit task

-- Create Task page

- input for task title, task desc, priority, due date,
  assigned to and task checklist
- for assigning: a pop up with users name or picture
- for check list: add the process steps to complete task

-- Update Task page

- can be same as Create Task page with update and remove BTN for same field
- can give alert for delete items on task.
- after update or delete task redirect to Manage task page

-- Manage Tasks page

- display task in card with :
  - task title
  - description
  - start date and due date
  - can display assigned to (users)
- task can have category filter (H-M-L)

-- Users page (only if have time)

- display user
  - create user card
    - display name, email,
    - can have profile picture and their task status

3: User
-- Home / Dashboard page

- display user menu and user information
- display task that related to user on the progress bar with the task priority
- display user tasks in table, see all BTN can be added

-- User tasks page

- can be the same as manage tasks for admin
- display task in card
- display number of task
- status filter can be added

-- Edit Page

- display task information (can be pop up)
  - title, description, status, priority, due date, assigned
- user only can edit the process checklist (can be checkbox)
- if user checklist update, task status can be cheng to in progress or complete.
- this cheng can update task in admin dashboard.

/////////////////////////////////////////////////////////////////////
Backend folder and file structures
├── backend/
│ ├── config/
│ │ └── db.js # For database connection settings
│ ├── controllers/
│ │ ├── authController.js # Logic for user login, register
│ │ ├── taskController.js # Logic for creating, updating tasks
│ │ └── userController.js # Logic for managing users (admin actions)
│ ├── middleware/
│ │ ├── authMiddleware.js # Checks if user is logged in and authorized
│ │ └── errorHandler.js # Catches and handles errors gracefully
│ ├── models/
│ │ ├── User.js # Defines how a User looks in the database
│ │ └── Task.js # Defines how a Task looks in the database
│ ├── routes/
│ │ ├── authRoutes.js # API paths for login, register
│ │ ├── taskRoutes.js # API paths for task actions
│ │ └── userRoutes.js # API paths for user actions (admin)
│ ├── utils/
│ │ └── generateToken.js # Helper function for creating JWTs
│ ├── .env # Your secret environment variables
│ ├── .gitignore # Tells Git what files to ignore
│ ├── package.json # Lists all your project's dependencies and scripts
│ ├── server.js # The main file that starts your server
