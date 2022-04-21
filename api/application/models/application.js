"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterUpdate(result, params, data) {
      const title = "Settings";
      const body = "Application settings where updated.";
      try {
        await sendNotificationToTopic({
          topic: "settings",
          data: {
            title,
            body,
            type: "SETTINGS_UPDATED",
          },
          notification: {
            title,
            body,
          },
        });
      } catch (error) {
        console.log(
          "Error after sending a push notification for Settings: ",
          error
        );
      }
    },
  },
};
