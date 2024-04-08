const heroRouter = require("express").Router();
const heroController = require("../controllers/hero-controller.js");
//const { isAuthenticated } = require("../middlewares/is-authenticated.js");

heroRouter.get(
  "/",
  // #swagger.description = 'use this as the API key = Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
  // #swagger.summary = 'get all comics'
  // #swagger.tags = ['comics']
  heroController.getAllHeroes
);

heroRouter.get(
  "/:id",
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the user to retrieve',
    required: true,
    type: 'string'
   } */
  // #swagger.summary = 'get a single comic by id'
  // #swagger.tags = ['comics']
  heroController.getHeroById
);

heroRouter.post(
  "/",
  // #swagger.summary = 'Add a new Comic',
  // #swagger.tags = ['comics'],
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
  // #swagger.responses[404] = { description: 'Not found: Cannot update User with id. Maybe User was not found!' }

 /* isAuthenticated, ******************************
  (req, res, next) => {
    console.log(req.body);
    next();
  },                 ******************************/  
  heroController.createHero
);

heroRouter.put(
  "/:id",
  // #swagger.summary = 'update a Comic by id'
  // #swagger.tags = ['comics']
  /* isAuthenticated, ******************************/
  heroController.updateHeroById
);

heroRouter.delete(
  "/:id",
  // #swagger.summary = 'delete a single Comic by id'
  // #swagger.tags = ['comics']
  /* isAuthenticated,   ******************************/
  heroController.deleteHeroById
);

heroRouter.delete(
  "/",
  // #swagger.summary = 'delete all Comics'
  // #swagger.tags = ['comics']
  /* isAuthenticated,  ******************************/
  heroController.deleteAllHeroes
);

heroRouter.patch(
  "/:id/toggleActiveStatus",
  // #swagger.summary = 'toggle a Comic active status by id'
  // #swagger.tags = ['comics']
  /* isAuthenticated,  ******************************/
  heroController.toggleHeroActiveStatus
);

// comicRouter.use(comicController.errorHandler)

module.exports = heroRouter;

/* #swagger.parameters['newComic'] = {
    in: 'body',
    description: 'Information for the new comic.',
    required: true,
    schema: {
      type: 'object',
      properties: {
        publication: {
          type: 'string',
          example: 'DC'
        },
        publisher: {
          type: 'string',
          example: 'Dynamite'
        },
        title: {
          type: 'string',
          example: 'The Shadow/Batman'
        },
          languaje: {
          type: 'string',
          example: 'English'
        },
        pages: {
          type: 'string',
          example: '160'
        },
        year: {
          type: 'string',
          example: '2023'
        },
          isbn13: {
          type: 'string',
          example: '978-6075784069'
        }
      }
    }
  } */
