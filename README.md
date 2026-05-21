# Nevermore Academy Portal

Nevermore Academy Portal is a full-stack web application designed to simulate an academic course management system. The platform supports both student and teacher roles, allowing users to interact with course data through a secure, role-based interface.

This project demonstrates backend development, authentication, database design, and server-side rendering using Node.js and MongoDB.

---

## Features

### Authentication & Authorization
- Secure login and registration for students and teachers
- Password hashing using bcrypt
- JWT-based authentication with cookies
- Role-based access control for student and teacher views

### Student Functionality
- Browse course catalog
- View course details
- Add courses to a personal schedule
- Drop courses from a schedule
- View current schedule

### Teacher Functionality
- Create new courses
- View all courses
- Delete existing courses
- Manage course catalog

### Course Management
- MongoDB database with structured course data
- Dynamic rendering of course lists and details
- REST-style route handling with GET, POST, PUT, and DELETE

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS
- JSON Web Tokens (JWT)
- bcrypt
- HTML5 & CSS3

---

## Project Structure

```text
Nevermore-Academy/
|- app.js
|- routes/
|- controllers/
|- models/
|- middleware/
|- views/
|- public/
|- package.json
|- README.md
```

---

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3030
```

3. Start the app:

```bash
npm start
```

For development with nodemon:

```bash
npm run dev
```

---

## Render Deployment

Create a new **Web Service** on Render and connect this GitHub repository.

Use these settings:

```text
Environment: Node
Build Command: npm install
Start Command: npm start
```

Add these environment variables in Render:

```text
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
```

Important: if the MongoDB password was ever committed or shared, rotate that password in MongoDB Atlas before deploying.

The repository also includes `render.yaml` for Render Blueprint deployment.

---

## Future Improvements

- Add course editing functionality for teachers.
- Implement search and filtering for courses.
- Improve UI with a modern component framework.
- Add pagination for large course catalogs.
- Replace GET logout with POST logout.
- Add tests for auth, course creation, enrollment, and schedule removal.

---

## Author

Haley Abel  
Software Development - Ivy Tech Community College

---

## Contributors

- Haley Abel - HTML/CSS
- Joe Douglas - front-end, back-end, and middleware
- Heather Zarate - feature support

---

## Project Purpose

This project was originally developed as part of a course assignment and later refactored to meet professional portfolio standards, with improvements to security, structure, and user experience.
