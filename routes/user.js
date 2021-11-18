const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");

const bcrypt = require("bcryptjs");

const Location = require("../models/locations.model");

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const avatar = req.body.avatar;

  User.findOne({ username: username }).then((foundUser) => {
    if (foundUser) {
      res.json({ message: "username already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        username: username,
        password: hashPass,
        avatar: avatar,
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

router.post("/save-home-base", (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(
    req.session.currentUser._id,
    {
      avatar: req.body.avatar,
      homebaseName: req.body.homebaseName,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
    { new: true }
  ).then((user) => {
    res.json({ user: user });
    // res.redirect("/userprofile");
  });
});

router.post("/save-picture-url", (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(
    req.session.currentUser._id,
    {
      pictureUrl: req.body.pictureUrl,
    },
    { new: true }
  ).then((user) => {
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
        res.json({ message: "Logout successful" });
      }
    });
  } else {
    res.json({ message: "WTH" });
  }
});

router.delete("/deleteuser", (req, res) => {
  User.findByIdAndDelete(req.session.currentUser._id).then(() => {
    req.session.destroy();
    res.json({ message: "Account Deleted" });
  });
});

router.get("/checkuser", (req, res, next) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id).then((user) => {
      res.json({ userDoc: user });
    });
  } else {
    res.json({ userDoc: null });
  }
});

// router.get("/userinfo", (req, res, next) => {
//   if (req.session.currentUser) {
//     User.findById(req.session.currentUser._id).then((user) => {
//       theUsername: req.session.currentUser.username, longitude: user.longitude, latitude: user.latitude
//     })

//   } else {
//     res.json({ userDoc: null });
//   }
// });

router.get("/userprofile", (req, res) => {
  if (!req.session.currentUser) {
    res.send("user not found - go to login and log in");
  } else {
    //req.session.currentUser.username
    User.findById(req.session.currentUser._id).then((user) => {
      Location.find({ user: req.session.currentUser._id }).then((locsOfCurrentUser) => {
        console.log(locsOfCurrentUser);
        res.json({ theUsername: req.session.currentUser.username, myLongitude: user.longitude, myLatitude: user.latitude, myLocations: locsOfCurrentUser });
      });
    });
  }
});

module.exports = router;
