# Roles

- **Viewer:** Has read-only access and can view but not edit or manage data.
- **Editor:** Can perform specific operations or tasks within the system, such as adding new data or performing routine tasks.
- **Admin:** Has the highest level of authority and can manage all aspects of the system, including users, permissions, and configuration.

# Permissions

- **readDoc:** Allows access to read documents (except Users).
- **updateDoc:** Allows access to update and delete documents (except Users).
- **readUser:** Allows access to read User documents.
- **updateSelf:** Allows access to update their own User document (except isActive and role).
- **updateUser:** Allows access to create, update and delete any User document.

```js
const Roles = {
  VIEWER: "Viewer",
  EDITOR: "Editor",
  ADMIN: "Admin",
};

const ROLE_PERMISSIONS = {
  Viewer: ["readDoc"],
  Editor: ["readDoc", "updateDoc", "readUser", "updateSelf"],
  Admin: ["readDoc", "updateDoc", "readUser", "updateUser"],
};
```

# Middleware

```js
const checkPermissions = require("../middlewares/check-permissions.js");

checkPermissions(requiredPermission, selfAllowed);
```
