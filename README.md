# Thesis cancer back-end project

This repository contains the project's back-end; it is developed with [**Strapi**](https://strapi.io/) which enable us to handle users, surveys and posts since a web administration panel.

## Getting started

To start to work on it at local environment, follow the next steps:

1. Clone the repository on your local environment.
2. Install all required dependencies: `yarn install`.
3. Run the platform on development mode: `yarn strapi dev`.
4. Go to the administration panel: `http://localhost:1337/admin/`.
5. Create a new super user administration.

## Docker stack

To make things ready and easy, we also provide a compose file with a stack formed by:

- **PostgreSQL** as database.
- **PGWeb** as web panel for watching the database.
- **Strapi** as our backend.

The folder structure must be:

- **main** folder.
  - `docker-compose.yaml`.
  - **backend** folder (containing the **Strapi** project).

To launch it:

1. Create the main folder: `mkdir cancer`.
2. Clone the repository on folder: `cd cancer && git clone http://gitlab.cloudnesil.com/ramazan.apa/doktora-tezi.git`.
3. Change the folder name: `mv doktora-tezi backend`.
4. Paste the compose file on the main folder: `mv backend/docker-compose.yaml docker-compose.yaml`.
5. Install dependencies: `cd backend && yarn install`.
6. Launch the stack: `cd ../ && docker-compose up -d`.
7. Go to the administration panel: `http://localhost:1337/admin/`.

And, that's all.

## Testing the GraphQL API

It is possible to test every **GraphQL** query and mutation with the [**GraphQL** _Playground_](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) on [**Strapi**](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/integrations/graphql.html#fetch-your-restaurant-collection-type), but just in developer mode.

1. Launch the platform on development mode: `yarn strapi dev`.
2. Go to the playground _url_: `http://localhost:1337/graphql`.
3. Play with it.
