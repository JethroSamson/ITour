module.exports= (req,res,next)=>{
  var db = require('../../lib/database')();
  db.query("SELECT * FROM tbluser WHERE strUsername= ?",[req.session.user], function (err, results, fields) {
    if (err) console.log(err);
    if (!results[0])
      req.valid = 0;
      else if (results[0].strType == 'admin')
        req.valid = 2;
      else
        req.valid = 1;
      req.user = results;
      return next();
  });

}
      //   console.log('in');

      //  res.redirect('/out');
      // }
