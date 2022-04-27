"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const { sendNotificationToTopic } = require("../../../utils/notifications");

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
    async afterCreate(result, data) {
      const { type, author, title } = result;
      const body = `${author.username}, ${type} için yeni bir gönderi yayınladı!`;

      try {
        await sendNotificationToTopic({
          topic: "posts",
          data: {
            title,
            body,
            type: "NEW_POST",
            data: { type, author: author.username },
          },
          notification: {
            title,
            body,
          },
        });
      } catch (error) {
        console.log(
          "Error after sending a push notification for Posts: ",
          error
        );
      }
    },
  },
};
