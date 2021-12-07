const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const postRoutes = require('./routes/post')
const helmet = require("helmet");


app.use(morgan("dev"));
app.use(helmet());
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

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/post", postRoutes)


module.exports = app;
