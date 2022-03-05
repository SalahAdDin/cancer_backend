"use strict";

const { sendNotificationToDevice } = require("../../../utils/notifications");

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
        const admins = await strapi.query("user", "admin").findOne({ id: 1 });
        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            // First admin user should be the main one, at first.
            to: admins.email,
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
        const deletedUser = result[0];
        const profileId = deletedUser.profile.id;
        const uid = deletedUser.profile.uid;
        await strapi.services.profile.delete({ id: profileId });
        await strapi.firebase.auth().deletedUser(uid);

        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: deletedUser.email,
          },
          emailTemplate,
          {
            user: { username: deletedUser.username, email: deletedUser.email },
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
      const { email, username } = result;

      try {
        // This is supposed to occur once.
        if (result.confirmed === true) {
          const { token } = result.profile;

          console.log("result profile: ", result.profile);

          await sendNotificationToDevice({
            token,
            notification: {
              title: `Welcome ${username}!`,
              body: `Your account is confirmed with: ${email}.`,
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
