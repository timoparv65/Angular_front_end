var express = require("express");
var path = require("path");
var https = require('https'); // lisätty 5.1.2016
var fs = require('fs'); // fs = file system. Lisätty 5.1.2016
var bodyParser = require("body-parser");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person'); 
var user = require('./modules/user');

// lisätty 5.1.2016
var options = {
    
    key:fs.readFileSync('server.key'),
    cert:fs.readFileSync('server.crt'),
    requestCert:false,
    rejectUnauthorized:false
}


// This is used for creating a secret key value
var uuid = require('uuid'); // salausavainta varten
// This is used to create a session object for client
var session = require('express-session');

var app = express();

// lisätty 5.1.2016
//You need to define these two variables with these
//two environment variables to get you app work in openshift
// OPENSHIFT_NODEJS_PORT ja OPENSHIFT_NODEJS_IP jos ajetaan OpenShiftissä
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

//=====================Middlewares========================

// luo session ja cookien
app.use(session({
    secret:uuid.v1(),
    cookie:{maxAge:600000} // kuinka kauan cookie on valid => 600'000 ms
    // maxAge voi olla myös 'null', jolloin sessio lopetetaan kun selain suljetaan,
    // muutoin sessio jää elämään
}));

//Bodyparser json() middleware parses the json object
//from HTTP POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(function(req,res,next){
    
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(req.body);
    console.log(req.session);
    //console.log(database.Person);
    //database.myFunction();
    //Send request forward in stack
    next();
});

// Define middlewares for our static files (.html, .css, .js files that are loaded
// by browser when parsing index.html file)
app.use('/',express.static(path.join(__dirname, '../FrontEnd/views'))); // hakee oletusarvoisesti index.html:än
app.use('/FrontEnd/css',express.static(path.join(__dirname, '../FrontEnd/css')));
app.use('/FrontEnd/lib',express.static(path.join(__dirname, '../FrontEnd/lib')));
app.use('/FrontEnd/module',express.static(path.join(__dirname, '../FrontEnd/module')));
app.use('/FrontEnd/controllers',express.static(path.join(__dirname, '../FrontEnd/controllers')));
app.use('/FrontEnd/factories',express.static(path.join(__dirname, '../FrontEnd/factories')));


//=====================OUR REST API MIDDLEWARES============================
app.use('/persons',person);
app.use('/friends',user);

//=====================ROUTERS============================

// tuhoaa session kun logataan ulos
app.get('/logout', function(req,res){
    // destroy poistaa kaikki session muuttajaan liittyvät muuttujat
    req.session.destroy();
    //voi tuhota pelkästään käyttäjän
    //req.session.kayttaja = null;
    res.redirect('/');
});

// 4.1.2016
// this router checks if client is logged in or not
app.get('/isLogged',function(req,res){
    
    // User is logged in if session contains kayttaja attribute
    if(req.session.kayttaja){
        // palauttaa send:illä json-objektin arrayna. mainModule:ssa loginRequired
        // $resource('/isLogged').query()...query vaatii arrayn
        res.status(200).send([{status:'Ok'}]);
    }
    else{
        res.status(401).send([{status:'Unauthorized'}]);
    }
});

// lisätty 5.1.2016
https.createServer(options, app).listen(app.get('port') ,app.get('ip'), function () {
    console.log("Express server started ");
});
