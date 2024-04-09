const fs = require("fs");
const path = require("path");
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { ComicModel } = require("../models/comic-model");
const routes = require("../routes/comic-routes");

const app = express();
app.use(express.json());
app.use("/comics", routes);

let mongoServer;
let comicId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Read the file and populate the collection
  const data = fs.readFileSync(
    path.join(__dirname, "../db/comics.json"),
    "utf8"
  );
  const comics = JSON.parse(data);
  for (const comic of comics) {
    const savedComic = await new ComicModel(comic).save();
    // Save the ID of the first comic
    if (!comicId) {
      comicId = savedComic._id.toString();
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

test("GET /comics", async () => {
  const res = await request(app).get("/comics");
  expect(res.statusCode).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
});

test("should return the comic with the given ID", async () => {
  const res = await request(app).get(`/comics/${comicId}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body._id.toString()).toEqual(comicId);
  // Add more assertions as needed
});
