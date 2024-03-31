const { Collection } = require('../models/collection-model')

function findCollectionById(id) {
  console.log('findCollectionById', id)
  // console.log('User', User)
  return Collection.findById(id)
}

async function createCollection(collectionData) {
  const collection = new Collection(collectionData)
  return await collection.save()
}

module.exports = {
  findCollectionById,
  createCollection,
}
