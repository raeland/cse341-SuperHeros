const express = require('express')
const router = express.Router()
const apiRouter = express.Router()

const comicRoutes = require('./comic-routes.js') // HOT
const userRoutes = require('./user-routes.js')
const movieRouter = require('./movie-route.js')
const authRoutes = require('./auth-routes.js')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../docs/openapi.json')


// const passport = require('passport')
router.use('/api', apiRouter)

apiRouter.use('/comics', comicRoutes)
apiRouter.use('/users', userRoutes)
apiRouter.use('/movie', movieRouter)
apiRouter.use('/auth', authRoutes)
apiRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = router
