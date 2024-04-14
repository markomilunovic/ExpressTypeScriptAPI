# Express TypeScript API

This project is an Express.js API built with TypeScript, featuring user authentication, todo management, and user management functionalities.

## Table of Contents

- [Project Description](#project-description)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This API serves as a backend service for managing users and todo items. It includes features such as user registration, login and password reset, CRUD operations for todo items, and user management.

## Project Structure

The project directory is structured as follows:

- **common**: Contains files related to common functionalities like database connection, interfaces, utilities, and types.
- **controllers**: Includes controller functions for handling HTTP requests.
- **loaders**: Contains modules responsible for loading middleware and routes.
- **middleware**: Contains middleware functions, such as authentication middleware.
- **models**: Defines Sequelize models for database tables.
- **repositories**: Implements repository functions for interacting with the database.
- **routes**: Defines API endpoints using Express.js Router.
- **services**: Implements business logic for various features.

## Installation

To install the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/markomilunovic/ExpressTypeScriptAPI.git

# Navigate to the project directory
cd ExpressTypeScriptAPI

# Install dependencies
npm install

# Compile TypeScript code to JavaScript
tsc
```

To install the project using docker, follow these steps:

```bash
# Clone the repository
git clone https://github.com/markomilunovic/ExpressTypeScriptAPI.git

# Navigate to the project directory
cd ExpressTypeScriptAPI
```

## Usage

To start the server locally, run the following command:

```bash
nodemon dist/app.js
```

To start the server using docker, run the following commands:

```bash
# Build and start the Docker containers
docker-compose up

#Stop the running Docker containers
docker-compose down
```

## Endpoints

### Authentication

- **POST /auth/register:** Register a new user.
- **POST /auth/login:** Authenticate a user and generate access and refresh tokens.
- **POST /auth/forgot-password:** Request to reset the password.
- **POST /auth/reset-password:** Reset user password using a reset token.

### Todo Management

- **POST /todos:** Create a new todo item.
- **GET /todos:** Get all todo items.
- **GET /todos/:id:** Get a specific todo item.
- **PUT /todos/:id:** Update a specific todo item.
- **DELETE /todos/:id:** Delete a specific todo item.

### User Management

- **POST /users:** Create a new user.
- **GET /users:** Get all users.
- **GET /users/:id:** Get a specific user.
- **PUT /users/:id:** Update a specific user.
- **DELETE /users/:id:** Delete a specific user.

## Environment Variables

The project uses the following environment variables:

- **DB_USERNAME:** Username for the database connection
- **DB_PASSWORD:** Password for the database connection
- **DB_NAME:** Name of the database
- **DB_HOST:** Host address for the database

<br>

- **ACCESS_TOKEN_SECRET:** Secret key for signing access tokens
- **REFRESH_TOKEN_SECRET:** Secret key for signing refresh tokens
- **RESET_TOKEN_SECRET:** Secret key for signing reset tokens

<br>

- **EMAIL_USER:** Sender email address for sending emails
- **SENDGRID_API_KEY:** API key for SendGrid email service

## Contributions

This project was developed by **Marko Milunović** and **Lejla Rujović** during the internship at **Quantox Technology** with guidance from **Aleksa Ćamilović**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
