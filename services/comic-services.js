const { ComicModel } = require("../models/comic-model");

function findComicById(id) {
  console.log("findComicById", id);
  // console.log('User', User)
  return ComicModel.findById(id);
}

async function createComic(comicData) {
  const comic = new ComicModel(comicData);
  return await comic.save();
}

module.exports = {
  findComicById,
  createComic,
};
