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
    async beforeDelete(data) {
      try {
        const profile = await strapi.services.profile.findOne({
          user: data.id,
        });
        await strapi.services.profile.delete({ id: profile.id });
      } catch (error) {
        console.log("Error before deleting a user: ", error);
      }
    },
  },
};
