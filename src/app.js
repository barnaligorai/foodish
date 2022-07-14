const { serveRandomImage } = require('./handlers/serveRandomImage.js');
const { serveFoodImage } = require('./handlers/serveFoodImage.js');
const { logRequest } = require('./handlers/logRequest.js');

const fsModule = require('fs');

const express = require('express');

const readFoodDb = (sourceDir, fs = fsModule) => {
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

const readFile = (fileName, fs = fsModule) => {
  if (fs.existsSync(fileName)) {
    return fs.readFileSync(fileName, 'utf8');
  }
};

const app = ({ sourceDir, templateFile }, logger) => {
  const app = express();

  const foodDb = readFoodDb(sourceDir + '/images');
  const template = readFile(templateFile);

  app.use(logRequest(logger));
  app.use(express.urlencoded({ extended: true }));
  app.get(['/', 'any'], serveRandomImage(foodDb, template));
  app.get('/:image', serveFoodImage(foodDb, template));
  app.use(express.static(sourceDir));
  return app;
};

module.exports = { app };
