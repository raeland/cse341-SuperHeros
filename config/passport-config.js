const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const {
  findUserById,
  findUserByUsername,
  findOrCreateUser,
} = require("../services/user-services.js");

const dotenv = require("dotenv");
dotenv.config();

githubConfig = {
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  clientID: process.env.GITHUB_CLIENT_ID,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

passport.use(
  "local",
  new LocalStrategy(function (username, password, done) {
    // Your logic to find the user and validate the password
  })
);

// intentionally using a hardcoded password for demonstration purposes
passport.use(
  "local",
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // Compare passwords
      if (password === "secret") {
        // Passwords match
        return done(null, user);
      } else {
        // Passwords don't match
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new GitHubStrategy(
    {
      ...githubConfig,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await findOrCreateUser(profile);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// passport.use(
//   new GitHubStrategy(
//     {
//       ...githubConfig,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       // Instead of looking up or creating a user in the database,
//       // we're just going to pass the profile directly to done.
//       // This will store the profile in the session.
//       return done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  // console.log(user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = findUserById(id);
  if (!user) {
    return done(new Error("User not found"));
  }
  done(null, user);
});

module.exports = passport;
