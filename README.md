# FDJ League

This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)

## Setup

Install dependencies

```sh
npm install
```

Setting up MongoDB with [Docker Compose](https://docs.docker.com/compose/)

```sh
docker-compose up -d
```

You can import seeds for the database (using [mongorestore](https://www.mongodb.com/docs/database-tools/mongorestore/)) with the following command

```sh
./db/seed.sh
```

## Run locally

Once docker containers are running, you can run the frontend and backend.

```sh
# To run the frontend
npm run serve:frontend

# To run the backend
npm run serve:backend
```

The **backend** is accessible at http://localhost:3000/api with a swagger documenting the routes.

The **frontend** is accessible at http://localhost:4200.

## Building

To build the project for production run

```sh
npm run build
```

This will build both the front and back end, into the `./dist` directory.

## Testing

The project include both unit and end-to-end (e2e) tests for both the front and the back ends.

```sh
# To run unit tests
npm run test

# To run e2e
npm run e2e
```

Remember that you need the apps running already to run the e2e tests.
