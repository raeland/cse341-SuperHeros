require("dotenv").config();
const { Superhero } = require("../models/superhero-model");
const { findSuperheroById, createSuperhero, } = require("../services/superhero-services");
const validateSuperhero = require("../middlewares/validate-superhero");
const validateSuperheroUpdate = require("../middlewares/validate-superhero-update");

exports.createSuperhero = [
  validateSuperhero,
  async (req, res, next) => {
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body.name) {
      return res.status(400).json({ message: "Content can not be empty!" });
    }

    const superhero = new Superhero({
      name: req.body.name,
      alias: req.body.alias,
      powers: req.body.powers,
      team: req.body.team,
      origin: req.body.origin,
      universe: req.body.universe,
      appearance: req.body.appearance,
      firstAppearance: req.body.firstAppearance,
      createdBy: req.body.createdBy,
      imageURL: req.body.imageURL,
    });

    try {
      const data = await createSuperhero(superhero);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getAllSuperhero = [
  async (req, res, next) => {
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await Superhero.find();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getSuperheroById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Superhero ID' }
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[404] = { description: 'Not found: Superhero with id' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await findSuperheroById(id);

      if (!data) {
        return res
          .status(404)
          .json({ message: "Not found Superhero with id " + id });
      }

      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];


exports.updateSuperheroById = [
  validateSuperheroUpdate,
  // #swagger.parameters['id'] = { description: Superhero ID' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Superhero'
          }
        }
      }
    } */
  /* #swagger.responses[200] = {
      description: 'Success: Spuerhero was updated successfully.',
      schema: { $ref: '#/components/schemas/Superhero' }
    } */
  // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
  // #swagger.responses[404] = { description: 'Not found: Cannot update Superhero with id. Maybe Superhero was not found!' }
  // #swagger.responses[500] = { description: 'Internal server error' }
  async (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    try {
      const data = await Superhero.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true,
      });

      if (!data) {
        return res.status(404).json({
          message: `Cannot update Superhero with id=${id}. Maybe Superhero was not found!`,
        });
      } else {
        res
          .status(200)
          .json({ message: "Superhero was updated successfully.", superhero: data });
      }
    } catch (err) {
      next(err);
    }
  },
];


exports.deleteSuperheroById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Superhero ID' }
    // #swagger.responses[204] = { description: 'Success: Superhero was deleted successfully!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot delete Superhero with id. Maybe Superhero was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await Superhero.findByIdAndRemove(id);

      if (!data) {
        return res.status(404).json({
          message: `Cannot delete Superhero with id=${id}. Maybe Superhero was not found!`,
        });
      } else {
        res.status(204).json({ message: "Superhero was deleted successfully!" });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.deleteAllSuperheros = [
  async (req, res, next) => {
    // #swagger.responses[204] = { description: 'Success: Superheros were deleted successfully!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await Superhero.deleteMany({});
      res.status(204).json({
        message: `${data.deletedCount} Superheros were deleted successfully!`,
      });
    } catch (err) {
      next(err);
    }
  },
];