'use strict';

const serverStart = new Date().getTime();

process.on('uncaughtException', function(err) {
    console.log('Threw Exception: ', err);
});

const firebase = require('firebase');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const app_path = __dirname + '/app/';

/* FIREBASE CONFIGURATION */
firebase.initializeApp({
    databaseURL: 'https://fireblog-491ca.firebaseio.com'
});

app.use(express.static(app_path));
app.route('/*').get(function(req, res, next) {
    res.render(__dirname + '/views/index.ejs');
});

http.listen(3006, function() {
    console.log('Server initialized in ' + timespan(new Date().getTime(), serverStart, true, true));
});

function randBetween(min, max){
    return Math.floor(Math.random() * max) + min;
}

function objectToArray(o, addKey){
    let a = [];
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            var element = o[key];
            if(addKey) element.key = key;
            a.push(element);
        }
    }
    return a;
}

function timespan(current, time, displaySeconds, displayMS){
    var t = current - time;
    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var mt = d * 30;
    var y = mt * 12;
    var years = Math.floor(t / y);
    t %= y;
    var months = Math.floor(t / mt);
    t %= mt;
    var days = Math.floor(t / d);
    t %= d;
    var hours = Math.floor(t / h);
    t %= h;
    var mins = Math.floor(t / m);
    t %= m;
    var seconds = Math.floor(t / s);
    t %= s;
    var result = "";
    if(years > 0) result += years + " year" + (years > 1 ? "s" : "");
    if(months > 0) result += (result != "" ? ", " : "") + months + " month" + (months > 1 ? "s" : "");
    if(days > 0) result += (result != "" ? ", " : "") + days + " day" + (days > 1 ? "s" : "");
    if(hours > 0) result += (result != "" ? ", " : "") + hours + " hour" + (hours > 1 ? "s" : "");
    if(mins > 0) result += (result != "" ? (displaySeconds || displayMS ? ", " : " and ") : "") + mins + " minute" + (mins > 1 ? "s" : "");
    if(displaySeconds && seconds > 0) result += (result != "" ? (displayMS ? ", " : " and ") : "") + seconds + " second" + (seconds > 1 ? "s" : "");
    if(displayMS && t > 0) result += (result != "" ? " and " : "") + t + " millisecond" + (t > 1 ? "s" : "");
    if(result == ""){
        if(displayMS) result = "instantaneously";
        else if(displaySeconds) result = "less than a second";
        else result = "less than a minute";
    }
    return result;
}