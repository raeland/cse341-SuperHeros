const { Comic } = require('../models/comic-model')

function findComicById(id) {
  console.log('findComicById', id)
  // console.log('User', User)
  return Comic.findById(id)
}

async function createComic(comicData) {
  const comic = new Comic(comicData)
  return await comic.save()
}

module.exports = {
  findComicById,
  createComic,
}
