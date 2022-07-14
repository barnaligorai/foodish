const { randomImageFrom, generatePage, serverPage } = require('./utils.js');

const serveFoodImage = (foodDb, template) => (request, response) => {
  const food = request.query.food;
  if (foodDb[food]) {
    const image = randomImageFrom(foodDb[food]);
    const content = generatePage(template, image);
    request.content = content;
    return serverPage(request, response);
  }
};

module.exports = { serveFoodImage };
