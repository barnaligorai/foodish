const { notFound } = require('./handlers/notFound.js');
const { handleImage } = require('./handlers/handleImage.js');
const { fileHandler } = require('./handlers/fileHandler.js');
const fs = require('fs');

const readFoodDb = () => {
  const sourceDir = './public';
  const menu = fs.readdirSync(sourceDir);
  const foodDB = {};
  menu.forEach(item => {
    foodDB[item] = [];
    const allFood = fs.readdirSync(`${sourceDir}/${item}`);
    allFood.forEach((food) => {
      foodDB[item].push(`/${item}/${food}`);
    });
  });
  return foodDB;
};

const app = () => {
  const foodDb = readFoodDb();
  const handlers = [
    handleImage(foodDb),
    fileHandler,
    notFound
  ];
  return createRouter(handlers);
};

const createRouter = (handlers) => {
  return (request, response) => {
    for (const handler of handlers)
      if (handler(request, response))
        return;
  }
};

module.exports = { app };
