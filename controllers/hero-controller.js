require("dotenv").config();
const { HeroModel } = require("../models/hero-model");
const { findHeroById, createHero } = require("../services/hero-services");
//const validateComic = require("../middlewares/validate-comic");
//const validateComicUpdate = require("../middlewares/validate-comic-update");

exports.createHero = [
  /* validateComic,   ******************************/
  async (req, res, next) => {
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body.name) {
      return res.status(400).json({ message: "Content can not be empty!" });
    }

    const hero = new HeroModel({
      name: req.body.name,
      identity: req.body.identity,
      creators: req.body.creators,
      powers: req.body.powers,
      createdYear: req.body.createdYear,
      universe: req.body.universe,
    });

    try {
      const data = await createHero(hero);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getAllHeroes = [
  async (req, res, next) => {
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await HeroModel.find();
      // console.log("getAllHeroes", data);

      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getHeroById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Hero ID' }
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[404] = { description: 'Not found: Hero with id' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await findHeroById(id);

      if (!data) {
        return res
          .status(404)
          .json({ message: "Not found Hero with id " + id });
      }

      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateHeroById = [
  /* validateHeroUpdate,   ******************************/
  // #swagger.parameters['id'] = { description: 'Hero ID' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Hero'
          }
        }
      }
    } */
  /* #swagger.responses[200] = {
      description: 'Success: Hero was updated successfully.',
      schema: { $ref: '#/components/schemas/Hero' }
    } */
  // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
  // #swagger.responses[404] = { description: 'Not found: Cannot update Hero with id.' }
  // #swagger.responses[500] = { description: 'Internal server error' }
  async (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Updated data can not be empty!" });
    }

    const id = req.params.id;

    try {
      const data = await HeroModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true,
      });

      if (!data) {
        return res.status(404).json({
          message: `Cannot update Comic with id=${id}. Maybe Comic was not found!`,
        });
      } else {
        res
          .status(200)
          .json({ message: "Hero was updated successfully.", Hero: data });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.deleteHeroById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Comic ID' }
    // #swagger.responses[204] = { description: 'Success: Comic was deleted successfully!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot delete Comic with id. Maybe Comic was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await HeroModel.findByIdAndRemove(id);

      if (!data) {
        return res.status(404).json({
          message: `Cannot delete Hero with id=${id}. Hero was not found!`,
        });
      } else {
        res.status(204).json({ message: "Hero was deleted successfully!" });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.deleteAllHeroes = [
  async (req, res, next) => {
    // #swagger.responses[204] = { description: 'Success: Comics were deleted successfully!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await HeroModel.deleteMany({});
      res.status(204).json({
        message: `${data.deletedCount} Heroes were deleted successfully!`,
      });
    } catch (err) {
      next(err);
    }
  },
];

exports.toggleHeroActiveStatus = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Hero ID' }
    /* #swagger.responses[200] = {
      description: 'Success: Hero active status was toggled successfully.',
      schema: { $ref: '#/components/schemas/Hero' }
    } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot toggle Hero active status with id.' }
    // #swagger.responses[500] = { description: 'Internal server error' }

    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Updated data can not be empty!" });
    }

    const id = req.params.id;

    try {
      const hero = await HeroModel.findById(id);
      if (!hero) {
        return res.status(404).json({
          message: `Cannot toggle Hero active status with id=${id}.`,
        });
      } else {
        hero.isActive = !hero.isActive;
        const data = await hero.save();
        res.status(200).json({
          message: `Hero active status was toggled successfully. Current status is ${hero.isActive ? "active" : "inactive"}.`,
          hero: data,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];
