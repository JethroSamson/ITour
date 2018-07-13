module.exports= (req,res,next)=>{
  var db = require('../../lib/database')();
  if (req.body.user === "" || req.body.fname === "" ||  req.body.email === ""){
    res.render('login/views/invalidpages/blank');
  }
  else{
    db.query("SELECT strUsername FROM tbluser WHERE strUsername= ?",[req.body.user], (err, results, fields) => {
        if (err) console.log(err);
        if(!results[0])
          next();
        else {
          res.render('login/views/invalidpages/taken');
        }
    });
  }

}
