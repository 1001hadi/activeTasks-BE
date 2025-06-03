# Active Task BackEnd

[Project frontEnd Repo:](https://github.com/1001hadi/activeTasks-FE)

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

4 - Create Routes / middlewares

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
  
