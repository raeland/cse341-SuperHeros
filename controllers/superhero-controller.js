require("dotenv").config();
const { Superhero } = require("../models/superhero-model");
const { findSuperheroById, createSuperhero } = require("../services/superhero-services");


exports.createSuperhero = [
    
    async (req, res, next) => {
      // #swagger.responses[500] = { description: 'Internal server error' }
      if (!req.body.name) {
        return res.status(400).json({ message: "Content can not be empty!" });
      }
  
      const superhero = new Superhero({
        name: req.body.name,
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
        const data = await createSuperhero(superhero);
        res.json(data);
      } catch (err) {
        next(err);
      }
    },
  ];
  