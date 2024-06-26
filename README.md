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

## Thoughts

- I chose mono repo with Nx that makes it pretty simple to have the front, the back and shared DTOs in the same repository. This allows for end to end typing that I find very nice.
- I chose to pair Angular with a NestJs, that is a solid and well known backend typescript framework. It uses modules and decorators that parallel very well with Angular.
- For Angular, I tried to apply the [style guide](https://angular.dev/style-guide) while keeping the file structure simple given the size of the project.
- Following my goal to keep the project simple and contained, I chose a CSS library (Bulma) instead of a traditional design system. This also allows for a heavy use of semantic HTML tags (section, h2, h3, etc.) with is both good for SEO and accessibility. I only used angular material for the autocomplete, while ensuring it blends with the rest of the application. For a larger project, I would have made the blending better.
- Speaking of accessibility, the whole website uses alt for images, no unlabeled buttons or inputs and is fully browsable with keyboard only, with visible focus.
- Bulma supports light and dark modes using the preferred settings for users.
- For the API, I made a simple REST, but included nested entities to ensure one call per page, following the principle of Backend For Frontend (BFF), and avoided API routes that are not used by the front-end.
- I included a very small caching (in memory) system for autocomplete. This could be extended to more routes depending on the load. It could also be put in Redis (to add to Docker compose), if the memory use is too high. I did not jump to it immediately to keep the project simple (KISS).
