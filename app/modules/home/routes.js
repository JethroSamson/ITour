var express = require('express');
var flog = require( './loggedin');
var router = express.Router();
var db = require('../../lib/database')();

function homerender(req,res){
  db.query('SELECT * FROM tblplaces ORDER BY RAND() ', (err, results, fields) => {          
    res.render('home/views/index' ,{places: results ,userstab: req.users});
      });
    }
function touristspot(req,res, results){
  db.query("SELECT * FROM tblplaces WHERE intPlaceID = ? ", [req.body.placeid], (err, results, fields) => {
    console.log(results);           
      res.render('home/views/tourist_spot' ,{places: results,userstab: req.users});
      });
    }
function postrender(req,res,results){
  db.query('SELECT * FROM tblpost order by CURRENT_TIME() ASC', (err, results, fields) => {    
    res.render('home/views/post' ,{userstab: req.users, poststab: results});
      });
  }
function users(req, res, next){
  db.query("SELECT strUsername, strProfilePicture FROM tbluser WHERE strUsername = ?" , [req.session.user], function (err, results, fields) {
      if (err) return res.send(err);
      req.users = results;
      return next();
});
}


// function comments(req,res, results){
//   db.query("SELECT * FROM tblcomments" , (err, results, fields) => {
//     console.log(results);           
//       res.render('home/views/tourist_spot' ,{comments: results});
//       });
//     }
// ----------------------------------------------------------------------

//manila
function manilarender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "1" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/manila/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

//quezon_city
function quezon_cityrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "2" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/quezoncity/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

//pasig
function pasigrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "3" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/pasig/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

//Marikina
function marikinarender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "4" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/marikina/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

//san_juan
function sanjuanrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "5" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/sanjuan/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

//mandaluyong
function mandaluyongrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "6" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/mandaluyong/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

//valenzuela
function valenzuelarender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "7" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/valenzuela/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------
//navotas
function navotasrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "8" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/navotas/index' ,{places: results,userstab: req.users});
      });
    }
//malabon
function malabonrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "9" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/malabon/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------
//taguig
function taguigrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "10" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/taguig/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------
//pateros
function paterosrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "11" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/pateros/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------
//pasay
function pasayrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "12" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/pasay/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------
//parañaque
function paranaquerender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "13" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/paranaque/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------
//muntinlupa
function muntinluparender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "14" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/muntinlupa/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------
//makati
function makatirender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "15" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/makati/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

//las_piñas
function laspinasrender(req,res, results){
  db.query('SELECT * FROM tblplaces WHERE intCityCat = "16" ', (err, results, fields) => {
    console.log(results);           
      res.render('home/views/laspinas/index' ,{places: results,userstab: req.users});
      });
    }
// ----------------------------------------------------------------------

router.get('/',flog, users, homerender);
router.get('/manila',flog, users, manilarender);
router.get('/quezon_city',flog, users, quezon_cityrender);
router.get('/pasig',flog, users, pasigrender);
router.get('/marikina',flog, users, marikinarender);
router.get('/sanjuan',flog, users, sanjuanrender);
router.get('/mandaluyong',flog, users, mandaluyongrender);
router.get('/valenzuela',flog, users, valenzuelarender);
router.get('/navotas',flog, users, navotasrender);
router.get('/malabon',flog, users, malabonrender);
router.get('/taguig',flog, users, taguigrender);
router.get('/pateros',flog, users, paterosrender);
router.get('/pasay',flog, users, pasayrender);
router.get('/paranaque',flog, users, paranaquerender);
router.get('/muntinlupa',flog, users, muntinluparender);
router.get('/makati',flog, users, makatirender);
router.get('/laspinas',flog, users, laspinasrender);
router.get('/posts', flog, users, postrender );

router.post('/-/place' , users, touristspot);

exports.home= router;
