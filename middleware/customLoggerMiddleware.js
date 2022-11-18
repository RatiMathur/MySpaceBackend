//Nov 15th
const customLoggerMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dateString = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()} ${currentDate.getTime()}`;
  const method = req.method;
  const url = req.url;
  const statusCode = res.statusCode;

  let text = `[${dateString} ${method} ${url} ${statusCode}]`;
  console.log(text);
  next();
};

module.exports = customLoggerMiddleware;
