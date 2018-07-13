module.exports= (req,res,next)=>{
    var db = require('../../lib/database')();
    if (req.body.placename === "" ){
      res.render('login/views/invalidpages/blank');
    }
    else{
      db.query("SELECT strPlaceName FROM tblplaces WHERE strPlaceName= ?",[req.body.placename], (err, results, fields) => {
          if (err) console.log(err);
          if(!results[0])
            next();
          else {
            res.render('admin/views/invalidpages/taken');
          }
      });
    }
  
  }
  