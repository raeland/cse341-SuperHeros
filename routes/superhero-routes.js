const superheroRouter = require("express").Router();
const superheroController = require("../controllers/superhero-controller");

superheroRouter.get(
  "/",
  // #swagger.description = 'use this as the API key = Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  // #swagger.summary = 'get all Superheros'
  // #swagger.tags = ['superheros']
  superheroController.getAllSuperhero
);

superheroRouter.get(
  "/:id",
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the superhero to retrieve',
    required: true,
    type: 'string'
   } */
  // #swagger.summary = 'get a single Superhero by id'
  // #swagger.tags = ['superheros']
  superheroController.getSuperheroById
);

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

  superheroRouter.put(
    "/:id",
    // #swagger.summary = 'update a Superhero by id'
    // #swagger.tags = ['superheros']
    
    superheroController.updateSuperheroById
  );

  superheroRouter.delete(
    "/:id",
    // #swagger.summary = 'delete a single Superhero by id'
    // #swagger.tags = ['superheros']
    
    superheroController.deleteSuperheroById
  );
  
  superheroRouter.delete(
    "/",
    // #swagger.summary = 'delete all Superheros'
    // #swagger.tags = ['superheros']
    
    superheroController.deleteAllSuperheros
  );
  
  

  
  module.exports = superheroRouter

