const { baseResponse } = require("../helpers/baseResponse");

const notFound = (req, res) => {
  const urlOrigin = req.originalUrl;
  return baseResponse({
    success: false,
    message: `sorry ${urlOrigin} not found`,
  })(res, 404);
};

module.exports = { notFound };