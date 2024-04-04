const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "superhero-api",
    description: `BYUI CSE341 Team 19 API Documentation for superhero project. 
    [View Local Code Coverage Report](http://localhost:8080/coverage/lcov-report/index.html)`,
    version: "1.0.0",
  },
  servers: [
    {
      // The first url set will be your default - deployment.
      url: "https://superheros-6636.onrender.com",
      description: "production Render URL",
    },
    {
      // use for dev and testing.
      url: "http://localhost:8080",
      description: "local dev URL",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        required: ["username", "email", "phone"],
        properties: {
          username: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          role: { type: "string" },
          isActive: { type: "boolean" },
        },
      },
      Comic: {
        type: "object",

        properties: {
          publication: { type: "string" },
          publisher: { type: "string" },
          title: { type: "string" },
          pages: { type: "string" },
          year: { type: "string" },
          isbn13: { type: "string" },
          language: { type: "string" },
        },
      },
      Login: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    securitySchemes: {
      OAuth2: {
        type: "oauth2",
        flows: {
          authorizationCode: {
            authorizationUrl: "https://github.com/login/oauth/authorize",
            tokenUrl: "https://github.com/login/oauth/access_token",
            scopes: {
              "read:user": "Read user data",
            },
          },
        },
      },
    },
  },
  security: [{ OAuth2: ["read:user"] }],
};

const outputFile = "./docs/openapi.json";
const endpointsFiles = [
  "./routes/index.js",
  "./routes/status-routes.js",
  "./models/*.js",
]; // Include all files in these models

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

console.log("Running swagger script...");
swaggerAutogen(outputFile, endpointsFiles, doc);
