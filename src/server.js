var express = require('express');
var path = require('path');
var app = express();

app.use('/src', express.static(__dirname + '/../src'));
app.use('/lib', express.static(__dirname + '/../lib'));
app.use('/assets', express.static(__dirname + '/../assets'));

var server = require('http').Server(app);

app.get('/', function(req, res){
    var file = path.resolve(__dirname + '/index.html');
    res.sendFile(file);
});


server.listen(9595);
