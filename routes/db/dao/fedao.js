var db = require('../db');
var options = require('../dbconfig');
var myDb = db.create(options);
var feDao = {
    getFes:function(start,len,cb){
        var sql = 'select * from fe limit '+start+' , '+len;
        myDb.query(sql,function(rows,fields){
            cb(rows);
        });
    }
}
module.exports = feDao;