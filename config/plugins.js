module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_ACCESS_SECRET"),
      region: env("AWS_REGION"),
      params: {
        Bucket: env("AWS_BUCKET"),
        // StorageClass: env("AWS_S3_STORAGE_CLASSES"),
      },
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
});
