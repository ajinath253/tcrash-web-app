/**
 * Created by ajinath on 10/6/17.
 */

var express = require('express');
var fs = require('fs');
var process = require('child_process');
var path = require('path');
// to get fields and file name
var multiparty = require('multiparty');
// multer to upload file
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req,file, cb) {
        cb(null, 'uploads')      //desti folder name to upload files
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname + '-' + Date.now() + '.txt')
    }
});
/* --------------------------------------
 file input obj name value
 // <input type="file" name="profileImage"
 */
var upload = multer({ storage: storage }).single('logFileUp');

var router = express.Router();

router.get('/',function (req,res,next) {
    var keys = Object.keys(req.params);
//    console.log(req.query.filename);
    res.render('crashFrmLog.ejs', {serror: ""});
    res.end();
});

// HTTP POST method from crashFrmLog.html

router.post('/startLogUpload',function (req,res,next) {

    // Get symDir value from multiparty form.
    global.pathSym = '';
    var form = new multiparty.Form();
    form.parse(req,function(err, fields, files) {
        global.pathSym = "/home/smart/mnt/46" + fields.symDir;
        //console.log(" ########## global.pathSym : " + global.pathSym);
    });

    var symDir=global.pathSym.toString();

    //Upload file and excute command
    upload(req,res,function (err) {
        if(err){
            res.send(" File upload error");
        }
        else {
            global.localFilePath = "../uploads/" + req.file.filename;
            var cmdShowcrash = "./showCrash.sh" + ' ' + "uploads/" + req.file.filename;
          //  console.log(cmdShowcrash);
            global.buildFingerprint="";

            var cmdGetBuildDetails="./getBuildFingerprint.sh" + ' ' + "uploads/" + req.file.filename;
         //   console.log("####### cmdGetBuildDetails in logupload.js : " + cmdGetBuildDetails);

            setTimeout(function() {
                process.exec(cmdGetBuildDetails,function (err,stdout,stderr) {
                    if(err){
                        // console.log("\n"+stderr);
                        res.end(stderr);
                    } else {
                      //  console.log("build fingerprint on uploadjs : " + stdout);
                        global.buildFingerprint=stdout;
                    }
                });
            }, 1000);


            setTimeout(function() {
                process.exec(cmdShowcrash,function (err,stdout,stderr) {
                    if(err){
                        // console.log("\n"+stderr);
                        res.end(stderr);
                    } else {
                       // console.log(stdout);
                        res.render('showProgress.ejs', { "logfile" : localFilePath , "symDir" :  global.pathSym ,"crashView" : stdout , "buildFingerPrint" : global.buildFingerprint});
                    }
                });
            }, 3000);
        }

    });

});

module.exports=router;


