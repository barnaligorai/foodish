const { notFound } = require('./handlers/notFound.js');

const app = () => {
  const handlers = [
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
