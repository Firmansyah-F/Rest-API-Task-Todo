// const { string } = require("yup/lib/locale");
const yup = require("yup")

const validate = (schema) => async (req, res, next) => {
  {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      res.status(400);
      next(error.message);
    }
  }
};

const validateStatus = async (req, res, next) => {
  {
    try {
      const role = req.user.role
      console.log(`validate `,req.body.status)
      if (role === "user") {
        let schema = yup.string().matches(/(todo|complete|work in progres)/).required()
        await schema.isValid(req.body.status)
        next()
      } else {
        let schema = yup.string().matches(/(need to review)/).required()
        await schema.isValid(req.body.status)
        next()
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
};

module.exports = { validate , validateStatus};
