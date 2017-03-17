import * as config from "config";
import * as express from "express";
import * as firebase from "firebase";
import * as http from "http";

// Initialize Firebase
var firebaseConfig = {
  apiKey: config.get("apiKey"),
  authDomain: config.get("authDomain")
};
firebase.initializeApp(firebaseConfig);

var app = express();
var port = config.get('port');
var httpServer = http.createServer(app);

function handlerError(res, error) {
  //var errorCode = error.code;
  //var errorMessage = error.message;
  res.status(500).send(error);
}

app.post("/createUserWithEmailAndPassword", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
    var user = result.user;
    res.status(200).send(user);
  }).catch(handlerError);
});

app.post("/signInWithEmailAndPassword", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
    var user = result.user;
    res.status(200).send(user);
  }).catch(handlerError);
});

app.post("/signInWithFacebook", function (req, res) {
  var access_token = req.body.access_token;
  var credential = firebase.auth.FacebookAuthProvider.credential(access_token);
  firebase.auth().signInWithCredential(credential).then(result => {
    var user = result.user;
    res.status(200).send(user);
  }).catch(handlerError);
});

app.post("/signInWithGithub", function (req, res) {
  var access_token = req.body.access_token;
  var credential = firebase.auth.GithubAuthProvider.credential(access_token);
  firebase.auth().signInWithCredential(credential).then(result => {
    var user = result.user;
    res.status(200).send(user);
  }).catch(handlerError);
});

app.post("/signInWithGoogle", function (req, res) {
  var id_token = req.body.id_token;
  var access_token = req.body.access_token;
  var credential = firebase.auth.GoogleAuthProvider.credential(id_token, access_token);
  firebase.auth().signInWithCredential(credential).then(result => {
    var user = result.user;
    res.status(200).send(user);
  }).catch(handlerError);
});

app.post("/signInWithTwitter", function (req, res) {
  var access_token = req.body.access_token;
  var secret = req.body.secret;
  var credential = firebase.auth.TwitterAuthProvider.credential(access_token, secret);
  firebase.auth().signInWithCredential(credential).then(result => {
    var user = result.user;
    res.status(200).send(user);
  }).catch(handlerError);
});

app.post("/signInAnonymously", function (req, res) {
  firebase.auth().signInAnonymously().then(result => {
    var user = result.user;
    res.status(200).send(user);
  }).catch(handlerError);
});

httpServer.listen(port, function () {
  console.log('Parse server running on port ' + port + '.');
});