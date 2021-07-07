module.exports = {
  query: `
      postsCount(where: JSON): Int!
    `,
  resolver: {
    Query: {
      postsCount: {
        description: "Return the count of posts.",
        resolverOf: "application::post.post.count",
        resolver: async (obj, options, ctx) => {
          return await strapi.api.post.services.post.count(options.where || {});
        },
      },
    },
  },
};
