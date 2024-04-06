const { Superhero } = require('../models/superhero-model')

function findSuperheroById(id) {
  console.log('findSuperheroById', id)
  // console.log('Superhero', Superhero)
  return Superhero.findById(id)
}

async function createSuperhero(superheroData) {
  const superhero = new Superhero(superheroData)
  return await superhero.save()
}

module.exports = {
  findSuperheroById,
  createSuperhero,
}