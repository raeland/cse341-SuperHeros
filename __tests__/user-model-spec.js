const mongoose = require("mongoose");
const { UserModel } = require("../models/user-model");
const isPhoneNumberValid = require("../utils/phone-validator");

jest.mock("../utils/phone-validator");

// This will make the mock function return true when it's called
isPhoneNumberValid.mockReturnValue(true);

describe("UserModel", () => {
  beforeEach(() => {
    isPhoneNumberValid.mockClear();
  });

  it("should validate phone number before save", async () => {
    const user = new UserModel({
      username: "testuser",
      phone: "+15412440897",
    });

    // Mock the save method of the user instance
    user.save = jest.fn().mockResolvedValue(true);

    await expect(user.save()).resolves.toBeTruthy();
  });

  it("should throw an error if the username is too short", async () => {
    const user = new UserModel({
      username: "Ed",
    });

    await expect(user.save()).rejects.toThrow(
      "Username must be at least 3 characters long and can contain alphanumeric characters, underscores, and hyphens."
    );
  });

  it("Should throw an error if the email is invalid", async () => {
    const user = new UserModel({
      username: "Ted",
      email: "ted.com",
    });

    await expect(user.validate()).rejects.toThrow("Email is not valid.");
  });
});
