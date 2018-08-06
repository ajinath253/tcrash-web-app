var express = require('express');
var router = express.Router();
var shell = require('shelljs');
var sys = require('sys');
var fs = require('fs');

/* GET home page. */
  router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
