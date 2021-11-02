const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((foundUser) => {
    if (foundUser) {
      res.json({ message: "username already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        username: username,
        password: hashPass,
      });

      aNewUser.save().then(() => {
        res.json({ message: "user created" });
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((foundUser) => {
    if (!foundUser) {
      res.json({ errorMessage: "username not registered - register first" });
    } else {
      if (bcrypt.compareSync(password, foundUser.password)) {
        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentUser = foundUser;
        res.json({ user: foundUser });
      } else {
        res.json({ errorMessage: "password incorrect" });
      }
    }
  });
});

// router.post("/login-the-user", (req, res) => {
//   User.findOne({ username: req.body.username }).then((user) => {
//     if (!user) {
//       res.send("user not found");
//     }
//     if (bcrypt.compareSync(req.body.password, user.password)) {
//       if (user.latitude && user.longitude) {
//         req.session.currentUser = user;
//         res.redirect("/userprofile");
//       } else {
//         req.session.currentUser = user;
//         res.redirect("/userHomeBase");
//       }
//     } else {
//       res.send("password not correct");
//     }
//   });
// });

router.post("/save-home-base", (req, res) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.session.currentUser._id, {
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  }, { new: true }).then((user) => {
    res.json({ user: user });
    // res.redirect("/userprofile");
  });
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});

router.get("/checkuser", (req, res, next) => {  
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id).then((user) => {
      res.json({ userDoc: user });
    })
    
  } else {
    res.json({ userDoc: null });
  }
});

module.exports = router;
