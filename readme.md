# Commit Process

1. Fetch and sync from Github Master Branch
2. Create your branch to work on.
3. Frequently commit and stage your code
4. Before pushing your code, do another fetch and merge to your branch any major changes
5. Increment the version number in package.json
6. Do a final commit and push of your code
7. In Github, create a new pull request with all your notes of changes that you made
8. Reach out to someone to do a pull request review.



(ask for .env file)

## API Docs

HOST/api/docs/

## OAuth Authentication

HOST/api/auth/github

## Local Authentication

HOST/api/auth/login
Use an existing username in the database, and the password is always "secret"
{
"username": "stanlee",
"password": "secret"
}

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


Team Members (alpha order by first name):

Cristian | | cdelahoze@hotmail.com

Eduardo | EMFERNANDEZV | eduardo15191@gmail.com

Hector | hectapia | oli21007@byui.edu

Joel | JoelCannon | joelcannon@mac.com

Preston | preston-bateman | prestonbbateman@gmail.com

Rachael | raeland | rsvarady@gmail.com

Ricardo | Ricardo230698 | ricardoprograming@gmail.com