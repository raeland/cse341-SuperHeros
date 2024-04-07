const checkPermissions = require("../middlewares/check-permissions");
const { ROLE_PERMISSIONS } = require("../models/roles-model");

function createMocks(user, params) {
  const req = { user, params };
  const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  const next = jest.fn();

  return { req, res, next };
}

function executeMiddleware(permission, selfAllowed, req, res, next) {
  const middleware = checkPermissions(permission, selfAllowed);
  middleware(req, res, next);
}

describe("checkPermissions", () => {
  const user = {
    role: "Editor",
    isActive: true,
    id: "123",
    username: "MrEd",
  };

  it("calls next when the user has the required permission and is active", () => {
    const { req, res, next } = createMocks(user, { id: "123" });
    executeMiddleware("UpdateUser", true, req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it("sends a 403 response the active user has the required permission, but NOT selfAllowed", () => {
    const { req, res, next } = createMocks(user, { id: "123" });
    executeMiddleware("UpdateUser", undefined, req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Forbidden: Permission denied");
    expect(next).not.toHaveBeenCalled();
  });

  it("sends a 403 response when the user does not have the required permission", () => {
    const { req, res, next } = createMocks(user, { id: "999" });
    executeMiddleware("updateUser", true, req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Forbidden: Permission denied");
    expect(next).not.toHaveBeenCalled();
  });

  it("sends a 403 response when the user does not have valid Role", () => {
    const { req, res, next } = createMocks(
      { ...user, role: "Hacker" },
      { id: "123" }
    );
    executeMiddleware("updateUser", true, req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Forbidden: Unrecognized User Role");
    expect(next).not.toHaveBeenCalled();
  });
});
