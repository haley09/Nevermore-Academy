# Nevermore Academy Portal

Nevermore Academy Portal is a full-stack web application designed to simulate an academic course management system. The platform supports both student and teacher roles, allowing users to interact with course data through a secure, role-based interface.

This project demonstrates backend development, authentication, database design, and server-side rendering using Node.js and MongoDB.

---

## Features

### Authentication & Authorization
- Secure login and registration for students and teachers
- Password hashing using bcrypt
- JWT-based authentication with cookies
- Role-based access control:
  - Students and teachers have separate permissions and views

---

### Student Functionality
- Browse course catalog
- View course details
- Add courses to personal schedule
- Drop courses from schedule
- View current schedule

---

### Teacher Functionality
- Create new courses
- View all courses
- Delete existing courses
- Manage course catalog

---

### Course Management
- MongoDB database with structured course data
- Dynamic rendering of course lists and details
- REST-style route handling (GET, POST, PUT, DELETE)

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (Embedded JavaScript Templates)
- JSON Web Tokens (JWT)
- bcrypt (password hashing)
- HTML5 & CSS3

---

## Key Concepts Demonstrated

- Full-stack web application architecture
- Authentication and session handling
- Role-based authorization
- MVC-style structure (models, views, controllers)
- RESTful routing patterns
- Database relationships and updates
- Server-side rendering with EJS

---

## Project Structure
Nevermore-Academy/
│─ app.js
│─ routes/
│─ controllers/
│─ models/
│─ middleware/
│─ views/
│─ public/
│─ .env (not included)
│─ package.json
│─ README.md

---

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install

## Future Improvements
Add course editing functionality for teachers

Implement search/filter for courses

Improve UI with a modern component framework (React)

Add pagination for large course catalogs

Replace client-side fetch logic with API endpoints for SPA integration

## Author
Haley Abel
Informatics Student – Indiana University Indianapolis

## Project Purpose
This project was originally developed as part of a course assignment and later refactored to meet professional portfolio standards, with improvements to security, structure, and user experience.