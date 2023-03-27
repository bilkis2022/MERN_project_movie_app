const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");

// Register______
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.secret_pass_key
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN_______
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.secret_pass_key
    );
    const original_Password = bytes.toString(CryptoJS.enc.Utf8);

    original_Password !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
