const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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
    if(!user){
      return res.status(401).json("Wrong password or username!");
    };

    // !user && res.status(404).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.secret_pass_key
    );
    const original_Password = bytes.toString(CryptoJS.enc.Utf8);

    

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.secret_pass_key,
      { expiresIn: "5d" }
    );
    
    const { password, ...info} = user._doc;
    
    // console.log(user._doc);

    if(original_Password !== req.body.password){
        return res.status(401).json("Wrong password or username!");
    };

    // original_Password !== req.body.password &&
    //   res.status(401).json("Wrong password or username!");

    // if (original_Password !== req.body.password) {
    //   res.status(404).json("Wrong password or username!");
    // } else {
    //   res.status(200).json({...info, accessToken});
    // }

    res.status(200).json({...info, accessToken});



  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
