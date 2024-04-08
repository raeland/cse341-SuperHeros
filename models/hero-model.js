const mongoose = require("mongoose");
//const isPhoneNumberValid = require("../utils/phone-validator");
const Joi = require("joi");

const Roles = {
  VIEWER: "Viewer",
  EDITOR: "Editor",
  ADMIN: "Admin",
};

const HeroSchema = mongoose.Schema(
  {
    githubId: String,
    displayName: String,
    profileUrl: String,
    name: {
      type: String,
    },
    identity: {
      type: String,
    },
    creators: {
      type: Array,
    },
    powers: {
      type: Array,
    },
    createdYear: {
      type: String,
    },
    universe: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "hero",
  }
);

HeroSchema.statics.findOrCreate = async function findOrCreate(condition, doc) {
  const result = await this.findOne(condition);
  return result || this.create(doc);
};
/*
UserSchema.pre("save", async function (next) {
  if (!(await isPhoneNumberValid(this.phone))) {
    throw new Error("Phone number is not valid SMS-capable number!");
  }
  next();
});   *********************************/

const Hero = mongoose.model("Hero", HeroSchema);
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
});  ***************************/

module.exports = {
  Roles,
  Hero,
  /* userJoiSchema,  **********/
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Hero:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The hero's hero name. Must be at least 3 characters long.
 *         identity:
 *           type: string
 *           description: The user's email. Must be a valid email format.
 *         creators:
 *           type: array
 *           description: The user's role
 *         powers:
 *           type: array
 *           description: The active status of the user
 *         createdYear: string
 *           description: The active status of the user
 *        universe:
 *           type: string
 *           description: The active status of the user
 */
