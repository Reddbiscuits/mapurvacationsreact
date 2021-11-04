const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const Locations = require("../models/locations.model");

router.post("/save-new-loc", (req, res) => {
  Locations.create({ user: req.session.currentUser._id, name: req.body.newName, longitude: req.body.newLongitude, latitude: req.body.newLatitude }).then(() => {
    res.json({ message: "location created" });
  });
});

router.get("/locations", (req, res, next) => {
  // List the locations
  Locations.find({ user: req.session.currentUser._id }).then((result) => {
    console.log("results", result); // [ { } ]
    res.json({ locationResults: result });
    // res.send(result)
  });
});

router.get("/show", (req, res) => {
  res.render("locations/show");
});

module.exports = router;

// Locations.create({ longitude: req.body.newLongitude, latitude: req.body.newLatitude, }).then(() => {
//   res.redirect("/indextwo");
// });
