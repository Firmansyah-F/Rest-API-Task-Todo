// const { expression } = require("joi");
const yup = require("yup");

const userSchema = yup.object().shape({
  username: yup.string().required().max(50).min(5),
  fullname: yup.string().required(),
  email: yup
    .string("email must be string")
    .email("please add a valid email")
    .required(),
  password: yup
    .string("password must be string")
    .min(6, "password is too short, at leas 6 characters")
    .matches(/[a-zA-Z]/, "Password letters only"),
  role: yup
    .string()
    .required()
    .matches(/[admin|user|supervisor]/, "role must be admin, user, or supervisor"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const updateStatus = yup.object().shape({
  status: yup.string().required()
})
// typeSchema
// const typeSchema = yup.object({
//   name: yup.string().required()
// })

// vehicleSchema
// const vehicleSchema = yup.object({
//   name: yup.string().required(),
//   typeId: yup.number().integer().positive().required(),
//   hourlyPrice: yup.number().integer().positive().required(),
//   licnsePlate: yup.string().required()
// })


module.exports = {
  userSchema,
  loginSchema,
  updateStatus
};