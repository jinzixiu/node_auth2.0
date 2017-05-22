/**
 * Created by dashan on 2017/5/14.
 */
var express = require('express');
var app = express();






app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.get('/example',function (req, res, next) {
    console.log('this is 111111');
    next()
},function (req, res, next) {
    console.log('this is 222222');
    next()
},function (req, res, next) {
    console.log('this is 333333');
    next()
},function (req, res, next) {
    console.log('this is 4444444');
    next()
},function(req,res){
    console.log(req.query);
})


var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});