const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
var moment = require('moment');
var object = [];


app.use((req, res, next) => {
    // write your logging code here
    var Agent = req.headers['user-agent'];
    var Time = moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z";
    var Method = req.method;
    var Resource = req._parsedUrl['path'];
    var Version = "HTTP/" + req.httpVersion; 
    var Status = "200"
    console.log(Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status);
    var userInfo = '\n' + Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status;

    var userInfo = 
        {
            'Agent': req.headers['user-agent'],
            'Time': moment().utc().format("YYYY-MM-DDTHH:mm:ss.SSS") + "Z",
            'Method': req.method,
            'Resource': req._parsedUrl['path'],
            'Version': "http/" + req.httpVersion,
            'Status': "200",
        };
object.push(userInfo);
    fs.appendFile(path.resolve(__dirname, 'log.csv'), userInfo, function (err) {
        if (err) throw err;
    });

    next();
});

app.get('/', (req, res) => {
    // write your code to respond "ok" here

    res.status(200).send("ok"); 
});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here
    res.json(object);
});

module.exports = app;
