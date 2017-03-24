var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var Images = require('../models/image');
var jwt = require('jsonwebtoken');
var config = require('../config');

// router.get('/setup', function(req, res) {

//   // create a sample user
//   var nick = new User({ 
//     username: 'tester2', 
//     password: 'test'
//   });

//   // save the sample user
//   nick.save(function(err) {
//     if (err) throw err;

//     console.log('User saved successfully');
//     res.json({ success: true });
//   });
// });

router.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    username: req.body.username
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    }
    else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      }
      else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'It is token!',
          token: token
        });
      }

    }

  });
});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }
      else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  }
  else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});

/* Add new image */
router.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  var fileName;

  // store all uploads in the /uploads directory
  form.uploadDir = 'public/uploads';

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fileName = file.name;
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {

    Images.update({
      user: req.decoded._doc._id
    }, {
      $push: {
        file: fileName
      }
    }, function(err, result) {
      if (err) {
        res.send(err);
      }
      else {
        res.json(result);
      }
      // res.send(JSON.stringify({ status: 'ok' }));
    })
  });

  // parse the incoming request containing the form data
  form.parse(req);
});


/* GET images with the provided ID of user */
router.get('/images', function(req, res, next) {
  Images.findOne({
    user: req.decoded._doc._id
  }, function(err, images) {
    if (err) {
      res.send(err);
    }
    else {
      var response = [];
      if (images) {
        var response = images.file.map(function(image) {
          return config.host + '/uploads/' + image;
        });
      }
      res.json(response);
    }
  });
});



module.exports = router;
