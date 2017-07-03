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
var itemOne = Todo({item:'Do puzzles'}).save(function(err){
    if (err)
        throw err;
    console.log('item saved');
});

var data = [{item:'Do GFG'},{item:'Learn Machine Learning'},{item:'Start OS'},{item:'Start DBMS'}];

module.exports = function(app){

    app.get('/todo',function(req,res){
        res.render('todo', {todos: data});
    });

    app.post('/todo',urlencodedParser,function(req,res){
        data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item',function(req,res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data);
    });

};