const jwt = require("jsonwebtoken");
const Student = require("../models/student-user");
const Teacher = require("../models/teacher-user");

const jwtSecret = process.env.JWT_SECRET;

const checkStudent = async (req, res, next) => {
  const token = req.cookies.jwt;
  res.locals.student = null;

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const student = await Student.findById(decodedToken.id);
    res.locals.student = student || null;
    next();
  } catch (err) {
    console.log(err.message);
    res.locals.student = null;
    next();
  }
};

const checkTeacher = async (req, res, next) => {
  const token = req.cookies.jwt;
  res.locals.teacher = null;

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const teacher = await Teacher.findById(decodedToken.id);
    res.locals.teacher = teacher || null;
    next();
  } catch (err) {
    console.log(err.message);
    res.locals.teacher = null;
    next();
  }
};

const requireStudentAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("/stuLogin");
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const student = await Student.findById(decodedToken.id);

    if (!student) {
      return res.redirect("/stuLogin");
    }

    res.locals.student = student;
    next();
  } catch (err) {
    console.log(err.message);
    res.redirect("/stuLogin");
  }
};

const requireTeacherAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect("/teachLogin");
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const teacher = await Teacher.findById(decodedToken.id);

    if (!teacher) {
      return res.redirect("/teachLogin");
    }

    res.locals.teacher = teacher;
    next();
  } catch (err) {
    console.log(err.message);
    res.redirect("/teachLogin");
  }
};

module.exports = {
  requireStudentAuth,
  requireTeacherAuth,
  checkStudent,
  checkTeacher
};