const { randomImage, generatePage, serverPage } = require('./utils.js');

const serveRandomImage = (foodDb, template) => {

  return (request, response) => {
    const image = randomImage(foodDb);
    const content = generatePage(template, image);
    request.content = content;
    return serverPage(request, response);
  };
};

module.exports = { serveRandomImage };
