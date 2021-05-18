module.exports = {
  query: `
    resultsCount(where: JSON): Int!
  `,
  resolver: {
    Query: {
      resultsCount: {
        description: "Return the count of survey result.",
        resolverOf: "application::result.result.count",
        resolver: async (obj, options, ctx) => {
          return await strapi.api.result.services.result.count(
            options.where || {}
          );
        },
      },
    },
  },
};
