# ToDo Manager API

## Description
This is a ToDo Manager API built with Node.js, Express, and MongoDB. It provides endpoints for managing todos, including creating, updating, and deleting todos.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd todo-manager-api
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
todo-manager-api/
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
- **POST /todos**: Create a new todo
- **GET /todos**: Retrieve all todos
- **GET /todos/:id**: Retrieve a single todo by ID
- **PUT /todos/:id**: Update a todo by ID
- **DELETE /todos/:id**: Delete a todo by ID

## License
This project is licensed under the ISC License.
