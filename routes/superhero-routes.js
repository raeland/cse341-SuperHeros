const superheroRouter = require("express").Router();
const superheroController = require("../controllers/superhero-controller");


superheroRouter.post(
    "/",
    // #swagger.summary = 'Add a new Superhero',
    // #swagger.tags = ['superhero'],
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
        description: 'Success: Superhero was updated successfully.',
        schema: { $ref: '#/components/schemas/Superhero' }
      } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot update Superhero with id. Maybe Superhero was not found!' }
  
    
    (req, res, next) => {
      console.log(req.body);
      next();
    },
    superheroController.createSuperhero
  );
  
  module.exports = superheroRouter