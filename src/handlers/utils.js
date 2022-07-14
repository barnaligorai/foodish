const randomInt = (num) => Math.floor(Math.random() * num);

const randomImageFrom = (foodDb) => foodDb[randomInt(foodDb.length)];

const randomImage = (foodDb) => {
  const menu = Object.keys(foodDb);
  const randMenu = menu[randomInt(menu.length)];
  const menuDb = foodDb[randMenu];
  const image = randomImageFrom(menuDb);
  return image;
};

const generatePage = (template, image) => {
  let content;
  content = template.replace('__IMAGE__', `images${image}`);
  return content;
};

const serverPage = (request, response) => {
  const content = request.content;
  response.statusCode = 200;
  response.setHeader('content-Type', 'text/html');
  response.end(content);
  return true;
};

module.exports = { randomImage, serverPage, generatePage, randomImageFrom, randomInt };
