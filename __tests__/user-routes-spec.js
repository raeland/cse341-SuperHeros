const fs = require("fs");
const path = require("path");
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { UserModel } = require("../models/user-model"); // replace with your User model file path
const routes = require("../routes/user-routes"); // replace with your routes file path

const app = express();
app.use(express.json());
app.use("/users", routes);

let mongoServer;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  //   console.log(path.join(__dirname, "../db/users.json")
  // Read the file and populate the collection
  const data = fs.readFileSync(
    path.join(__dirname, "../db/users.json"),
    "utf8"
  );
  const users = JSON.parse(data);
  for (const user of users) {
    const savedUser = await new UserModel(user).save();
    // Save the ID of the first user
    if (!userId) {
      userId = savedUser._id.toString();
    }
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Mock the auth middleware
jest.mock("../middlewares/is-authenticated", () => {
  return (req, res, next) => next();
});

// Mock the checkPermissions middleware
jest.mock("../middlewares/check-permissions", () => {
  return (requiredPermission, selfAllowed) => (req, res, next) => next();
});

// Your tests go here

test("GET /users", async () => {
  const res = await request(app).get("/users");
  expect(res.statusCode).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
});

test("should return the user with the given ID", async () => {
  const res = await request(app).get(`/users/${userId}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body._id.toString()).toEqual(userId);
  // Add more assertions as needed
});

// test("POST /users", async () => {
//   const res = await request(app).post("/users").send({
//     username: "joelcannon",
//     email: "joelcannon@gmail.com",
//     phone: "+15412440897",
//     role: "Editor",
//   });
//   expect(res.statusCode).toEqual(200);
//   expect(res.body.username).toEqual("test");
// });

// Add more tests for other routes
