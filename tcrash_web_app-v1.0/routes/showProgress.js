/**
 * Created by ajinath on 16/6/17.
 */
var express = require('express');
var router = express.Router();
var sys = require('sys');
var fs = require('fs');
var logUpload = require('./logUpload');
var multiparty = require('multiparty');
var process = require('child_process');
var shell = require('shelljs');


/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('showProgress.ejs', { title: 'showProgress' , logfile: '--' });
});

router.get('/startProgress',function (req,res,next) {

  /*
    console.log("got req in showProgress.js : " + req.url);
    console.log(req.query.logfile);
    console.log(req.query.symDir);
    //console.log(req.query.buildFingerPrint);
    console.log(req.query.syslib);
    console.log(req.query.syslib64);
    console.log(req.query.sysvlib);
    console.log(req.query.sysvlib64);
    global.buildFingerprint=req.query.buildFingerPrint;
*/


    if (! shell.test('-d', req.query.symDir)) {
        console.log('Path not exits');
        res.render('error.ejs',{serror:"Symbols path dosen't exists on @46 server"});
        return;
    }else{
        console.log("Path exits");
    }

    var options = '';


    if (req.query.syslib)
        options = options + "system/lib" + " ";
    if (req.query.syslib64)
        options = options + "system/lib64" + " ";
    if (req.query.sysvlib)
        options = options + "system/vendor/lib" + " ";
    if (req.query.sysvlib64)
        options = options + "system/vendor/lib64" + " ";

 //   console.log("####### Options : " + options);

    setTimeout(function() {
        var localFilePath = req.query.logfile;
        var command = './runCmd.sh ' + req.query.symDir + ' ' + localFilePath + ' ' + options;
        process.exec(command,function (err,stdout,stderr) {
            if(err){
                // console.log("\n"+stderr);
                res.end(stderr);
            } else {
                res.render('showResult.ejs',{ showR : stdout });
            }
        });
      //  console.log('Start execute');
    }, 1000);



   //console.log(logUpload.gLogfile);
});


module.exports = router;
