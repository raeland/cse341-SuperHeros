const collectionRouter = require("express").Router();
const collectionController = require("../controllers/collection-controller");


collectionRouter.post(
    "/",
    // #swagger.summary = 'Add a new Collection',
    // #swagger.tags = ['collection'],
    /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/Collection'
            }
          }
        }
      } */
    /* #swagger.responses[200] = {
        description: 'Success: Collection was updated successfully.',
        schema: { $ref: '#/components/schemas/Collection' }
      } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot update Collection with id. Maybe Collection was not found!' }
  
    
    (req, res, next) => {
      console.log(req.body);
      next();
    },
    collectionController.createCollection
  );
  
  module.exports = collectionRouter