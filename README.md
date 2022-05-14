# Node Boilerplate

This is a node with express (no typescript) version of Boilerplate.
This project meant to help you build a scalable, production-ready,
and well-documented Node App. It can be useful for developer who
wants to build a RESTFul API using Node with Express Framework,
or to fully create a server-side Web Application.

## Default Boilerplate Package

This project does not implement any Database Installation,
Provider, non Driver by default. You may choose and configure
your own database driver, or checking out the other git branches
for top-selected database drivers for Relational or Non Relational
Database along with the ORM (Sequelize, Mongoose, TypeORM, Prisma).

## Features

- Domain Driven Design Implemented
- Configurable Global Variables
- Swagger Docs Installed
- Central Error Handler
- Well Documented Error Contract
- Syntax Sugar Pagination Builder
- Custom Libraries Configured
- Bunch of Useful Utilities Helper
- ESLint and Prettier Support
- Husky, Lintstaged, and Commitlint Configured Automatically
- Docker and Compose For Production and Development Ready
- Database Dependency Free

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Defaults to 3000

`JWT_SECRET` - Defaults to SECRET

`JWT_EXPIRY` - Defaults to 1440 (1 DAY)

`JWT_RESET_PASSWORD_EXPIRATION_MINUTES` - Defaults to 10 minutes

`JWT_VERIFY_EMAIL_EXPIRATION_MINUTES` - Defaults to 10 minutes

## Run Locally

Clone the project

```bash
  git clone https://github.com/bramadl/node-boilerplate.git
```

Go to the project directory

```bash
  cd node-boilerplate
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```

## Default Endpoints

The project includes some boilerplate for endpoints example.
Below are listed two services for exposed endpoints given
from the boilerplate.

### Authentication Service

#### Sign In With Email and Password

```http
  POST /api/auth/login
```

#### Sign Up With First Name, Last Name, Email, and Password

```http
  POST /api/auth/register
```

### User Management

#### Get All Users Data

```http
  GET /api/users
```

#### Get The User Data by The Given ID

```http
  GET /api/users/{id}
```

#### Create A New User Data

```http
  POST /api/users
```

#### Update The User Data by The Given ID

```http
  PATCH /api/users/{id}
```

#### Delete The User Data by The Given ID

```http
  DELETE /api/users/{id}
```

## Feedback

If you have any feedback, please reach out to us at thenamesbram@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)
