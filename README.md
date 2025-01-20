# Task Manager API

## Description
This is a Task Manager API built with Node.js, Express, and MongoDB. It provides endpoints for managing tasks, including creating, updating, and deleting tasks.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd task-manager-api
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Project
To run the project, you can use the following commands:

- **Development Mode**: 
   ```bash
   npm run dev
   ```
   This will start the server with `nodemon`, which automatically restarts the server on file changes.

- **Production Mode**: 
   ```bash
   npm run start
   ```
   This will start the server in production mode.

- **Build for Production**: 
   ```bash
   npm run build
   ```
   This will build the project using Webpack.

## Available Commands
- `npm run build`: Build the project.
- `npm run dev`: Run the project in development mode.
- `npm run start`: Start the project in production mode.
- `npm run prod`: Build the project for production.

## Project Structure
```
task-manager-api/
├── .env
├── .gitignore
├── Dockerfile
├── index.php
├── package.json
├── webpack.config.js
└── src/
    ├── config/
    ├── controllers/
    ├── db/
    ├── middlewares/
    ├── models/
    └── routes/
```

## Endpoints
- **POST /tasks**: Create a new task
- **GET /tasks**: Retrieve all tasks
- **GET /tasks/:id**: Retrieve a single task by ID
- **PUT /tasks/:id**: Update a task by ID
- **DELETE /tasks/:id**: Delete a task by ID

## License
This project is licensed under the ISC License.
