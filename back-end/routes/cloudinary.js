var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary");
var multer = require("multer"); // handling multipart/form-data
var cloudinaryStorage = require("multer-storage-cloudinary");

////////////////////////////////////////////////////////////////////////////////////////

cloudinary.config({
  cloud_name: "codinghub18wtc",
  api_key: "551819357444522",
  api_secret: "asGC9I6QtnXmPMSV8Y0EFV20dQU"
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "tutoring-hub/tutor-profile/",
  allowedFormats: ["jpg", "png"]
});

var parser = multer({ storage: storage }).single("image");

router.post("/upload", parser, function(req, res) {
  res.json(req.file);
});

router.delete("/delete", function(req, res) {
  cloudinary.v2.uploader.destroy(req.body.public_id, function(result, error) {
    if (error) {
      res.json(error);
    }
    console.log(result);
    res.json(result);
  });
});

////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
