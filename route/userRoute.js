const express = require("express");
const route = express.Router();
const User = require("../model/userSchema");
var bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const verify = require("./verifytoken");

// route
route.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Validating email and  password
  if (!email || !password) {
    res.send("Fields are required");
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({ message: "Please enter a valid email" });
  }
  if (!validator.isStrongPassword(req.body.password)) {
    return res.status(400).send({ message: "Please enter a strong password" });
  }
  const usedEmail = await User.findOne({ email: req.body.email });
  if (usedEmail) {
    return res.status(400).send({ message: "Email already exists" });
  }
  // bycryting password
  var salt = bcrypt.genSaltSync(10);
  var hash = await bcrypt.hashSync(password, salt);

  // create new usr
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user.name, email: user.email });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Login Route

route.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.send("Fields are required");
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({ message: "Please enter a valid email" });
  }
  // checking email existence
  const userlog = await User.findOne({
    email,
  });
  if (!userlog) {
    return res.status(400).send({ message: "Email is wrong" });
  }
  // checking password vallidity

  const validPass = await bcrypt.compare(req.body.password, userlog.password);
  console.log(validPass, password, userlog.password, userlog.name);

  if (!validPass) {
    return res.status(400).json({
      message: "Invalid Password.",
    });
  }

  // verifying jwt

  const token = jwt.sign(
    {
      _id: userlog._id,
    },

    process.env.JWT_SECRET
  );
  res.header("auth-token", token).send(token);

  // if (userlog.password !== password) {
  //   return res.status(400).json({
  //     message: "wrong password.",
  //   });
  // }
  // res.status(200).json({
  //   message: "User signed in.",
  // });
  // if (!match) {
  //   return res.status(400).send({ message: "password is wrong" });
  // } else return res.send("logged in");
  //
  // }

  // Test jwt
});
route.get("/post", verify, (req, res) => {
  res.json({
    posts: {
      title: "ihbjskbjsb sjnks nsjkbd,",
      description: "ghsj sdhjhds sdjkbjhvsb sdbj",
    },
  });
});

module.exports = route;
