const { HeroModel } = require("../models/hero-model");

function findHeroById(id) {
  console.log("findHeroById", id);
  // console.log('User', User)
  return HeroHero.findById(id);
}

async function createHero(heroData) {
  const hero = new HeroModel(heroData);
  return await hero.save();
}

module.exports = {
  findHeroById,
  createHero,
};
