/*

*/
/**
 * Module dependencies.
 *//*


var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.loggler('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/

var express = require('express');
var app = express();
//app.set('view engine', 'html');
app.set('view engine', 'jade');
//app.engine('html', require('ejs').renderFile);

app.use('/',function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

//配置静态文件路径
app.use('/static', express.static(__dirname + '/public'));

//配置默认logger输出
app.use(express.logger());

app.get('/',function(req,res){
    res.send("hello! express!");
});


app.param(function(name, fn){
    if (fn instanceof RegExp) {
        return function(req, res, next, val){
            var captures;
            if (captures = fn.exec(String(val))) {
                req.params[name] = captures;
                next();
            } else {
                next('route');
            }
        }
    }
});

app.param("id",/^\d+$/);
app.set('jsonp callback name', 'cb');

var feController = require('./routes/db/controller/feController');
feController.init(app);

app.listen(8886);

/*app.get('/user/:id',function(req,res){
//    res.send(500, { error: 'something blew up' });
//    res.send(404,"cannot find this");
//    res.send("user:"+req.params.id);
//    res.jsonp({ user: 'tobi' })
    console.log(req.cookies);
    console.log(req.ip);
    console.log(req.path);
    console.log(req.host);
    console.log(req.protocol);
    console.log(req.get('Content-Type'));

    res.render('index',{ title: 'usershow' },function(err,html){
        console.log("---------------------------");
        console.log(err);
        console.log(html);
        res.write(html);

    });
    res.render('inIndex',function(err,html){
        console.log("---------------------------");
        console.log(err);
        console.log(html);
        res.write(html);
        res.end();
    });

//    res.redirect('http://www.baidu.com');
});*/


/*app.set('title',"first express");
var title = app.get("title");
console.log(title);*/

/*app.enable("showtitle");
var isShowTitle = app.get("showtitle");
console.log(isShowTitle);
app.disable("showtitle");
isShowTitle = app.get("showtitle");
console.log(isShowTitle);
console.log(app.enabled("showtitle"));*/

//console.log(app.get('env'))
//console.log(__dirname);
//console.log(app.routes);




var db = require('./routes/db/db');
var dbOption = require('./routes/db/dbconfig');
var myDb = db.create(dbOption);

var _printdb = function(row,fields){
    var logstr = '';
    for(var key in fields){
        var field = fields[key];
        logstr+=row[field["name"]]+'\t';
    }
    console.log(row);
    console.log(logstr);
}

var sql = "select * from fe";
myDb.query(sql,function(rows,fields){
    if(rows){
        for(var i=0;i<rows.length;i++){
            var row = rows[i];
            _printdb(row,fields);
        }
    }
});