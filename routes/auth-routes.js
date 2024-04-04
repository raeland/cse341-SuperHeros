const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth-controller.js");

// Middleware for logging request and response
authRouter.use((req, res, next) => {
  // console.log('Request URL:', req.originalUrl)
  // console.log('Request Headers:', req.headers)
  next();
});

authRouter.get(
  "/github",
  // #swagger.summary = 'login in using GitHub'
  // #swagger.tags = ['auth']
  // #swagger.description = 'the /api/auth/github route should be accessed directly in the browser, not via AJAX.'
  authController.github
);

authRouter.post(
  "/login",
  // #swagger.tags = ['auth']
  // #swagger.summary = 'Logs in a user'
  // #swagger.description = 'Use an existing username in the database, and the password is always "secret" '
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Login'
          }
        }
      }
    } */
  // #swagger.responses[200] = { description: 'Login successful. Returns user data.', schema: { properties: { username: { type: 'string' }, password: { type: 'string' } } } }
  // #swagger.responses[400] = { description: 'Bad request. The username and password do not match.' }
  // #swagger.responses[500] = { description: 'Internal server error. An error occurred during the authentication process or during the login session creation.' }
  authController.login
);

authRouter.get(
  "/logout",
  // #swagger.summary = 'logout'
  // #swagger.tags = ['auth']
  authController.logout
);

authRouter.get(
  "/github/callback",
  // #swagger.ignore = true
  authController.githubCallback
);

module.exports = authRouter;
