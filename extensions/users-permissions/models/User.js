"use strict";

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      const emailTemplate = {
        subject: "New registered user: <%= user.username %>",
        text: `New User Registered!
          A new user registered with <%= user.email %> is waiting for your confirmation.`,
        html: `<h1>New User Registered!</h1>
          <p>A new user registered with <%= user.email %> is waiting for your confirmation.<p>`,
      };

      try {
        await strapi.services.profile.create({
          user: result.id,
        });
        await strapi
          .query("user", "users-permissions")
          .update({ id: result.id }, { confirmed: false });
        const admins = await strapi.query("user", "admin").find({ id: 1 });
        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            // First admin user should be the main one, at first.
            to: admins[0].email,
          },
          emailTemplate,
          {
            user: { username: result.username, email: result.email },
          }
        );
      } catch (error) {
        console.log("Error after registering new user: ", error);
      }
    },
    async afterDelete(result, params) {
      const emailTemplate = {
        subject: "Good bye <%= user.username %>",
        text: `We sorry for it!
        Your user account, with <%= user.email %>, has been deleted.`,
        html: `<h1>We sorry for it!</h1>
        <p>Your user account, with <%= user.email %>, has been deleted.<p>`,
      };

      try {
        const profile = await strapi.services.profile.findOne({
          user: result.id,
        });
        await strapi.services.profile.delete({ id: profile.id });

        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: result.email,
          },
          emailTemplate,
          {
            user: { username: result.username, email: result.email },
          }
        );
      } catch (error) {
        console.log("Error after deleting a user: ", error);
      }
    },
    async afterUpdate(result, params, data) {
      const emailTemplate = {
        subject: "Welcome <%= user.username %>",
        text: `Welcome on TODO: !
          Your account is confirmed with: <%= user.email %>.`,
        html: `<h1>Welcome onTODO !</h1>
          <p>Your account is now confirmed with: <%= user.email %>.<p>`,
      };

      try {
        // This is supposed to occur once.
        if (result.confirmed === true) {
          await strapi.plugins["email"].services.email.sendTemplatedEmail(
            {
              to: result.email,
            },
            emailTemplate,
            {
              user: { username: result.username, email: result.email },
            }
          );
        }
      } catch (error) {
        console.log("Error after updating user: ", error);
      }
    },
  },
};
