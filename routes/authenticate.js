const authenticateRouter = require("express").Router();
const User = require("../models/user");
const { getHashedPassword, generateToken } = require("../utilities");
const bcrypt = require("bcrypt");
const { validateEmail, validatePassword } = require("../Validators");

authenticateRouter.post("/signup", async (req, res) => {
  let { userName, password } = req.body;

  const userEntity = new User({
    userName: userName,
    password: await getHashedPassword(password),
  });

  try {
    await userEntity.save();

    const token = generateToken(userEntity);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

authenticateRouter.post("/login", async (req, res) => {
  let { userName, password } = req.body;

  const userNameValidation = validateEmail(userName);

  if (userNameValidation.isInvalid) {
    return res.status(400).json(userNameValidation);
  }

  const passwordValidation = validatePassword(password);

  if (passwordValidation.isInvalid) {
    return res.status(400).json(passwordValidation);
  }

  try {
    const user = await User.findOne({ userName: userName });
    const passwordIsSame = await bcrypt.compare(password, user?.password);

    if (!user || !passwordIsSame) {
      res.status(400).json({
        error: "Username and password is incorrect",
      });
    } else {
      const token = generateToken(user);
      res.json({ token });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = authenticateRouter;
