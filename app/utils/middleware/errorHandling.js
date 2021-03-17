const errorHandler = (error, req, res, next) => {
    const payload = {
      success: false,
      message: error.message,
      token_sentry : res.sentry,
      error: error,
    };
    return res.json(payload);
  };
  module.exports = { errorHandler };
  