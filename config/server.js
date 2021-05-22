module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "b2ee64303f63047879f1e5799b51682b"),
    },
  },
  watchIgnoreFiles: ["**/config-sync/files/**"],
});
