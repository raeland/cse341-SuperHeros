require("dotenv").config();
const { Collection } = require("../models/collection-model");
const { findCollectionById, createCollection } = require("../services/collection-services");


exports.createCollection = [
    
    async (req, res, next) => {
      // #swagger.responses[500] = { description: 'Internal server error' }
      if (!req.body.name) {
        return res.status(400).json({ message: "Content can not be empty!" });
      }
  
      const collection = new Collection({
        name: req.body.username,
        alias: req.body.alias,
        powers: req.body.alias,
        team: req.body.team,
        origin: req.body.origin,
        universe: req.body.universe,
        appearance: {
          hairColor: req.body.hairColor,
          eyeColor: req.body.eyeColor,
          height: req.body.height,
          weight: req.body.weight
        },
      firstAppearance: req.body.firstAppearance,
      createdBy: req.body.createdBy,
      imageURL: req.body.imageURL
      });
  
      try {
        const data = await createCollection(collection);
        res.json(data);
      } catch (err) {
        next(err);
      }
    },
  ];
  