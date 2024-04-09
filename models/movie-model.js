const mongoose = require("mongoose");
const movieJoi = require("joi");

const movieSchema = mongoose.Schema(
  {
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
);

movieSchema.statics.findOrAddMovie = async function findOrAddMovie(
  condition,
  doc
) {
  const result = await this.findOne(condition);
  return result || this.create(doc);
};

const MovieModel = mongoose.model("Movie", movieSchema);
/*
const userJoiSchema = Joi.object({
  username: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9_-]{3,30}$"))
    .required(),
  phone: Joi.string().pattern(new RegExp("^\\+[1-9]\\d{1,14}$")).required(),
  role: Joi.string()
    .valid(...Object.values(Roles))
    .default(Roles.VIEWER),
  isActive: Joi.boolean().default(true),
})  ***************************/

module.exports = {
  MovieModel,
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Comic:
 *       type: object
 *       properties:
 *        title:
 *           type: string
 *           description: Accurate and Complete Title of Movie
 *        year:
 *           type: Number
 *           description: Year Movie was released to Theaters
 *        runtime: Number
 *           description: length of movie, start to finish, in minutes:seconds
 *        director:
 *           type: string
 *           description: Full Name of Director
 *        comicWorld:
 *           type: string
 *           description: DC, Marvel, Wonderland, Narnia, Your Mom's house
 *        superHeroMain:
 *           type: string
 *           description: NOT there real name but there HERO name
 *        superVillain:
 *           type: string
 *           description: Villain or Villains in Movie
 *        superHeroSupport:
 *           type: string
 *           description: Side Kick Name and other Heros in Movie
 */
