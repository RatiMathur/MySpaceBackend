async function getHashedPassword(password) {
  const bcrypt = require("bcrypt");
  password = await bcrypt.hash(password, 10);
  return password;
}

function generateToken({ userName }) {
  const { sign } = require("jsonwebtoken");

  let payload = {
    userName: userName,
  };

  const token = sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  }); //Token is valid for 1day, for 1 hour type 1h

  return token;
}

module.exports = { getHashedPassword, generateToken };
