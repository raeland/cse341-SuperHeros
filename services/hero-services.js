const { HeroModel } = require("../models/hero-model");

function findHeroById(id) {
  return HeroModel.findById(id);
}

async function createHero(heroData) {
  const hero = new HeroModel(heroData);
  return await hero.save();
}

module.exports = {
  findHeroById,
  createHero,
};
