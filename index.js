const { app } = require('./src/app.js');

const startApp = (PORT) => {
  const config = { sourceDir: './public', templateFile: './resource/index.html' };
  const server = app(config, console.log);

  server.listen(PORT, () => {
    console.log(`started listenng on ${PORT}`);
  });
};

startApp(4444);
