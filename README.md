[![freeCodeCamp Social Banner](https://s3.amazonaws.com/freecodecamp/wide-social-banner.png)](https://www.freecodecamp.org/)

[![Pull Requests Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com)
[![first-timers-only Friendly](https://img.shields.io/badge/first--timers--only-friendly-blue.svg)](http://www.firsttimersonly.com/)

[freeCodeCamp.org](https://www.freecodecamp.org) is a friendly community where you can learn to code for free. It is run by a [donor-supported 501(c)(3) nonprofit](https://www.freecodecamp.org/donate) to help millions of busy adults transition into tech. Our community has already helped more than 40,000 people get their first developer job. Our full-stack web development and machine learning curriculum is completely free and self-paced. We have thousands of interactive coding challenges to help you expand your skills.

# Classroom

> A self-hosted solution to help teachers plan and manage classroom-based learning, on top of freeCodeCamp's learn platform.

## Motivation

For a while now teachers have been asking for a way to get a birds eye view of multiple students who are progressing through the course. This is why we set out to make freeCodeCamp classroom mode, an interactive dashboard for teachers to view multiple freeCodeCamp users’ progress on their courses.

## Setup

1. Clone the project repository.
   ```console
   git clone https://github.com/freeCodeCamp/classroom.git
   cd classroom
   ```
2. We use npm to manage our dependencies.
   ```console
   npm ci
   ```
3. Create `.env` file based on the `.env.sample` file. These are the environment variables that are used by the application.
   - Generate a strong `NEXTAUTH_SECRET` with `openssl rand -base64 32`.
   - Do not commit real secrets. The `.env` file is gitignored.
4. Run `npx prisma generate`.
5. Run `npx prisma db push`.
6. Run `npx prisma db seed`.
7. Run `npm run develop`.
8. Run `npm run create-mock-user-server` in a separate terminal window.
9. Run `npm run create-mock-authentication-server` in a separate terminal window.

### Prepare the database

This project uses a PostgreSQL database. You can use Docker:

```console
mkdir -p $HOME/docker/volumes/postgres
docker run -it --name pgsql-classroom -e POSTGRES_PASSWORD=password -d --restart unless-stopped -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres:latest
```

Use a strong password outside of local development.

### Optional - GitPod Dev Environment

If you want a ready-made dev environment in your browser, make a fork of this repository and then prefix your fork with gitpod.io/#
`gitpod.io/#https://github.com/{your-name}/{fork-name}`

You will still need to set up your NextAuth related environment variables in the .env file.

## Contributing

Join us in our [Discord Chat](https://discord.gg/qcynkd4Edx).

## License

Copyright © 2021 freeCodeCamp.org

The content of this repository is bound by the following licenses:

- The computer software is licensed under the [BSD-3-Clause](LICENSE.md) license.
