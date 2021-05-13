# Thesis cancer back-end project

This repository contains the project's back-end; it is developed with [**Strapi**](https://strapi.io/) which enable us to handle users, surveys and posts since a web administration panel.

## Getting started

To start to work on it at local environment, follow the next steps:

1. Clone the repository on your local environment.
2. Install all required dependencies: `yarn install`.
3. Run the platform on development mode: `yarn strapi dev`.
4. Go to the administration panel: `http://localhost:1337/admin/`.
5. Create a new super user administration.

## Testing the GraphQL API

It is possible to test every **GraphQL** query and mutation with the [**GraphQL** *Playground*](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) on [**Strapi**](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/integrations/graphql.html#fetch-your-restaurant-collection-type), but just in developer mode.

1. Launch the platform on development mode: `yarn strapi dev`.
2. Go to the playground *url*: `http://localhost:1337/graphql`.
3. Play with it.

