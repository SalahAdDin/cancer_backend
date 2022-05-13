"use strict";

const {
  sendNotificationToDevice,
  sendNotificationToTopic,
} = require("../../../utils/notifications");

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      const { id, email, username } = result;
      const title = `Yeni kayıtlı kullanıcı: ${username}`;
      const body = `${email} ile kayıtlı yeni bir kullanıcı onayınızı bekliyor.`;
      const emailTemplate = {
        subject: "Yeni kayıtlı kullanıcı: <%= user.username %>",
        text: `Yeni Kullanıcı Kayıtlı!
          <%= user.email %> ile kayıtlı yeni bir kullanıcı onayınızı bekliyor.`,
        html: `<h1>Yeni Kullanıcı Kayıtlı!</h1>
          <p><strong><%= user.email %></strong> ile kayıtlı yeni bir kullanıcı onayınızı bekliyor.<p>`,
      };

      try {
        await strapi.services.profile.create({
          user: id,
        });
        await strapi
          .query("user", "users-permissions")
          .update({ id }, { confirmed: false });
        const admins = await strapi.query("user", "admin").find({
          isActive: true,
          blocked: false,
          "roles.code": "strapi-super-admin",
        });
        const emails = admins.map((admin) => admin.email);

        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: emails,
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
            data: JSON.stringify({ id }),
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
        subject: "Güle güle <%= user.username %>",
        text: `Bunun için üzgünüz!
        <%= user.email %> ile kullanıcı hesabınız silindi.`,
        html: `<h1>Bunun için üzgünüz!</h1>
        <p><strong><%= user.email %></strong> ile kullanıcı hesabınız silindi.<p>`,
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
        subject: "Hoş geldiniz <%= user.username %>!",
        text: `JineOnkolojik Destek'e Hoş Geldiniz!
          Hesabınız, <%= user.email %> ile onaylandı.`,
        html: `<h1>JineOnkolojik Destek'e Hoş Geldiniz!</h1>
          <p>Hesabınız, <strong><%= user.email %></strong> ile onaylandı.<p>`,
      };
      const { confirmed, email, profile, username } = result;

      try {
        // This is supposed to occur once.
        if (confirmed === true) {
          const { token } = profile;

          const title = `Hoş geldiniz ${username}!`;
          const body = `Hesabınız, ${email} ile onaylandı.`;

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
