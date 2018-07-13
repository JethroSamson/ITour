var express = require('express');
var router = express.Router();
var db = require('../../lib/database')();
var auth = require( './auth');

router.use("/login", require("./login"))

router.get("/", (req, res) => {
	res.render("login/views/index", req.query)
})

router.post('/', auth, (req, res) => {
  var db = require('../../lib/database')();
  if(req.body.password === req.body.confirm && req.body.password != ""){
    db.query("INSERT INTO tbluser ( strUsername, strFname, strLname, strEmail, strPassword, strType ) VALUES ( ?, ?, ?, ?, ?, 'user' ) ",[req.body.user, req.body.fname, req.body.lname, req.body.email, req.body.password], (err, results, fields)=>{
      if (err)
        console.log(err);
      else{
        res.render('login/views/successlog');
      }
      });
    }
    else{
      res.render('login/views/invalidpages/notmatch');
    }
});

exports.login = router
