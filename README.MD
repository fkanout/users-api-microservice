# Users API Microservice
This is a web microservice - REST API connected to a relational DB (PostgreSQL). It has been developed to manage users, means, perform **CRUD** operations (Create, Read, Write, Delete).

# Features

* Provides important security headers - [helmet](https://www.npmjs.com/package/koa-helmet)

* Logs all input/output HTTP requests - [koa-logger](https://www.npmjs.com/package/koa-logger) 


* Force and protect the routes inputs (e.g qs, body, params etc...) - [koa-router-joi-validation](https://www.npmjs.com/package/koa-router-joi-validation)

* Force code style  on commits and passing tests on push to remote - [Husky]( https://www.npmjs.com/package/husky) 

* Each incoming HTTP request has a unique request Id that is passed across the execution flow and it's published with user payload in the event, for traceability inside and outside the API (entire system).

* Exposes a `/healthCheck` route to verify the availability of the service.

* CORS Cross-Origin Resource Sharing.




# Routes (endpoints)
The routes are exposed behind a version prefix `/api/v1` (see Environment variables section)

Method | Resource | Description
--- | --- | ----
`GET` | `/users` | Returns the collection of users present in the DB wih filters: `firstName`, `email` and `address`
`GET` | `/users/:id` | Returns the specified id user
`POST` | `/users` | Create a new user
`PATCH` | `/users/:id` | Updates an already created user via its id
`DELETE` | `/users/:id` | Delete a user via its id 



# Getting Started

1. Clone the project

`git clone https://github.com/fkanout/users-api-microservice && cd users-api-microservice`

2. install dependencies 

`npm install`


> 🚧 if `users` table doesn't exists, **inside the project directory** run 

 `npx knex migrate:latest`

3. As it's a TypeScript, a build phase is required.

`npm run build`

4. Start  
`npm start`


# Environment variables 
Variable | Default value | Description
--- | --- | ----
`NODE_ENV` | `development` | Define the app env, which changes the DB connection config too
`USERS_API_PORT` | `3000` | Server running port
`USERS_API_PREFIX` | `/api/v1` | The prefix that is to API 
`USERS_API_DB_HOST` | `N/A` | Database host
`USERS_API_DB_USER_NAME`| `N/A` | Database connection username
`USERS_API_DB_PASSWORD`| `N/A` | Database connection password
`USERS_API_DB_DB_NAME`| `N/A` | Database name
`USERS_API_DB_PORT`| `N/A` | Database port
`USERS_API_REDIS_HOST`| `N/A` | Redis connection host
`USERS_API_REDIS_PORT`| `N/A` | Redis connection port
`USERS_API_REDIS_PASSWORD`| `N/A` | Redis connection password



# TBD/To-be-enhanced)
- Finish the *TODOs* in the codebase.
- Update and complete the tests to cover more use cases.
- Add Swagger specification to the routes.
- Add the DB service (singleton class) in UserController with a dependency injection using e.g. http://inversify.io/ (could be overkill and much of boilerplate code for one route?!)
- Add more complex query possibility (e.g AND, OR )
- Docker-ready 




