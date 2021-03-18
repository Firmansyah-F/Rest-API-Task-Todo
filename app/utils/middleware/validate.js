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
        if (await schema.isValid(req.body.status)) {
          next()
        } else {
          res.status(400);
           res.json({message:"you can only enter the complete, todo, work in progress"});
        }        
      } else {
        let schema = yup.string().matches(/(need to review)/).required()
        if (await schema.isValid(req.body.status)) {
          next()
        } else {
          res.status(400);
          res.json({message:"you can only enter the 'need to review'"});
        }
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
};

module.exports = { validate , validateStatus};
