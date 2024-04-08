const express = require("express");
const router = express.Router();
const apiRouter = express.Router();

<<<<<<< HEAD
const comicRoutes = require("./comic-routes.js"); // HOT
const movieRouter = require("./movie-route.js");
const userRoutes = require("./user-routes.js");
const organizationRoutes = require("./organization-routes.js");
const versionRoutes = require("./version-routes.js");
const authRoutes = require("./auth-routes.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../docs/openapi.json");
=======
const comicRoutes = require('./comic-routes.js') // HOT
const heroRoutes = require('./hero-routes.js')
const userRoutes = require('./user-routes.js')
const authRoutes = require('./auth-routes.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/openapi.json')
>>>>>>> c8e8e55cc6affaf0be7a254ee4083eb4ff360fb1

// const passport = require('passport')
router.use("/api", apiRouter);

<<<<<<< HEAD
apiRouter.use("/comics", comicRoutes);
apiRouter.use("/movie", movieRouter);
apiRouter.use("/users", userRoutes);
apiRouter.use("/organizations", organizationRoutes);
apiRouter.use("/version", versionRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
=======
apiRouter.use('/comics', comicRoutes)
apiRouter.use('/hero', heroRoutes)
apiRouter.use('/users', userRoutes)
apiRouter.use('/auth', authRoutes)
apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
>>>>>>> c8e8e55cc6affaf0be7a254ee4083eb4ff360fb1

module.exports = router;
