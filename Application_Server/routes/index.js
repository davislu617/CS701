var express = require('express');
var router = express.Router();

// modules
var login = require("./login"); //sign in
var signup = require("./signup"); // sign up
var searchByYelp = require("./searchByYelp"); // search by Yelp API
var getPlan = require("./getPlan"); // get user plans
var storePlan = require("./storePlan"); // store user plans

router.get('/login', login);
router.get('/signup', signup);
router.get('/search', searchByYelp);
router.get('/getPlan', getPlan);
router.get('/storePlan', storePlan);

module.exports = router;