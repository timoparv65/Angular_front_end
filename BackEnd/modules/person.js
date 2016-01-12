var express = require("express");
var query = require('./queries');
var mysql = require('./mysql_module'); // lisätty 12.1.2016

var router = express.Router();

//Handle GET requets for /persons context
router.get('/',function(req,res){
    
    query.getAllPersons(req,res);
});

// Handle GET requests for /persons/search context
router.get('/search',function(req,res){
    
    query.findPersonsByName(req,res);
});

//Handle POST requets for /persons context
router.post('/',function(req,res){
    
    //query.saveNewPerson(req,res);
    mysql.addNewFriend(req,res); // lisätty 12.1.2016
});

//Handle PUT requets for /persons context
router.put('/',function(req,res){
    
    //query.updatePerson(req,res);
    mysql.updateFriend(req,res); // lisätty 12.1.2016
});

//Handle DELETE requets for /persons context
router.delete('/',function(req,res){
    
    query.deletePerson(req,res);
});

module.exports = router;