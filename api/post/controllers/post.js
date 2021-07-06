"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.post.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.post.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
  /**
   * Update a record.
   *
   * @return {Object}
   */
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [post] = await strapi.services.post.find({
      id: ctx.params.id,
      "author.id": ctx.state.user.id,
    });

    if (!post) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.post.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.post.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
