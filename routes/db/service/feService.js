var feDao = require('../dao/feDao');
var defaultSize = 10;
var feService = {
    getFeListByPno:function(pno,cb){
        var start = pno*defaultSize;
        var len = defaultSize;
        feDao.getFes(start,len,function(rows){
            cb && cb(rows);
        })
    }
}
module.exports = feService;