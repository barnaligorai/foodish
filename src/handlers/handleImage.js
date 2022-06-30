const randomInt = (num) => Math.floor(Math.random() * num);

const randomImage = (foodDb) => {
  const menu = Object.keys(foodDb);
  const randMenu = menu[randomInt(menu.length)];
  const menuDb = foodDb[randMenu];
  const image = menuDb[randomInt(menuDb.length)];
  return image;
};

const handleImage = foodDb => (request, response) => {
  const { pathname } = request.url;
  if (pathname === '/' || pathname === '/any') {
    const image = randomImage(foodDb);

    response.statusCode = 302;
    response.setHeader('location', image);
    response.end();
    return true;
  }
  return false;
};

module.exports = { handleImage };
