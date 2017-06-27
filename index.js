var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var fs = require('fs')


app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 8080; // our port

//app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts'));


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

function readMyFile(file, callback) {
    fs.readFile('answersRes.json', 'utf8', callback(data))
}

app.listen(port)
