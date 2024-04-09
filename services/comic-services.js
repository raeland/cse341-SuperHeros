const { ComicModel } = require("../models/comic-model");

function findComicById(id) {
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
