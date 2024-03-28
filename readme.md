# Links

GitHub - https://github.com/raeland/cse341-SuperHeros
Render -
(ask for .env file)

## API Docs

HOST/api/docs/

## Development

This project uses [pnpm](https://pnpm.io/) for managing dependencies. `pnpm` is a fast, disk space efficient package manager.

To install `pnpm`, you can use `npm`:

```bash
npm install -g pnpm
```

To install the project dependencies, navigate to the project directory and run:

```bash
pnpm install
```

To build the project:

```bash
pnpm run build
```

To run the project:

```bash
pnpm run start
```

To run the project locally during development (auto-restart on file updates):

```bash
pnpm run dev
```

When adding new dependencies to the project, make sure to use pnpm:

```bash
pnpm add [package-name]
```

By using pnpm, we ensure that everyone is using the same package manager, leading to more consistent installations and fewer 'it works on my machine' issues.

Remember to replace [package-name] with the actual name of the package you want to add.
