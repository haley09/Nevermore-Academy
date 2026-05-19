const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const Course = require("./models/course");
const Student = require("./models/student-user");

const {
  requireStudentAuth,
  requireTeacherAuth,
  checkStudent,
  checkTeacher
} = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3030;
const dbURI = process.env.MONGODB_URI;

app.set("trust proxy", 1);

if (!dbURI) {
  throw new Error("MONGODB_URI must be set before starting the server.");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set before starting the server.");
}

// connect to mongodb
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// set current user locals for all GET requests
app.get("*", checkStudent);
app.get("*", checkTeacher);

// basic pages
app.get("/", (req, res) => {
  res.render("index", { title: "Home page" });
});

app.get("/registerType", (req, res) => {
  res.render("registerType", { title: "New User Registration" });
});

app.get("/profile", (req, res) => {
  res.render("profile", { title: "Welcome" });
});

// teacher course routes
app.get("/create", requireTeacherAuth, (req, res) => {
  res.render("create", { title: "Create New Course" });
});

app.get("/courseTeach", requireTeacherAuth, (req, res) => {
  Course.find()
    .then((result) => {
      res.render("courseTeach", { title: "All Courses", courses: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/courseTeach", requireTeacherAuth, (req, res) => {
  const course = new Course(req.body);

  course
    .save()
    .then(() => {
      res.redirect("/courseTeach");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/courses/:id", requireTeacherAuth, (req, res) => {
  const id = req.params.id;

  Course.findById(id)
    .then((result) => {
      res.render("describeTeach", {
        course: result,
        title: "Course Description"
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/courses/:id", requireTeacherAuth, (req, res) => {
  const id = req.params.id;

  Course.findByIdAndDelete(id)
    .then(() => {
      res.json({ redirect: "/courseTeach" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// student course routes
app.get("/courseStudent", (req, res) => {
  Course.find()
    .then((result) => {
      res.render("courseStudent", { title: "All Courses", courses: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/coursesStudent/:id", requireStudentAuth, (req, res) => {
  const id = req.params.id;

  Course.findById(id)
    .then((result) => {
      res.render("describeStudent", {
        course: result,
        title: "Course Description"
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/coursesStudent/:id", requireStudentAuth, async (req, res) => {
  const courseId = req.params.id;
  const studentId = res.locals.student._id;

  try {
    await Student.findByIdAndUpdate(studentId, {
      $addToSet: { schedule: courseId }
    });

    res.json({ redirect: "/schedule" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to add course." });
  }
});

app.delete("/coursesStudent/:id", requireStudentAuth, async (req, res) => {
  const courseId = req.params.id;
  const studentId = res.locals.student._id;

  try {
    await Student.findByIdAndUpdate(studentId, {
      $pull: { schedule: courseId }
    });

    res.json({ redirect: "/schedule" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to drop course." });
  }
});

// student schedule
app.get("/schedule", requireStudentAuth, (req, res) => {
  const schedule = res.locals.student.schedule || [];

  Course.find({ _id: { $in: schedule } })
    .then((result) => {
      res.render("schedule", {
        courses: result,
        title: "Student Schedule"
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// auth routes
app.use(authRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
