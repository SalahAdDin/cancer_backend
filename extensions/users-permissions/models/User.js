"use strict";

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      try {
        await strapi.services.profile.create({
          user: result.id,
        });
      } catch (error) {
        console.log(
          "Error creating user profile after registering user: ",
          error
        );
      }
    },
  },
};
