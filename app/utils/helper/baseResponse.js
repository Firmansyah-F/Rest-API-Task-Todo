const baseResponse = ({ success = true, message, data = [] }) => (
    res,
    statusCode
  ) => {
    const payload = {
      success: success,
      message: message,
      data: data,
    };
    res.status(statusCode).json(payload);
    res.end();
  };
  
  module.exports = { baseResponse };
  