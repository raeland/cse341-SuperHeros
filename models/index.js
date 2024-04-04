const dbConfig = require("../config/db-config.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.User = require("./user-model.js");
db.Comic = require("./comic-model.js");

module.exports = db;
