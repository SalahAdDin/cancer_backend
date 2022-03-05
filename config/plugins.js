module.exports = ({ env }) => ({
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
  graphql: {
    endpoint: "/graphql",
    shadowCRUD: true,
    playgroundAlways: false,
    depthLimit: 7,
    amountLimit: 100,
    apolloServer: {
      tracing: true,
    },
  },
  email: {
    provider: "mailgun",
    providerOptions: {
      apiKey: env("MAILGUN_API_KEY"),
    },
    settings: {
      defaultFrom: env("EMAIL_DEFAULT_FROM"),
      defaultReplyTo: env("EMAIL_DEFAULT_REPLY_TO"),
      testAddress: env("EMAIL_DEFAULT_TEST"),
    },
  },
  "config-sync": {
    destination: "extensions/config-sync/files/",
    minify: false,
    importOnBootstrap: false,
    include: ["core-store", "role-permissions"],
    exclude: [
      "core-store.model_def_application",
      "core-store.model_def_items",
      "core-store.model_def_plugins",
      "core-store.model_def_strapi",
      "core-store.plugin_users-permissions_grant",
    ],
  },
});
