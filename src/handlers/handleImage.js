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

const handleImage = foodDb => (request, response) => {
  const { pathname } = request.url;
  if (pathname === '/' || pathname === '/any') {
    const image = randomImage(foodDb);
    const content = fs.readFileSync('./public' + image);
    response.statusCode = 200;
    response.setHeader('content-Type', 'image/jpg');
    response.end(content);
    return true;
  }

  if (pathname.startsWith('/image/')) {
    const food = pathname.split('/')[2];
    if (foodDb[food]) {
      const image = randomImageFrom(foodDb[food]);
      const content = fs.readFileSync('./public' + image);
      response.statusCode = 200;
      response.setHeader('content-Type', 'image/jpg');
      response.end(content);
      return true;
    }
  }
  return false;
};

module.exports = { handleImage };
