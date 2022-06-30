const fs = require('fs');

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

const handleImage = (foodDb, sourceDir) => {
  const template = fs.readFileSync(`${sourceDir}/index.html`, 'utf8');

  return (request, response) => {
    const { pathname } = request.url;
    if (pathname === '/' || pathname === '/any') {
      const image = randomImage(foodDb);
      const content = generatePage(template, image);
      request.content = content;
      return serverPage(request, response);
    }

    if (pathname !== '/image') {
      return false;
    }

    const food = request.url.searchParams.get('food');
    if (foodDb[food]) {
      const image = randomImageFrom(foodDb[food]);
      const content = generatePage(template, image);
      request.content = content;
      return serverPage(request, response);
    }
    return false;
  };
};

module.exports = { handleImage };
