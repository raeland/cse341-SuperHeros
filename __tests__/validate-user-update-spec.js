const validateUserUpdate = require("../middlewares/validate-user-update");
const { userUpdateJoiSchema } = require("../models/user-model");

describe("validateUserUpdate", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
    };
    mockRes = {};
    mockNext = jest.fn();
  });

  it("calls next when the user update data is valid", () => {
    mockReq.body = { username: "stan", role: "Viewer" };
    validateUserUpdate(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it("calls next with an error when the user update data is invalid", () => {
    mockReq.body = { username: "spy", role: "Hacker" };
    validateUserUpdate(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });
});
