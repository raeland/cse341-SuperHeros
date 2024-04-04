require("dotenv").config();
const { UserModel } = require("../models/user-model");
const { findUserById, createUser } = require("../services/user-services");
const validateUser = require("../middlewares/validate-user");
const validateUserUpdate = require("../middlewares/validate-user-update");

exports.createUser = [
  validateUser,
  async (req, res, next) => {
    // #swagger.responses[500] = { description: 'Internal server error' }
    if (!req.body.username) {
      return res.status(400).json({ message: "Content can not be empty!" });
    }

    const user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      isActive: req.body.isActive,
    });

    try {
      const data = await createUser(user);
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getAllUsers = [
  async (req, res, next) => {
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await UserModel.find();
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.getUserById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    // #swagger.responses[200] = { description: 'Success' }
    // #swagger.responses[404] = { description: 'Not found: User with id' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await findUserById(id);

      if (!data) {
        return res
          .status(404)
          .json({ message: "Not found User with id " + id });
      }

      res.json(data);
    } catch (err) {
      next(err);
    }
  },
];

exports.updateUserById = [
  validateUserUpdate,
  // #swagger.parameters['id'] = { description: 'User ID' }
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
  // #swagger.responses[500] = { description: 'Internal server error' }
  async (req, res, next) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    try {
      const data = await UserModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true,
      });

      if (!data) {
        return res.status(404).json({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res
          .status(200)
          .json({ message: "User was updated successfully.", user: data });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.deleteUserById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    // #swagger.responses[204] = { description: 'Success: User was deleted successfully!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot delete User with id. Maybe User was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    const id = req.params.id;

    try {
      const data = await UserModel.findByIdAndRemove(id);

      if (!data) {
        return res.status(404).json({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.status(204).json({ message: "User was deleted successfully!" });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.deleteAllUsers = [
  async (req, res, next) => {
    // #swagger.responses[204] = { description: 'Success: Users were deleted successfully!' }
    // #swagger.responses[500] = { description: 'Internal server error' }
    try {
      const data = await UserModel.deleteMany({});
      res.status(204).json({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    } catch (err) {
      next(err);
    }
  },
];

exports.toggleUserActiveStatus = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    /* #swagger.responses[200] = {
      description: 'Success: User active status was toggled successfully.',
      schema: { $ref: '#/components/schemas/User' }
    } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot toggle User active status with id. Maybe User was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }

    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({
          message: `Cannot toggle User active status with id=${id}. Maybe User was not found!`,
        });
      } else {
        user.isActive = !user.isActive;
        const data = await user.save();
        res.status(200).json({
          message: `User active status was toggled successfully. Current status is ${user.isActive ? "active" : "inactive"}.`,
          user: data,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];

exports.updateUserRoleById = [
  async (req, res, next) => {
    // #swagger.parameters['id'] = { description: 'User ID' }
    /* #swagger.responses[200] = {
      description: 'Success: User role was updated successfully.',
      schema: { $ref: '#/components/schemas/User' }
    } */
    // #swagger.responses[400] = { description: 'Bad request: Data to update can not be empty!' }
    // #swagger.responses[404] = { description: 'Not found: Cannot update User role with id. Maybe User was not found!' }
    // #swagger.responses[500] = { description: 'Internal server error' }

    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    try {
      const id = req.params.id;
      const newRole = req.body.role;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({
          message: `Cannot update User role with id=${id}. Maybe User was not found!`,
        });
      } else {
        user.role = newRole;
        const data = await user.save();
        res.status(200).json({
          message: `User role was updated successfully. Current role is ${user.role}.`,
          user: data,
        });
      }
    } catch (err) {
      next(err);
    }
  },
];
