const mongoose = require("mongoose");

const CollectionSchema = mongoose.Schema(
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

CollectionSchema.statics.findOrCreate = async function findOrCreate(condition, doc) {
    const result = await this.findOne(condition);
    return result || this.create(doc);
  };
  
  
  const Collection = mongoose.model("Collection", CollectionSchema);

  module.exports = {
  
    Collection,

  };