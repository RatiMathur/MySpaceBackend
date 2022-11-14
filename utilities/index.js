async function getHashedPassword(password) {
  const bcrypt = require("bcrypt");
  password = await bcrypt.hash(password, 10);
  return password;
}

module.exports = { getHashedPassword };
