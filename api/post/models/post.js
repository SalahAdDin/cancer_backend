"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * It throws and error if the admin does not add an author for the post.
   */
  lifecycles: {
    async beforeCreate(data) {
      if (data.author == null) {
        throw strapi.errors.badRequest("This post needs an author.");
      }
    },
    async beforeUpdate(params, data) {
      if (data.author == null) {
        throw strapi.errors.badRequest("This post needs an author.");
      }
    },
  },
};
