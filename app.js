require("dotenv").config();

const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

// static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// views assets
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));

// messages array
const messages = [
  {
    id: randomUUID(),
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: randomUUID(),
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// Middleware to have the messages array available in all views
app.use((req, res, next) => {
  req.messages = messages;
  next(); // Important: Call next() to pass control to the next middleware or route handler
});

// Routes
app.use("/", indexRouter);
app.use("/new", newRouter);

// 404 handler
app.use((req, res, next) => {
  console.log("404 for:", req.originalUrl);
  const err = new Error("Page not found");
  err.statusCode = 404;
  next(err); // Pass to error handler
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).render("error", {
    title: "Error",
    err,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
