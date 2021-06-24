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

# Super Admin and Application User

After creating a new super admin, we need also create it's authenticated user (which will be its user to access the application), for it:

1. Go to `Admin Panel > Users` and do click on <kbd>Add New Users</kbd>.
2. Fulfill `username`, `email` and `password`.
3. Set `Confirmed` *ON* and *Authenticated* as `Role` and do click on <kbd>Save</kbd>. A profile will be created automatically.
4. Do click on `Profile` *Details* to go to the new user's profile.
5. Fulfill the information as you want (`firstName`, `lastName`, `role`, `phoneNumber`, `profilePhoto`, `biography`, etc).
6. Do click on <kbd>Save</kbd>.

That's all, don't forget to user your **Profile** as `author`on your posts :exclamation:.

> **Note:** 
>
> - :warning: This is a required workaround since right now it is not possible to use ***polymorphic* relationships** on the **Profile** object(relation to the ***admin*** *user* and ***user-permision*** *user*). 
> - :warning: Also, since the application's chat feature works only on chat, the admin/doctor needs also an application authenticated user. 
> - :warning: Don't forget to create it!

## Synchronizing settings

By default, **Strapi** does not have a tool to migrate database between different environments, so, at any new instance of the back-end we need to manually recreate all settings and data we want to have on the back-end.

Fortunately, for settings, we got a useful [package](https://github.com/boazpoolman/strapi-plugin-config-sync) that helps us to import settings manually:

1. Go to `Panel > Plugins > Config Sync`.
2. Make sure the changes from the configuration files are the same we aim to replicate on the current instance: in the list do click in every item with `Different` as **State**.
3. After getting sure about changes, import them by clicking on the <kbd>Import</kbd> button.

**Note:** In case you made changes we need to replicate in other instances, export them by clicking <kbd>Export</kbd> and push them to the repository.

That's all.

## Testing the GraphQL API

It is possible to test every **GraphQL** query and mutation with the [**GraphQL** _Playground_](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) on [**Strapi**](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/integrations/graphql.html#fetch-your-restaurant-collection-type), but just in developer mode.

1. Launch the platform on development mode: `yarn strapi dev`.
2. Go to the playground _url_: `http://localhost:1337/graphql`.
3. Play with it.
