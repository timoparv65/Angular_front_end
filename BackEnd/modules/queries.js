var db = require('./database');
// lisätty 5.1.2016
var jwt = require('jsonwebtoken');
var server = require('../index');

/**
  *This function saves new person information to our person
  *collection
  */
exports.saveNewPerson = function(req,res){
    
    var personTemp = new db.Person(req.body);
    //Save it to database
    personTemp.save(function(err,newData){// newData tulee tietokannasta, eli mitä talletettiin sinne
        
        db.Friends.update({username:req.session.kayttaja},
                          {$push:{'friends':personTemp._id}},
                          function(err,model){
            
            //console.log("SEND REDIRECT!!!!!");
            //Make a redirect to root context
            //res.redirect(301,'/persons.html');
            if(err){
                //500 = Internal Server Error
                res.status(500).json({message:'Fail'});
            }else{
                //200 = ok
                res.status(200).json({data:newData});
            }
        });
     
    });
}

//This function deletes a group of persons from our collection
exports.deletePerson = function(req,res){
    
    // tuhottavat Person objektit
    var toDelete = [];
    
    //Jos req.query.forDelete on jo Array, voit kopioida Array -> Array
    if(req.query.forDelete instanceof Array)
        
        toDelete = req.query.forDelete;
    else{ // muuten työnnä elementit Arrayhyn
        
       toDelete.push(req.query.forDelete); 
    }
    
    console.log(toDelete);
    
    // $in Matches any of the values specified in an array. 
    db.Person.remove({_id:{$in:toDelete}},function(err){
        
        if(err){
            res.send(err.message);
        }
        else{
            //If succesfully removed remome also reference from User collection.
            // $pull = Removes all array elements that match a specified query. 
            db.Friends.update({username:req.session.kayttaja},{$pull:{'friends':{$in:toDelete}}},function(err,data){
                if(err){
                    //console.log(err);
                    //500 = Internal Server Error
                    res.status(500).send({messsage:err.message});
                }else{
                    //200 = ok
                    res.status(200).send({message:'Delete success'});
                }
            });
            
        }
        
    });
}

//This method updates one person info
exports.updatePerson = function(req,res){
    
    var updateData = {
        name:req.body.name,
        address:req.body.address,
        age:req.body.age
    }
    
    db.Person.update({_id:req.body.id},updateData,function(err){
        
        if(err){
            //500 = Internal Server Error
            res.status(500).json({message:err.message});
        }else{
            //200 = ok
            res.status(200).json({message:"Data updated"});
        }
    });
}

/**
  *This function seraches database by name or 
  *by begin letters of name
  */
exports.findPersonsByName = function(req,res){
    
    var name = req.query.name;
    db.Friends.findOne({username:req.session.kayttaja}).
        populate({path:'friends',match:{name:{'$regex':'^' + name,'$options':'i'}}}).
            exec(function(err,data){
        
        if(data){
            res.send(data.friends);
        }else{
            res.redirect('/');
        }
        
    });
    
}

exports.registerFriend = function(req,res){
    
    var friend = new db.Friends(req.body);
    friend.save(function(err){
        
        if(err){
             // 500 = error. Angularin $resource:n $promise-objekti vaatii statuksen
            res.status(500).send({status:err.message});
        }
        else{
            res.status(200).send({status:"Ok"}); // 200 = ok
        }
    });
}

exports.loginFriend = function(req,res){
    
    var searchObject = {
        username:req.body.username,
        password:req.body.password
    }

    // findOne palauttaa vain yhden objektin
    db.Friends.findOne(searchObject,function(err,data){
        
        if(err){
            
            res.send(502,{status:err.message}); // 502 = HTTP status koodi. 502 = serverissä sisäinen virhe
            
        }else{
            console.log(data);
            //=< 0 means wrong username or password
            //if(data.length > 0){
            if(data){
                req.session.kayttaja = data.username; // talletetaan sessioon käyttäjänimi.
                // lisätty 5.1.2016
                // Create the token
                var token = jwt.sign(data,server.secret,{expiresIn:'2h'});
                res.send(200,{status:"Ok",secret:token}); // token palautettava responsessa
            }
            else{
                res.send(401,{status:"Wrong username or password"});
            }
            
        }
    });
}

exports.getFriendsByUsername = function(req,res){
    
    db.Friends.findOne({username:req.session.kayttaja}). // luetaan tieto sessiosta (serveripäästä)
        populate('friends').exec(function(err,data){
            
            if(data){
                res.send(data.friends);    
            } else {
                res.redirect('/');
            }
        
        });
}




