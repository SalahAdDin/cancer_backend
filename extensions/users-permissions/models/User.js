"use strict";

const { sendNotificationToDevice } = require("../../../utils/notifications");

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      const { id, email, username } = result;
      const title = `New registered user: ${username}`;
      const body = `A new user registered with ${email} is waiting for your confirmation.`;
      const emailTemplate = {
        subject: "New registered user: <%= user.username %>",
        text: `New User Registered!
          A new user registered with <%= user.email %> is waiting for your confirmation.`,
        html: `<h1>New User Registered!</h1>
          <p>A new user registered with <%= user.email %> is waiting for your confirmation.<p>`,
      };

      try {
        await strapi.services.profile.create({
          user: id,
        });
        await strapi
          .query("user", "users-permissions")
          .update({ id }, { confirmed: false });
        const admins = await strapi.query("user", "admin").findOne({ id: 1 });

        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            // First admin user should be the main one, at first.
            to: admins.email,
          },
          emailTemplate,
          {
            user: { username, email },
          }
        );

        await sendNotificationToTopic({
          topic: "admins",
          data: {
            title,
            body,
            type: "NEW_USER_REGISTERED",
            data: { id },
          },
          notification: {
            title,
            body,
          },
        });
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
        const { email, profile, username } = result[0];
        const { id, uid } = profile;
        await strapi.services.profile.delete({ id });
        await strapi.firebase.auth().deleteUser(uid);

        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: email,
          },
          emailTemplate,
          {
            user: { username, email },
          }
        );
      } catch (error) {
        console.log("Error after deleting a user: ", error);
      }
    },
    async afterUpdate(result, params, data) {
      const emailTemplate = {
        subject: "Welcome <%= user.username %>",
        text: `Welcome on JineOnkolojik Destek !
          Your account is confirmed with: <%= user.email %>.`,
        html: `<h1>Welcome on JineOnkolojik Destek !</h1>
          <p>Your account is now confirmed with: <%= user.email %>.<p>`,
      };
      const { confirmed, email, profile, username } = result;

      try {
        // This is supposed to occur once.
        if (confirmed === true) {
          const { token } = profile;

          console.log("Result profile: ", profile);

          const title = `Welcome ${username}!`;
          const body = `Your account is confirmed with: ${email}.`;

          await sendNotificationToDevice({
            token,
            data: {
              title,
              body,
              type: "USER_CONFIRMED",
            },
            notification: {
              title,
              body,
            },
          });

          await strapi.plugins["email"].services.email.sendTemplatedEmail(
            {
              to: email,
            },
            emailTemplate,
            {
              user: { username, email },
            }
          );
        }
      } catch (error) {
        console.log("Error after updating user: ", error);
      }
    },
  },
};
