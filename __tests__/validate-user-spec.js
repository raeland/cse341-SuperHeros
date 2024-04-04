const validateUser = require("../middlewares/validate-user");
const { userJoiSchema } = require("../models/user-model");

describe("validateUser", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  it("calls next when the user data is valid", () => {
    mockReq.body = {
      username: "stanlee2",
      email: "stanlee@marvel.com",
      phone: "+15412440891",
      role: "Admin",
    };
    validateUser(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it("calls next with an error when the user data is invalid", () => {
    mockReq.body = {
      username: "a",
      email: "stanlee@marvel.com",
      phone: "+15412440891",
      role: "Admin",
    };
    validateUser(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });
});
