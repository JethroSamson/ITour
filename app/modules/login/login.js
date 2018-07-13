var express = require('express');
var router = require("express").Router()
var router = express.Router();
var auth = require( './auth');
var db = require('../../lib/database')();



router.get('/', (req, res) => {
  req.session.user = '';
  res.render('login/views/index');
});

router.post('/', (req, res) => {
var db = require('../../lib/database')();
if(req.body.user === "" || req.body.password === ""){
  res.render('login/views/invalidpages/blank');
}
else{
  db.query("SELECT * FROM tbluser WHERE strUsername= ? ",[req.body.user], (err, results, fields) => {
      if (err) console.log(err);
      if (!results[0]){
        res.render('login/views/invalidpages/incorrect');
      }
      else if(req.body.password === results[0].strPassword){
        req.session.user = results[0].strUsername;
        if(results[0].strType != 'admin')
          res.redirect('/home');
        else
          res.redirect('/admin');
      }
      else{
          res.render('login/views/invalidpages/incorrect');
      }
  });
}
});

module.exports = router;