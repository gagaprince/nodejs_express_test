var mysql = require('mysql');
var db = function(){}

db.prototype = {
    conn:null,
    options:null,
    init:function(options){
        this.options = options;
        var conn =this.conn = mysql.createConnection(options);
        conn.connect();
    },
    query:function(sql,cb){
        var conn = this.conn;
        conn.query(sql,function(err,rows,fields){
            if(err) throw err;
            cb(rows,fields);
        });
    },
    restart:function(){
        this.init(this.options);
    },
    close:function(){
        var conn = this.conn;
        conn.end();
    }
}
var instance = null;
db.create = function(options){
    if(!instance){
        instance = new db();
        instance.init(options);
    }
    return instance;
}

/*var _parseBean = function(row,fields){
    var bean = {};
    for(var key in fields){
        var field = fields[key]["name"];
        bean[field] = row[field];
    }
    return bean;
}*/

/*db.parseBeans = function(rows,fields){
    var beans = [];

    var length = rows.length;
    for(var i=0;i<length;i++){
        var row = rows[i];
        var bean = _parseBean(row,fields);
        beans.push(bean);
    }

    return beans;
}*/
module.exports = db;;