var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [{item:'Do GFG'},{item:'Learn Machine Learning'},{item:'Start OS'},{item:'Start DBMS'}];

module.exports = function(app){

    app.get('/todo',function(req,res){
        res.render('todo', {todos: data});
    });

    app.post('/todo',urlencodedParser,function(req,res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo',function(req,res){

    });

};