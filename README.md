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
Informatics Student - Indiana University Indianapolis

---

## Project Purpose

This project was originally developed as part of a course assignment and later refactored to meet professional portfolio standards, with improvements to security, structure, and user experience.
