# TODO - Nevermore Academy

## Security
- Rotate the MongoDB password that was previously hard-coded in source.
- Keep `MONGODB_URI` and `JWT_SECRET` only in environment variables.
- Replace GET logout with POST logout and add CSRF protection strategy.
- Add rate limiting for login and registration routes.

## Course Features
- Add course editing for teachers.
- Add search and filtering by subject area, credits, and course name.
- Add capacity limits and waitlist behavior.
- Prevent schedule conflicts if courses get meeting times later.

## User Experience
- Add profile dashboards for students and teachers.
- Improve form validation messages in the UI.
- Add empty states for course lists and schedules.
- Add confirmation prompts before dropping or deleting courses.

## Code
- Move course routes from `app.js` into a dedicated routes/controller pair.
- Add centralized error handling middleware.
- Add model methods or services for schedule add/drop logic.
- Add tests for auth, teacher course management, and student enrollment.

## Deployment
- Document required environment variables for hosting.
- Add production logging and safer error messages.
- Add MongoDB connection retry/health check behavior.

