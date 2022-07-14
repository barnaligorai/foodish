const logRequest = (logger) => (req, res, next) => {
  logger(req.method, req.url);
  next();
};

exports.logRequest = logRequest;
