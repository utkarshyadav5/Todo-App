var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://todoapp:todoapp@ds147052.mlab.com:47052/todo_app');

//Create schema  - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);

module.exports = function(app){

    app.get('/todo',function(req,res){
        //get data from mongoDB and pass it to view
        Todo.find({},function(err,data){
            if(err)
                throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
        //get data from the view and add it to db
        var newTodo = Todo(req.body).save(function(err,data){
            if(err)
                throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        //delete the requested item from mongoDB
        Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err)
                throw err;
            res.json(data);
        });
    });

};