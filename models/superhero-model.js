const mongoose = require("mongoose");
const Joi = require("joi");

const SuperheroSchema = mongoose.Schema(
    {
      name: String,
      alias: String,
      powers: Array,
      team: String,
      origin: String,
      universe: String,
      appearance: {
        type: Array,
        of: new mongoose.Schema({
        hairColor: String,
        eyeColor: String,
        height: String,
        weight: String
      })
    },
    firstAppearance: String,
    createdBy: String,
    imageURL: String
});

SuperheroSchema.statics.findOrCreate = async function findOrCreate(condition, doc) {
    const result = await this.findOne(condition);
    return result || this.create(doc);
  };
  
  
  const Superhero = mongoose.model("Superhero", SuperheroSchema);

  const superheroJoiSchema = Joi.object({
    name: Joi.string(),
    alias: Joi.string(),
    powers: Joi.array(),
    team: Joi.string(),
    origin: Joi.string(),
    universe: Joi.string(),
    appearance: Joi.object({
      hairColor: Joi.string(),
      eyeColor: Joi.string(),
      height: Joi.string(),
      weight: Joi.string()
    }),
    firstAppearance: Joi.string(),
    createdBy: Joi.string(),
    imageURL: Joi.string(),
  });


  module.exports = {
    Superhero,
    superheroJoiSchema,
  };

  
/**
 * @swagger
 * components:
 *   schemas:
 *     Superhero:
 *       type: object
 *       required:
 *         - superheroname
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The superhero's name. Must be at least 3 characters long and contain no spaces.
 *         alias:
 *           type: string
 *           description: The superhero's alias.
 *         powers:
 *           type: array
 *           description: The superhero's powers.
 *         team:
 *           type: string
 *           description: The superhero's team.
 *         origin:
 *           type: string
 *           description: The superhero's origin.
 *         universe:
 *           type: string
 *           description: The superhero's universe.
 *         appearance:
 *           type: object
 *           description: The superhero's appearance.
 *            hairColor:
 *              type: string,
 *              description: The superhero's hairColor.
 *              eyeColor:
 *              type: string,
 *              description: The superhero's eyeColor.
 *              height:
 *                type: string,
 *              description: The superhero's height.
 *              weight:
 *                type: string 
 *              description: The superhero's weight.
 *         firstAppearance:
 *           type: string
 *           description: The superhero's firstAppearance.
 *         createdBy:
 *           type: string
 *           description: The superhero's createdBy.
 *         imageURL:
 *           type: string
 *           description: The superhero's imageURL.
 */
