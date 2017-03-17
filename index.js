var bodyParser = require('body-parser');
var config = require("config");
var express = require("express");
var firebase = require("firebase");
var http = require("http");

// Initialize Firebase
var firebaseConfig = {
    apiKey: config.get("apiKey"),
    authDomain: config.get("authDomain"),
    databaseURL: config.get("databaseURL"),
    storageBucket: config.get("storageBucket"),
    messagingSenderId: config.get("messagingSenderId"),
};
firebase.initializeApp(firebaseConfig);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = config.get('port');

function handlerError(res, error) {
    //var errorCode = error.code;
    //var errorMessage = error.message;
    res.status(500).send(error);
}

app.post("/createUserWithEmailAndPassword", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
        res.status(200).send(result);
    }).catch(error => handlerError(res, error));
});

app.post("/signInWithEmailAndPassword", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
        res.status(200).send(result);
    }).catch(error => handlerError(res, error));
});

app.post("/signInWithFacebook", function(req, res) {
    var access_token = req.body.access_token;
    var credential = firebase.auth.FacebookAuthProvider.credential(access_token);
    firebase.auth().signInWithCredential(credential).then(result => {
        res.status(200).send(result);
    }).catch(error => handlerError(res, error));
});

app.post("/signInWithGithub", function(req, res) {
    var access_token = req.body.access_token;
    var credential = firebase.auth.GithubAuthProvider.credential(access_token);
    firebase.auth().signInWithCredential(credential).then(result => {
        res.status(200).send(result);
    }).catch(error => handlerError(res, error));
});

app.post("/signInWithGoogle", function(req, res) {
    var id_token = req.body.id_token;
    var access_token = req.body.access_token;
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token, access_token);
    firebase.auth().signInWithCredential(credential).then(result => {
        res.status(200).send(result);
    }).catch(error => handlerError(res, error));
});

app.post("/signInWithTwitter", function(req, res) {
    var access_token = req.body.access_token;
    var secret = req.body.secret;
    var credential = firebase.auth.TwitterAuthProvider.credential(access_token, secret);
    firebase.auth().signInWithCredential(credential).then(result => {
        res.status(200).send(result);
    }).catch(error => handlerError(res, error));
});

app.post("/signInAnonymously", function(req, res) {
    firebase.auth().signInAnonymously().then(result => {
        res.status(200).send(result);
    }).catch(error => handlerError(res, error));
});

var httpServer = http.createServer(app);
httpServer.listen(port, function() {
    console.log('Firebase auth server running on port ' + port + '.');
});