/**
 * Created by ajinath on 16/6/17.
 */
var express = require('express');
var router = express.Router();
var sys = require('sys');
var fs = require('fs');
var logUpload = require('./logUpload');
var multiparty = require('multiparty');


/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('showResult.ejs');
});

router.get('/startProgress',function (req,res,next) {
 //   console.log("got req in showResult.js : " + req.url);

});


module.exports = router;
