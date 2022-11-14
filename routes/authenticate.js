//Create API
const authenticateRouter = require("express").Router();
const User = require("../models/user");
const { getHashedPassword } = require("../utilities");

authenticateRouter.post("/signup", async (req, res) => {
  let { userName, password } = req.body;

  const userEntity = new User({
    userName: userName,
    password: await getHashedPassword(password),
  });

  try {
    await userEntity.save();

    res.json({ userName: userName });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = authenticateRouter;
