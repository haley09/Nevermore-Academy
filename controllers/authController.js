const Student = require("../models/student-user");
const Teacher = require("../models/teacher-user");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  if (
    err.message === "incorrect student email" ||
    err.message === "incorrect teacher email"
  ) {
    errors.email = "that email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "wrong password";
  }

  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  if (
    err.message.includes("student validation failed") ||
    err.message.includes("teacher validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create token
const maxAge = 3 * 24 * 60 * 60;
const cookieOptions = {
  httpOnly: true,
  maxAge: maxAge * 1000,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production"
};

const createToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: maxAge
  });
};

// --------------------
// STUDENT PAGES
// --------------------

module.exports.studentReg_get = (req, res) => {
  res.render("studentReg", { title: "Student Registration" });
};

module.exports.stuLogin_get = (req, res) => {
  res.render("stuLogin", { title: "Student Login" });
};

module.exports.studentReg_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const student = await Student.create({
      firstName,
      lastName,
      email,
      password
    });

    const token = createToken(student._id);
    res.cookie("jwt", token, cookieOptions);

    res.status(201).json({ student: student._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.stuLogin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.stuLogin(email, password);

    const token = createToken(student._id);
    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({ student: student._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// --------------------
// TEACHER PAGES
// --------------------

module.exports.teachReg_get = (req, res) => {
  res.render("teachReg", { title: "Teacher Registration" });
};

module.exports.teachLogin_get = (req, res) => {
  res.render("teachLogin", { title: "Teacher Login" });
};

module.exports.teachReg_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const teacher = await Teacher.create({
      firstName,
      lastName,
      email,
      password
    });

    const token = createToken(teacher._id);
    res.cookie("jwt", token, cookieOptions);

    res.status(201).json({ teacher: teacher._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.teachLogin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.teachLogin(email, password);

    const token = createToken(teacher._id);
    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({ teacher: teacher._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// --------------------
// LOGOUT
// --------------------

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { ...cookieOptions, maxAge: 1 });
  res.redirect("/");
};
