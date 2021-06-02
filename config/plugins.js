module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3-plus-cdn",
    providerOptions: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_ACCESS_SECRET"),
      region: env("AWS_REGION"),
      params: {
        Bucket: env("AWS_BUCKET"),
        // StorageClass: env("AWS_S3_STORAGE_CLASSES"),
      },
      cdnUrl: env("CDN_URL"),
      logger: console,
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
    provider: "amazon-ses",
    providerOptions: {
      key: env("AWS_ACCESS_KEY_ID"),
      secret: env("AWS_ACCESS_SECRET"),
      amazon: `https://email.${env("AWS_REGION")}.amazonaws.com`,
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
