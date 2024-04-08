const packageJson = require("../package.json");
const versionRouter = require("express").Router();

versionRouter.get(
  "/",
  // #swagger.summary = 'report API Version'
  // #swagger.tags = ['status']
  (req, res) => {
    res.send({ version: packageJson.version });
  }
);

module.exports = versionRouter;
