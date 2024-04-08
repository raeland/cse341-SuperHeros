const { Hero } = require('../models/hero-model')

function findHeroById(id) {
  console.log('findHeroById', id)
  // console.log('User', User)
  return Hero.findById(id)
}

async function createHero(heroData) {
  const hero = new Hero(heroData)
  return await hero.save()
}

module.exports = {
  findHeroById,
  createHero,
}
