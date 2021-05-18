"use strict";
const fs = require("fs");
const path = require("path");

/**
 * Writes directly to the database to persist UI customization across multiple environments.
 * @param {string} fileLocation the location of the component customization with a file in the form <contentType>.json.
 */
const setUICustomization = async (fileLocation) => {
  //Throw an error if we can't process what we need.
  if (!fileLocation) {
    throw new Error("File location not specified.");
  }

  // Remove the extension just keeping the filename.
  // This assumes the file is named the same as the content type but this is by design because it makes sense...
  const contentType = path.basename(fileLocation, ".json");

  if ((contentType.split(".").length = 1))
    const tablePath = `plugin_content_manager_configuration_content_types::application::${contentType}.${contentType}`;
  else {
    if ((contentType.split(".")[0] = "items"))
      const tablePath = `plugin_content_manager_configuration_components::${contentType}`;
    else
      const tablePath = `plugin_content_manager_configuration_content_types::plugins::${contentType}`;
  }

  // Get the default knex connection as this query is easier to perform without the strapi wrapper abstraction...
  const knex = strapi.connections.default;

  // Read in the data
  const data = fs.readFileSync(fileLocation);

  // Perform an update to the core_store table where the content manager configuration matches the content type we want to configure
  await knex("public.core_store").where("key", tablePath).update({
    value: data,
  });
};

module.exports = { setUICustomization };
