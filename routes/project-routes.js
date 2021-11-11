const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const Locations = require("../models/locations.model");

const uploader = require('../configs/cloudinary');

router.post('/upload', uploader.single("imageUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ file_url: req.file.path });
})
module.exports = router;