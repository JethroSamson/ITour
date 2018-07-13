var express = require('express');
var router = express.Router();
var flog = require( '../home/loggedin');
var fs = require('fs');

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function fuser(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE strUsername= ?",[req.params.userid], (err, results, fields) => {
      if (err) console.log(err);
      req.user= results;
      return next();
    });
}
function fedituser(req,res,next){
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE strUsername= ?",[req.session.user], (err, results, fields) => {
      if (err) console.log(err);
      req.user= results;
      return next();
    });
}
function profilerender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1){
    if (!req.user[0])
      res.render('login/views/noroute');
    else if(req.user[0].strUsername == req.session.user)
      res.render('profile/views/index',{usertab: req.user, userstab: req.users});
      
    else
      res.render('profile/views/otherprofile',{usertab: req.user, transtab: req.trans});
      
  }
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
function editprofilerender(req,res){
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else if(req.valid==1)
    res.render('profile/views/editprofile',{usertab: req.user});
  else if(req.valid==2)
    res.render('home/views/invalidpages/adminonly');
  else
    res.render('login/views/invalid');
}
function users(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT strUsername, strProfilePicture FROM tbluser WHERE strUsername = ?" , [req.session.user], function (err, results, fields) {
      if (err) return res.send(err);
      req.users = results;
      return next();
});
}
router.get('/', flog, users, (req, res) => {
  res.redirect('/profile/'+req.session.user);

});
router.get('/:userid', flog, fuser,users, profilerender);
router.get('/-/post', flog, fuser,users, profilerender);
router.get('/-/edit', flog, fedituser,users, editprofilerender);


router.post('/-/edit', flog, fedituser, users, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else{
    var db = require('../../lib/database')();
    if(req.body.user=='' || req.body.oldpass=='' || req.body.newpass=='' || req.body.confirm=='' || req.body.email=='' ){
      res.render('profile/views/invalidpages/blank',{usertab: req.user , userstab: req.users});
    }
    else if( req.body.newpass === req.body.confirm ){
      if(req.body.oldpass === req.user[0].strPassword){
        var randomId= makeid();
        jpeg= req.body.user.concat('-'+randomId+'-dp.jpg');
        if(!req.files.profilepic){
          db.query("UPDATE tbluser SET strFname= ?, strLname= ?, strUsername= ?, strPassword= ?, strEmail= ?, strInfo= ? WHERE strUsername= ? ",[req.body.fname, req.body.lname, req.body.user, req.body.newpass, req.body.email, req.body.info, req.session.user], (err, results1, fields) => {
              if (err) console.log(err);
              res.redirect('/profile');
          });
        }
        else{
          req.files.profilepic.mv('public/images/profile_pictures/'+jpeg, function(err) {
            db.query("UPDATE tbluser SET strFname= ?, strLname= ?, strUsername= ?, strPassword= ?, strProfilePicture= ?, strEmail= ?, strInfo= ?  WHERE strUsername= ? ",[req.body.fname, req.body.lname, req.body.user, req.body.newpass, jpeg, req.body.email, req.body.info, req.session.user], (err, results1, fields) => {
                if (err) console.log(err);
                if(req.user[0].strProfilePicture!= 'blank.png')
                  ('public/images/profile_pictures/'+req.user[0].strProfilePicture);
                res.redirect('/profile');
            });
          });
        }
      }
      else
        res.render('profile/views/invalidpages/incorrect',{usertab: req.user, userstab: req.users});
    }
    else
      res.render('profile/views/invalidpages/notmatch',{usertab: req.user ,userstab: req.users});
  }
});

router.post('/-/post', (req, res) =>{
  var db = require('../../lib/database')();
  var randomId= makeid();
  jpeg= req.body.id+('-'+randomId+'.jpg');
  req.files.postimage.mv('public/images/profile_pictures/'+jpeg, function(err) {
    db.query("INSERT INTO tblpost ( strPostUID, strPPic, txtPDetails, intCityCategoryID, datPostDate) VALUES ( ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?), (SELECT NOW() AS CDT) ) ",[req.body.id, jpeg, req.body.expi,req.body.city], (err, results, fields)=>{
        if (err) console.log(err);
      res.redirect('/profile')
      });
    });
  });
exports.profile= router;
