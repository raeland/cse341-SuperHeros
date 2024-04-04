const userRouter = require("express").Router();
const userController = require("../controllers/user-controller.js");
const isAuthenticated = require("../middlewares/is-authenticated.js");
const checkPermissions = require("../middlewares/check-permissions.js");

userRouter.get(
  "/",
  // #swagger.description = 'login required - use /api/auth/github to create a new user'
  // #swagger.summary = 'get all Users'
  // #swagger.tags = ['users']
  isAuthenticated,
  checkPermissions("readUser"),
  userController.getAllUsers
);

userRouter.get(
  "/:id",
  /* #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID of the user to retrieve',
    required: true,
    type: 'string'
   } */
  // #swagger.summary = 'get a single User by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  checkPermissions("readUser"),
  userController.getUserById
);

userRouter.post(
  "/",
  // #swagger.summary = 'Add a new User',
  // #swagger.tags = ['users'],
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/User'
          }
        }
      }
    } */
  /* #swagger.responses[200] = {
      description: 'Success: User was updated successfully.',
      schema: { $ref: '#/components/schemas/User' }
    } */
  // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
  // #swagger.responses[404] = { description: 'Not found: Cannot update User with id. Maybe User was not found!' }

  isAuthenticated,
  checkPermissions("updateUser"),
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  userController.createUser
);

userRouter.put(
  "/:id",
  // #swagger.summary = 'update a User by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  checkPermissions("updateUser", true),
  userController.updateUserById
);

userRouter.delete(
  "/:id",
  // #swagger.summary = 'delete a single User by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  checkPermissions("updateUser"),
  userController.deleteUserById
);

userRouter.delete(
  "/",
  // #swagger.summary = 'delete all Users'
  // #swagger.tags = ['users']
  isAuthenticated,
  checkPermissions("updateUser"),
  userController.deleteAllUsers
);

userRouter.patch(
  "/:id/toggleActiveStatus",
  // #swagger.summary = 'toggle a User active status by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  checkPermissions("updateUser"),
  userController.toggleUserActiveStatus
);

userRouter.patch(
  "/:id/role",
  // #swagger.summary = 'change a User role by id'
  // #swagger.tags = ['users']
  isAuthenticated,
  checkPermissions("updateUser"),
  userController.updateUserRoleById
);

module.exports = userRouter;

/* #swagger.parameters['newUser'] = {
    in: 'body',
    description: 'Information for the new user.',
    required: true,
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'joelcannon'
        },
        email: {
          type: 'string',
          example: 'joelcannon@mac.com'
        },
        role: {
          type: 'string',
          example: 'Admin'
        }
      }
    }
  } */
