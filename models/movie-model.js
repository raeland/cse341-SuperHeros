const mongoose = require("mongoose");
const Joi = require("joi");

const Roles = {
  VIEWER: "Viewer",
  EDITOR: "Editor",
  ADMIN: "Admin",
};

const movieSchema = mongoose.Schema(
  {
    githubId: String,
    displayName: String,
    profileUrl: String,
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    year: {
      type: Number,
    },
    runtime: {
      type: Number,
    },
    director: {
      type: String,
    },
    comicWorld: {
      type: String,
    },
    superHeroMain: {
      type: String,
    },
    superVillain: {
      type: String,
    },
    superHeroSupport: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "movie",
  }
)

movieSchema.statics.findOrCreate = async function findOrCreate(condition, doc) {
  const result = await this.findOne(condition)
  return result || this.create(doc)
}
/*
movieSchema.pre("save", async function (next) {
  if (!(await isPhoneNumberValid(this.phone))) {
    throw new Error("Phone number is not valid SMS-capable number!")
  }
  next()
})   *********************************/

const movie = mongoose.model("Movie", movieSchema);
/*
const userJoiSchema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_-]{3,30}$"))
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(new RegExp("^\\+[1-9]\\d{1,14}$")).required(),
  role: Joi.string()
    .valid(...Object.values(Roles))
    .default(Roles.VIEWER),
  isActive: Joi.boolean().default(true),
})  ***************************/

module.exports = {
  Roles,
  movie,
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Comic:
 *       type: object
 *       properties:
 *         publication:
 *           type: string
 *           description: The user's username. Must be at least 3 characters long and contain no spaces.
 *         publisher:
 *           type: string
 *           description: The user's email. Must be a valid email format.
 *         title:
 *           type: string
 *           description: The user's role
 *         pages:
 *           type: string
 *           description: The active status of the user
 *         year: Number
 *           description: The active status of the user
 *        isbn13:
 *           type: string
 *           description: The active status of the user
 *        language:
 *           type: string
 *           description: The active status of the user
 */
