var express = require('express');
var flog = require( '../home/loggedin');
var router = express.Router();
var taken = require( './taken');
var db = require('../../lib/database')();

function addrender(req,res){
  res.render('admin/views/addplace');
}
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
router.post("/", taken, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else{
    var db = require('../../lib/database')();
    if (req.body.city == "" || req.body.placename == "" ){
      res.render('sell/views/invalidpages/blank', { curdatetab: req.curdate });
    }
    else if (!req.files.pic1 && !req.files.pic2 && !req.files.pic3 && !req.files.pic4 && !req.files.pic5){
      res.render('sell/views/invalidpages/blank', { curdatetab: req.curdate });
    }
    else{
      var randomId= makeid();
      if(!req.files.pic1)
        jpeg1= 'blank.jpg';
      else
        jpeg1= req.body.city+('-'+randomId+'-1.jpg');
      if(!req.files.pic2)
        jpeg2= 'blank.jpg';
      else
        jpeg2= req.body.city+('-'+randomId+'-2.jpg');
      if(!req.files.pic3)
        jpeg3= 'blank.jpg';
      else
        jpeg3= req.body.city+('-'+randomId+'-3.jpg');
      if(!req.files.pic4)
        jpeg4= 'blank.jpg';
      else
        jpeg4= req.body.city+('-'+randomId+'-4.jpg');
      if(!req.files.pic5)
        jpeg5= 'blank.jpg';
      else
        jpeg5= req.body.city+('-'+randomId+'-5.jpg');

      if(!req.files.pic2 && !req.files.pic3 && !req.files.pic4 && !req.files.pic5){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
            if (err) console.log(err);
                res.render('admin/views/success', {placetab: req.place});
              });
          });
      } // 1
      else if(!req.files.pic1 && !req.files.pic3 && !req.files.pic4 && !req.files.pic5){
        req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
          db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
            if (err) console.log(err);
                res.render('admin/views/success', {placetab: req.place});
          });
        });
      } // 2
      else if(!req.files.pic1 && !req.files.pic2 && !req.files.pic4 && !req.files.pic5){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
            if (err) console.log(err);
                res.render('admin/views/success', {placetab: req.place});
          });
        });
      } // 3
      else if(!req.files.pic3 && !req.files.pic5 && !req.files.pic1 && !req.files.pic2){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {    
            if (err) console.log(err);
                res.render('admin/views/success', {placetab: req.place});
          });
        });
      } // 4
      else if(!req.files.pic3 && !req.files.pic4 && !req.files.pic2 && !req.files.pic1){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
            if (err) console.log(err);
                res.render('admin/views/success', {placetab: req.place});
          });
        });
      } // 5
      else if(!req.files.pic1 && !req.files.pic2 ){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
            req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
              db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {    
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
      });
    });
      } // 345
      else if(!req.files.pic2 && !req.files.pic3 ){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
            req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
              db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
      });
    });
      } // 145
      else if(!req.files.pic3 && !req.files.pic4 ){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
              db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
      });
    });
      } // 125
      else if(!req.files.pic4 && !req.files.pic5 ){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
              db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {     
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
      });
    });
      } // 123
      else if(!req.files.pic5){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {       
                db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
        });
        });
      });
      } // 1245
      else if(!req.files.pic4){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {       
                db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {    
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
        });
        });
      });
      } // 1235
      else if(!req.files.pic3){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {       
                db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
        });
        });
      });
      } // 1245
      else if(!req.files.pic2){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
                db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {    
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
        });
      });
      });
      } // 1345
      else if(!req.files.pic1){
        req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
          req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
                db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/success', {placetab: req.place});
            });
          });
        });
      });
    });
      } // 2345
      else{
          req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
            req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
              req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
                req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
                  req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
                    db.query("INSERT INTO tblplaces ( strPlaceName, strTeaser, strInfo, strFirstPic, strSecondPic, strThirdPic, strFourthPic, StrFifthPic, strLoc, strAdmission, strGmap, strAct1, strAct2, strAct3, strAct4, strAct5, fltAct1, fltAct2, fltAct3, fltAct4, fltAct5, strHistory,  intCityCat ) VALUES ( ?, ? , ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT intCitId FROM tblcities WHERE strCityName = ?))",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.history, req.body.city], (err, results, fields) => {    
                  if (err) console.log(err);
                      res.render('admin/views/success', {placetab: req.place});
                });
            });
            });
          });
        });
      });
        } // all
    }
  }
});

router.post('/-/editplace', taken, (req, res) => {
  if(req.valid==3){
    res.render('login/views/invalidpages/banned');
  }
  else{
    var db = require('../../lib/database')();
    if (req.body.city == "" || req.body.placename == "" ){
      res.render('sell/views/invalidpages/blank', { curdatetab: req.curdate });
    }
    else if (!req.files.pic1 && !req.files.pic2 && !req.files.pic3 && !req.files.pic4 && !req.files.pic5){
      res.render('sell/views/invalidpages/blank', { curdatetab: req.curdate });
    }
    else{
      var randomId= makeid();
      if(!req.files.pic1)
        jpeg1= 'blank.jpg';
      else
        jpeg1= req.body.city.concat('-'+randomId+'-1.jpg');
      if(!req.files.pic2)
        jpeg2= 'blank.jpg';
      else
        jpeg2= req.body.city.concat('-'+randomId+'-2.jpg');
      if(!req.files.pic3)
        jpeg3= 'blank.jpg';
      else
        jpeg3= req.body.city.concat('-'+randomId+'-3.jpg');
      if(!req.files.pic4)
        jpeg4= 'blank.jpg';
      else
        jpeg4= req.body.city.concat('-'+randomId+'-4.jpg');
      if(!req.files.pic5)
        jpeg5= 'blank.jpg';
      else
        jpeg5= req.body.city.concat('-'+randomId+'-5.jpg');

      if(!req.files.pic2 && !req.files.pic3 && !req.files.pic4 && !req.files.pic5){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {   
            if (err) console.log(err);
                res.render('admin/views/index');
              });
          });
      } // 1
      else if(!req.files.pic1 && !req.files.pic3 && !req.files.pic4 && !req.files.pic5){
        req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
          db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {      
            if (err) console.log(err);
                res.render('admin/views/index');
          });
        });
      } // 2
      else if(!req.files.pic1 && !req.files.pic2 && !req.files.pic4 && !req.files.pic5){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {   
            if (err) console.log(err);
                res.render('admin/views/index');
          });
        });
      } // 3
      else if(!req.files.pic3 && !req.files.pic5 && !req.files.pic1 && !req.files.pic2){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {     
            if (err) console.log(err);
                res.render('admin/views/index');
          });
        });
      } // 4
      else if(!req.files.pic3 && !req.files.pic4 && !req.files.pic2 && !req.files.pic1){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {      
            if (err) console.log(err);
                res.render('admin/views/index');
          });
        });
      } // 5
      else if(!req.files.pic1 && !req.files.pic2 ){
        req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
          req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
            req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
              db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {     
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
      });
    });
      } // 345
      else if(!req.files.pic2 && !req.files.pic3 ){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
            req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
              db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {    
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
      });
    });
      } // 145
      else if(!req.files.pic3 && !req.files.pic4 ){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
              db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
      });
    });
      } // 125
      else if(!req.files.pic4 && !req.files.pic5 ){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
              db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {     
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
      });
    });
      } // 123
      else if(!req.files.pic5){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {       
                db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
        });
        });
      });
      } // 1245
      else if(!req.files.pic4){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {       
                db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {    
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
        });
        });
      });
      } // 1235
      else if(!req.files.pic3){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {       
                db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {      
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
        });
        });
      });
      } // 1245
      else if(!req.files.pic2){
        req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
          req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
                db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/places');
            });
          });
        });
      });
      });
      } // 1345
      else if(!req.files.pic1){
        req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
          req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
            req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
              req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
                db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {   
              if (err) console.log(err);
                  res.render('admin/views/index');
            });
          });
        });
      });
    });
      } // 2345
      else{
          req.files.pic1.mv('public/images/city_images/'+jpeg1, function(err) {
            req.files.pic2.mv('public/images/city_images/'+jpeg2, function(err) {
              req.files.pic3.mv('public/images/city_images/'+jpeg3, function(err) {
                req.files.pic4.mv('public/images/city_images/'+jpeg4, function(err) {
                  req.files.pic5.mv('public/images/city_images/'+jpeg5, function(err) {
                    db.query("UPDATE tblplaces SET  strPlaceName = ?, strTeaser = ?, strInfo = ?, strFirstPic = ?, strSecondPic= ?, strThirdPic= ?, strFourthPic= ?, StrFifthPic= ?, strLoc= ?, strAdmission= ?, strGmap= ?, strAct1= ?, strAct2= ?, strAct3= ?, strAct4= ?, strAct5= ?, fltAct1= ?, fltAct2= ?, fltAct3= ?, fltAct4= ?, fltAct5= ?,  intCityCat= (SELECT intCitId FROM tblcities WHERE strCityName = ?)WHERE intPlaceID = ?",[req.body.placename, req.body.brief, req.body.info, jpeg1, jpeg2, jpeg3, jpeg4, jpeg5, req.body.loc, req.body.hours, req.body.link, req.body.act1, req.body.act2, req.body.act3, req.body.act4, req.body.act5, req.body.fee1, req.body.fee2, req.body.fee3, req.body.fee4, req.body.fee5, req.body.city, req.body.place], (err, results, fields) => {   
                  if (err) console.log(err);
                      res.render('admin/views/index');
                });
            });
            });
          });
        });
      });
        } // all
    }
  }
});

function allplaces(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT intPlaceID, strPlaceName, strLoc FROM tblplaces", function (err, results, fields) {
    console.log(results);           
      res.render('admin/views/places' ,{places: results});
  });
}
function succ(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT intPlaceID, strPlaceName, strLoc FROM tblplaces", function (err, results, fields) {
    console.log(results);           
      res.render('admin/views/successedit' ,{places: results});
  });
}
function viewplace(req,res, results){
  db.query("SELECT * FROM tblplaces WHERE intPlaceID = ? ", [req.body.placeid], (err, results, fields) => {
    console.log(results);           
      res.render('admin/views/specific' ,{places: results});
      });
    }
    
function editplace(req,res, results){
  db.query("SELECT * FROM tblplaces WHERE intPlaceID = ? ", [req.body.placeid], (err, results, fields) => {
    console.log(results);           
      res.render('admin/views/editplace' ,{places: results});
      });
    }
// ------------------------COUNTER----------------
function cntplace(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces", function (err, results, fields) {
      if (err) return res.send(err);
      req.cntplace = results;
      return next();
  });
} //LAHAT
function cntmanila(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '1'", function (err, results, fields) {
      if (err) return res.send(err);
      req.cntmanila = results;
      return next();
  });
} //MANILA
function cntqc(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '2'", function (err, results, fields) {
      if (err) return res.send(err);
      req.qc = results;
      return next();
  });
} //QC
// -----------------------------------------------
function cntpasig(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '3'", function (err, results, fields) {
      if (err) return res.send(err);
      req.pasig = results;
      return next();
  });
} //PASIG
// -----------------------------------------------
function cntmarikina(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '4'", function (err, results, fields) {
      if (err) return res.send(err);
      req.marikina = results;
      return next();
  });
} //MARIKINA
// -----------------------------------------------
function cntsanjuan(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '5'", function (err, results, fields) {
      if (err) return res.send(err);
      req.sanjuan = results;
      return next();
  });
} //sanjuan
function cntmanda(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '6'", function (err, results, fields) {
      if (err) return res.send(err);
      req.manda = results;
      return next();
  });
} //manda
// -----------------------------------------------
function cntvalen(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '7'", function (err, results, fields) {
      if (err) return res.send(err);
      req.valen = results;
      return next();
  });
} //valenzuela
// -----------------------------------------------
function cntnavotas(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '8'", function (err, results, fields) {
      if (err) return res.send(err);
      req.navotas = results;
      return next();
  });
} //navotas
// -----------------------------------------------
function cntmalabon(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '9'", function (err, results, fields) {
      if (err) return res.send(err);
      req.malabon = results;
      return next();
  });
} //malabon
function cnttaguig(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '10'", function (err, results, fields) {
      if (err) return res.send(err);
      req.taguig = results;
      return next();
  });
} //taguig
// -----------------------------------------------
function cntpateros(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '11'", function (err, results, fields) {
      if (err) return res.send(err);
      req.pateros = results;
      return next();
  });
} //pateros
// -----------------------------------------------
function cntpasay(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '12'", function (err, results, fields) {
      if (err) return res.send(err);
      req.pasay = results;
      return next();
  });
} //pasay
function cntparan(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '13'", function (err, results, fields) {
      if (err) return res.send(err);
      req.paran = results;
      return next();
  });
} //paranaque
function cntmuntinlupa(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '14'", function (err, results, fields) {
      if (err) return res.send(err);
      req.muntinlupa = results;
      return next();
  });
} //muntinlupa
function cntmakati(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '15'", function (err, results, fields) {
      if (err) return res.send(err);
      req.makati = results;
      return next();
  });
} //makati
function cntlas(req, res, next){
  var db = require('../../lib/database')();
  db.query("SELECT COUNT(strPlaceName) AS CNT FROM dbitour.tblplaces WHERE intCityCat = '16'", function (err, results, fields) {
      if (err) return res.send(err);
      req.las = results;
      return next();
  });
} //makati
// -----------------------------------------------

var allrender = [cntplace, cntlas, cntmakati, cntparan, cntmuntinlupa, cntpasay, cntpateros,  cnttaguig ,cntmalabon, cntmarikina, cntmalabon, cntmanda , cntmanila , cntnavotas ,cntpasay , cntpasig , cntpateros, cntplace, cntqc , cntsanjuan , cnttaguig , cntvalen];

function adminrender(req,res ){
  console.log(req.cntplace);
  res.render('admin/views/index' , {lastab: req.las ,makatitab: req.makati, muntinlupatab: req.muntinlupa, parantab: req.paran, pasaytab: req.pasay, paterostab: req.pateros, taguigtab: req.taguig, malabontab: req.malabon, marikinatab: req.marikina, placetab: req.cntplace, manilatab: req.cntmanila , qctab: req.qc ,pasigtab:req.pasig , sanjuantab: req.sanjuan, mandatab: req.manda, valentab: req.valen, navotastab:req.navotas});
}
router.get('/', flog , allrender , adminrender );
router.get('/places' , flog, allplaces );
router.get('/addplace' , flog , addrender)
router.get('/success' , flog, allplaces  )



router.post('/-/view' , viewplace) //LAHAT NGPLACE
router.post('/-/edit' , editplace) // EDIT PLACE
router.post('/-/editplace',  ) //SUCCESS


exports.admin= router;
// {marikinatab: req.marikina, placetab: req.cntplace, manilatab: req.cntmanila , qctab: req.qc ,pasigtab:req.pasig , sanjuantab: req.sanjuan, mandatab: req.manda, valentab: req.valen, navotastab:req.navotas});