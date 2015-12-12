var express = require("express");
var db = require('./queries');

var router = express.Router();

//Handle GET requets for /persons context
router.get('/',function(req,res){
    
    db.getAllPersons(req,res);
});

// Handle GET requests for /persons/search context
router.get('/search',function(req,res){
    
    db.findPersonsByName(req,res);
});

//Handle POST requets for /persons context
router.post('/',function(req,res){
    
    db.saveNewPerson(req,res);
});

//Handle PUT requets for /persons context
router.put('/',function(req,res){
    
    db.updatePerson(req,res);
});

//Handle DELETE requets for /persons context
router.delete('/',function(req,res){
    
    db.deletePerson(req,res);
});

module.exports = router;