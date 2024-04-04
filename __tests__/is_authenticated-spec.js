const isAuthenticated = require("../middlewares/is-authenticated");

describe("isAuthenticated", () => {
  it("calls next when the user is authenticated", () => {
    const req = { session: { user: {} } };
    const res = {};
    const next = jest.fn();

    isAuthenticated(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("sends a 401 response when the user is not authenticated", () => {
    const req = { session: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    isAuthenticated(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
