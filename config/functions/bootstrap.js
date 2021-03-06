"use strict";
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_CONFIG_BASE64, "base64").toString("ascii")
);

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  strapi.firebase = admin;
};
