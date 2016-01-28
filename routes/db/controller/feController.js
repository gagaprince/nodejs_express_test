var feService = require('../service/feService');
var feController = {
    app:null,
    init:function(app){
        this.app = app;
        this.listenFe();
    },
    listenFe:function(){
        var app = this.app;
        app.param("pno",/^\d+$/);
        app.get('/fe/index/:pno',function(req,res){
            var pno = req.params["pno"]||0;
            feService.getFeListByPno(pno,function(rows){
                res.render('feindex',{
                    res:res,
                    req:req,
                    rows:rows
                });
            })
        });
    }
}
module.exports = feController;