require("dotenv").config(); //just cause I need to committ something
const express = require("express");
const routes = require("./routes");
const statusRoutes = require("./routes/status-routes.js");

const cors = require("cors");
const passport = require("./config/passport-config.js");

const session = require("express-session");
const app = express();
const { errorHandler } = require("./middlewares/error-handler");

const { db, connect } = require("./db/dbConnect");

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(
    cors({
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      origin: process.env.ALLOWED_ORIGINS,
    })
  )
  .use("/", routes)
  .use("/", statusRoutes)
  .use(errorHandler);

connect();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
