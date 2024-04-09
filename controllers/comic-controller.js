require("dotenv").config();
const { ComicModel } = require("../models/comic-model");
const { findComicById, createComic } = require("../services/comic-services");
//const validateComic = require("../middlewares/validate-comic");
//const validateComicUpdate = require("../middlewares/validate-comic-update");

exports.createComic = [
  /* validateComic,   ******************************/
  async (req, res, next) => {
    // #swagger.responses[500] = { description: 'Internal server error' }
    // console.log("createComic", req.body);
    if (!req.body.title) {
      return res.status(400).json({ message: "Content can not be empty!" });
    }

    const comic = new ComicModel({
      publication: req.body.publication,
      publisher: req.body.publisher,
      title: req.body.title,
      pages: req.body.pages,
      year: req.body.year,
      isbn13: req.body.isbn13,
      language: req.body.language,
    });

    try {
      const data = await createComic(comic);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getAllComics = [
  async (req, res, next) => {
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await ComicModel.find();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getComicById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Comic ID' }
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[404] = { description: 'Not found: Comic with id' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await findComicById(id);

      if (!data) {
        return res
          .status(404)
          .json({ message: "Not found Comic with id " + id });
      }

      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateComicById = [
  /* validateComicUpdate,   ******************************/
  // #swagger.parameters['id'] = { description: 'Comic ID' }
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Comic'
          }
        }
      }
    } */
  /* #swagger.responses[200] = {
      description: 'Success: Comic was updated successfully.',
      schema: { $ref: '#/components/schemas/Comic' }
    } */
  // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
  // #swagger.responses[404] = { description: 'Not found: Cannot update Comic with id. Maybe Comic was not found!' }
  // #swagger.responses[500] = { description: 'Internal server error' }
  async (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    try {
      const data = await ComicModel.findByIdAndUpdate(id, req.body, {
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
          .json({ message: "Comic was updated successfully.", Comic: data });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.deleteComicById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Comic ID' }
    // #swagger.responses[204] = { description: 'Success: Comic was deleted successfully!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot delete Comic with id. Maybe Comic was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await ComicModel.findByIdAndRemove(id);

      if (!data) {
        return res.status(404).json({
          message: `Cannot delete Comic with id=${id}. Maybe Comic was not found!`,
        });
      } else {
        res.status(204).json({ message: "Comic was deleted successfully!" });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.deleteAllComics = [
  async (req, res, next) => {
    // #swagger.responses[204] = { description: 'Success: Comics were deleted successfully!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await ComicModel.deleteMany({});
      res.status(204).json({
        message: `${data.deletedCount} Comics were deleted successfully!`,
      });
    } catch (err) {
      next(err);
    }
  },
];

exports.toggleComicActiveStatus = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'Comic ID' }
    /* #swagger.responses[200] = {
      description: 'Success: Comic active status was toggled successfully.',
      schema: { $ref: '#/components/schemas/Comic' }
    } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot toggle Comic active status with id. Maybe Comic was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }

    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    try {
      const comic = await ComicModel.findById(id);
      if (!comic) {
        return res.status(404).json({
          message: `Cannot toggle Comic active status with id=${id}. Maybe Comic was not found!`,
        });
      } else {
        comic.isActive = !comic.isActive;
        const data = await comic.save();
        res.status(200).json({
          message: `Comic active status was toggled successfully. Current status is ${comic.isActive ? "active" : "inactive"}.`,
          comic: data,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];
