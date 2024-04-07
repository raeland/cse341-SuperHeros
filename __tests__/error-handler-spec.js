const { errorHandler } = require("../middlewares/error-handler");

describe("errorHandler", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("handles generic errors", () => {
    const mockError = new Error("An unexpected error occurred.");
    errorHandler(mockError, mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "An unexpected error occurred.",
      errors: undefined,
    });
  });

  it("handles validation errors", () => {
    const mockError = new Error("Validation failed.");
    mockError.name = "ValidationError";
    errorHandler(mockError, mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Validation failed.",
      errors: undefined,
    });
  });
});
