const express = require("express");
const app = express();

const morgan = require("morgan");

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");

app.use(morgan("dev"));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

module.exports = app;
