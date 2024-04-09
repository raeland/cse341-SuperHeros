const mongoose = require("mongoose");
const isPhoneNumberValid = require("../utils/phone-validator");
const Joi = require("joi");
const { ROLES, ROLE_PERMISSIONS } = require("./roles-model");

const UserSchema = mongoose.Schema(
  {
    // githubId: String,
    // displayName: String,
    // profileUrl: String,
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9_-]{3,}$/.test(v);
        },
        message:
          "Username must be at least 3 characters long and can contain alphanumeric characters, underscores, and hyphens.",
      },
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: "Email is not valid.",
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+[1-9]\d{1,14}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number. ie:(+18881234567)`,
      },
      required: false,
      unique: false,
      sparse: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.VIEWER,
    },
    isActive: {
      type: Boolean,
      default: true, // Set to true by default
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

UserSchema.statics.findOrCreate = async function findOrCreate(condition, doc) {
  const result = await this.findOne(condition);
  if (result) {
    return result;
  } else {
    return await this.create(doc);
  }
};

UserSchema.pre("save", async function (next) {
  if (this.phone && !(await isPhoneNumberValid(this.phone))) {
    throw new Error("Phone number is not a valid SMS-capable number!");
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);

const userJoiSchema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_-]{3,30}$"))
    .required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(new RegExp("^\\+[1-9]\\d{1,14}$")),
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .default(ROLES.VIEWER),
  isActive: Joi.boolean().default(true),
});

module.exports = {
  UserModel,
  userJoiSchema,
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username. Must be at least 3 characters long and contain no spaces.
 *           minLength: 3
 *           pattern: '^[^\s]{3,}$'
 *         email:
 *           type: string
 *           description: The user's email. Must be a valid email format.
 *           format: email
 *         role:
 *           type: string
 *           enum: ['Viewer', 'Operator', 'Manager', 'Admin', 'Super Admin']
 *           description: The user's role
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: The active status of the user
 */
