# micro-firebase-auth-server

The reason that I have made it is Firebase for Unity authentication does not supported for real data on editor (And standalone build), but I want to test it on editor so I decided to create this service to test, at client side I have to create wrapper to connect with this service I will update later when it is available.

## Services

* **createUserWithEmailAndPassword** (POST): email(string), password(string)
* **signInWithEmailAndPassword** (POST): email(string), password(string)
* **signInWithFacebook** (POST): access_token(string)
* **signInWithGithub** (POST): access_token(string)
* **signInWithGoogle** (POST): id_token(string), access_token(string)
* **signInWithTwitter** (POST): access_token(string), secret(string)
* **signInAnonymously** (POST)
