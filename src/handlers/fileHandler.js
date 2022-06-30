const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.gif': 'image/gif',
};

const mimeType = (fileName) => {
  const extension = path.extname(fileName);
  return mimeTypes[extension] || 'text/plain';
};

const setContentTypeHeader = (response, fileName) =>
  response.setHeader('Content-Type', mimeType(fileName));

const setStatusCode = (response, code) =>
  response.statusCode = code;

const fileHandler = sourceDir => (request, response) => {
  const { pathname } = request.url;
  const fileName = sourceDir + pathname;

  if (fs.existsSync(fileName) && !fs.statSync(fileName).isDirectory()) {
    const content = fs.readFileSync(fileName);
    setContentTypeHeader(response, fileName);
    setStatusCode(response, 200);
    response.end(content);
    return true;
  }
  return false;
};

module.exports = { fileHandler };
