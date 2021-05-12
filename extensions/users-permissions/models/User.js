"use strict";

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      try {
        await strapi.services.profile.create({
          user: result.id,
        });
        await strapi
          .query("user", "users-permissions")
          .update({ id: result.id }, { confirmed: false });
      } catch (error) {
        console.log("Error after registering new user: ", error);
      }
    },
  },
};
