const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const { findUserById } = require("../services/user-services.js");

const dotenv = require("dotenv");
dotenv.config();

passportConfig = {
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  clientID: process.env.GITHUB_CLIENT_ID,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
};

// passport.use(
//   new GitHubStrategy(
//     {
//       ...passportConfig,
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOrCreate(
//         { githubId: profile.id },
//         {
//           username: profile.username,
//           displayName: profile.displayName,
//           profileUrl: profile.profileUrl,
//           // photos: profile.photos
//         },
//         function (err, user) {
//           return done(err, user);
//         }
//       );
//     }
//   )
// );

passport.use(
  new GitHubStrategy(
    {
      ...passportConfig,
    },
    function (accessToken, refreshToken, profile, done) {
      // Instead of looking up or creating a user in the database,
      // we're just going to pass the profile directly to done.
      // This will store the profile in the session.
      return done(null, profile);
    }
  )
);

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
