const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashing = (passwd) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(passwd, salt);

  return {
    salt,
    hash,
  };
};

module.exports = { hashing };