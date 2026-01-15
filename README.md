# Quiz Learning System Manager (QLSM)
🚀 [Live Demo](https://lmsquiz.netlify.app/)
This project is a comprehensive quiz management and learning system application.

## Project Overview

The Quiz Learning System Manager (QLSM) is a full-stack application built with React for the frontend and Node.js with Express for the backend. It allows users to create, manage, and take quizzes on various topics, facilitating an interactive learning experience.

## Features

- User authentication and role-based access control
- Create, edit, and delete quizzes
- Take quizzes and receive immediate feedback
- Track learning progress and quiz performance
- Analytics dashboard for educators and learners
- Customizable quiz settings (time limits, question types, etc.)

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- State Management: Redux
- Styling: CSS Modules

## Project Structure

The project is divided into two main parts:

1. Frontend (`/src`)
   - Components
   - Redux store
   - API services

2. Backend (`/my-backend`)
   - Express server
   - MongoDB models
   - API routes

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/quiz-learning-system-manager.git
   cd quiz-learning-system-manager
   ```

2. Install dependencies
   ```
   npm install
   cd my-backend
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory and in the `my-backend` directory with the necessary environment variables.

4. Start the development server
   ```
   npm start
   ```
   In a separate terminal:
   ```
   cd my-backend
   npm start
   ```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Database Schema

The application uses MongoDB with the following main collections:

- Users: Stores user information and authentication details
- Quizzes: Contains quiz metadata and questions
- Attempts: Records user attempts and scores for each quiz

For more details, refer to the `quizModel.js` file in the backend.

## API Endpoints

The backend provides RESTful API endpoints for:

- User management (registration, login, profile updates)
- Quiz CRUD operations
- Quiz attempt submission and retrieval
- Analytics and reporting

Detailed API documentation can be found in the `/docs` directory.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- All contributors and supporters of the project
- Open-source community for the various libraries and tools used in this project
