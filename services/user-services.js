const { UserModel } = require("../models/user-model");

function findUserById(id) {
  // console.log("findUserById", id);
  // console.log('User', User)
  return UserModel.findById(id);
}

async function findUserByUsername(username) {
  return UserModel.findOne({ username: username });
}

async function createUserService(userData) {
  const user = new UserModel(userData);
  return await user.save();
}

async function findOrCreateUser(profile) {
  const user = await UserModel.findOrCreate(
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
  createUserService,
  findOrCreateUser,
};
