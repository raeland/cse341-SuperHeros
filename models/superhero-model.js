const mongoose = require("mongoose");

const SuperheroSchema = mongoose.Schema(
    {
      name: String,
      alias: String,
      powers: String,
      team: String,
      origin: String,
      universe: String,
      appearance: {
        type: Map,
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

  module.exports = {
  
    Superhero,

  };