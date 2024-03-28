// dbConnect.js
const mongoose = require("mongoose");
const dbConfig = require("../config/db-config.js");
const UserModel = require("../models/user-model.js");

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = UserModel;

function connect() {
  mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });
}

module.exports = { db, connect };
