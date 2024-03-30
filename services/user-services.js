const { User } = require("../models/user-model");

function findUserById(id) {
  // console.log("findUserById", id);
  // console.log('User', User)
  return User.findById(id);
}

async function findUserByUsername(username) {
  return User.findOne({ username: username });
}

async function createUser(userData) {
  const user = new User(userData);
  return await user.save();
}

async function findOrCreateUser(profile) {
  const user = await User.findOrCreate(
    { username: profile.username },
    {
      username: profile.username,
      email: profile.email,
      role: "Editor",
    }
  );
  return user;
}

module.exports = {
  findUserById,
  findUserByUsername,
  createUser,
  findOrCreateUser,
};
