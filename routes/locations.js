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

router.get("/locations/:id", (req, res, next) => {
  // List the locations
  Locations.findById(req.params.id).then((result) => {
    //console.log("results", result); // [ { } ]
    res.json(result);
    // res.send(result)
  });
});

router.get("/show", (req, res) => {
  res.render("locations/show");
});

router.post("/save-gallery-url/:id", (req, res) => {
  console.log(req.body);
  Locations.findByIdAndUpdate(
    req.params.id,
    // TODO: use mongoose's $push to push to an array of images, and update the model to image: [String]
    {
      image: req.body.pictureUrl,
    },
    { new: true }
  ).then((locations) => {
    res.json({ locations: locations });
    // res.redirect("/userprofile");
  });
});

module.exports = router;

// Locations.create({ longitude: req.body.newLongitude, latitude: req.body.newLatitude, }).then(() => {
//   res.redirect("/indextwo");
// });
