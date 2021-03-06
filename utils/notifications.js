async function sendNotificationToDevice({ token, data, notification }) {
  const message = {
    data,
    notification,
    token,
  };

  return await strapi.firebase
    .messaging()
    .send(message)
    .then((response) => response)
    .catch((error) => {
      console.log("Error sending message: ", error);
    });
}

async function sendNotificationToTopic({ topic, notification, data }) {
  const message = {
    data,
    notification,
    topic,
  };

  return await strapi.firebase
    .messaging()
    .send(message)
    .then((response) => response)
    .catch((error) => {
      console.log("Error sending message: ", error);
    });
}

async function sendNotificationToGroup({ tokens, data }) {
  const message = {
    data,
    tokens,
  };

  return await strapi.firebase
    .messaging()
    .sendMulticast(message)
    .then((response) => response)
    .catch((error) => {
      console.log("Error sending message: ", error);
    });
}

module.exports = {
  sendNotificationToDevice,
  sendNotificationToGroup,
  sendNotificationToTopic,
};
