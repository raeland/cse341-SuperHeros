// middlewares/validateSuperheroUpdate.js
const Joi = require("joi");
const { superheroJoiSchema } = require("../models/superhero-model");

const superheroUpdateJoiSchema = Joi.object({
  name: superheroJoiSchema.extract("name").optional(),
  alias: superheroJoiSchema.extract("alias").optional(),
  powers: superheroJoiSchema.extract("powers").optional(),
  team: superheroJoiSchema.extract("team").optional(),
  origin: superheroJoiSchema.extract("origin").optional(),
  universe: superheroJoiSchema.extract("universe").optional(),
  appearance: superheroJoiSchema.extract("appearance").optional(),
  firstAppearance: superheroJoiSchema.extract("firstAppearance").optional(),
  createdBy: superheroJoiSchema.extract("createdBy").optional(),
  imageURL: superheroJoiSchema.extract("imageURL").optional(),
});

const validateSuperheroUpdate = (req, res, next) => {
  const { error } = superheroUpdateJoiSchema.validate(req.body);
  if (error) {
    const err = new Error(error.details[0].message);
    err.statusCode = 400;
    return next(err);
  }
  next();
};

module.exports = validateSuperheroUpdate;
