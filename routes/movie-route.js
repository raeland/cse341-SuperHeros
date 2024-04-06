const movieRouter = require("express").Router()
const movieController = require("../controllers/movie-controller.js")
const { isAuthenticated } = require("../middlewares/is-authenticated.js")
const checkPermissions = require("../middlewares/check-permissions.js")

movieRouter
      .get(
        "/", //isAuthenticated,
        //checkPermissions("readMovie"),
        // #swagger.summary = 'get all movies'
        // #swagger.tags = ['movies']
        movieController.getAllMovies
      )
      .get(
        "/:id", //isAuthenticated,
        //checkPermissions("readMovie"),
        /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the user to retrieve',
          required: true,
          type: 'string'
        } */
        // #swagger.summary = 'get a single movie by id'
        // #swagger.tags = ['movies']
        movieController.getMovieById
      )
      .get(
        "/:movieName", //isAuthenticated,
        //checkPermissions("readMovie"),
        /* #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID of the user to retrieve',
          required: true,
          type: 'string'
        } */
        // #swagger.summary = 'get a single movie by id'
        // #swagger.tags = ['movies']
        movieController.getMovieByName
      )

movieRouter
      .post(
        "/", //isAuthenticated,
        //checkPermissions("updateMovie"),
        // #swagger.summary = 'Add a new Movie',
        // #swagger.tags = ['movies'],
        /* #swagger.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/schemas/Movie'                }              }
            }          } */
        /* #swagger.responses[200] = {
            description: 'Success: Movie was updated successfully.',
            schema: { $ref: '#/components/schemas/Movie' }
          } */
        // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
        // #swagger.responses[404] = { description: 'Not found: Cannot update Movie with id. Maybe Movie was not found!' }
       //isAuthenticated, ***********************
        (req, res, next) => {
          console.log(req.body)
          next()
        },
        movieController.createMovie
      )

movieRouter
      .put(
        "/:id", //isAuthenticated,
        //checkPermissions("updateMovie", true),
        // #swagger.summary = 'update a Movie by id'
        // #swagger.tags = ['movies']
        movieController.updateMovieById
      )

movieRouter
      .delete(
        "/:id", //isAuthenticated,
        //checkPermissions("updateMovie"),
        // #swagger.summary = 'delete a single Movie by id'
        // #swagger.tags = ['movies']
        movieController.deleteMovieById
      )

/* movieRouter.delete(
  "/", //isAuthenticated,
  // #swagger.summary = 'delete all Movies'
  // #swagger.tags = ['movies']
  //movieController.deleteAllMovies
//) 
*/
movieRouter
      .patch(
        "/:id/toggleActiveStatus", //isAuthenticated,
        //checkPermissions("updateMovie"),
        // #swagger.summary = 'toggle a Movie active status by id'
        // #swagger.tags = ['movies']
        movieController.toggleMovieActiveStatus
      )

// movieRouter.use(movieController.errorHandler)

module.exports = movieRouter

/* #swagger.parameters['newMovie'] = {
    in: 'body',
    description: 'Information for the new Movie.',
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
