var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../index');


//Define connection attributes for mysql server
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'friends_schema'
});

//Connect to mysql server with given connection attributes
connection.connect(function(err){
    
    if(err){
        
        console.log('Could not connect to mysql server: ' + err.message);
    } else {
        
        console.log('Connected to mysql server: database friends_schama');
    }
});

//Call this function to check username and password from mysql database
exports.loginMysql = function(req,res){
    
    connection.query('SELECT * FROM user WHERE username=? AND pass=?', [req.body.username,req.body.password],function(error,results,fields){
        
        console.log(error);
        console.log(results);
        console.log(fields);
    });
}

exports.loginMysqlProc = function(req,res){
    
    connection.query('CALL getLoginInfo(?,?)',[req.body.username,req.body.password],
                    function(error,results,fields){
        
        if(error){
            
            res.send(502,{status:err.message});
        }else{
            
            var test = results[0]; // taulukon sisällä taulukko
            if(test.length > 0){
                req.session.kayttaja =test[0].username;
                req.session.user_id = test[0].user_id; // 12.1.2016 talletetaan käyttäjän ID
                //Create a token
                var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
                res.send(200,{status:'Ok',secret:token});
            }else{
                res.send(401,{status:'Wrong username or password'});
            }
        }
       
    });
}

// 12.1.2016
exports.getFriendsForUserByUsername = function(req,res){
    
    connection.query('CALL getUserFriendsByName(?)',
                     [req.session.kayttaja],
                     function(error,results,fields){
        
        console.log(results);
        
        
        if(results.length > 0){
            
            var data = results[0];
            res.send(data);
        } else {
            res.redirect('/');
        }
        
    });
    
}

// 12.1.2016
exports.registerMysqlProc = function(req,res){
    
    connection.query('CALL setRegisterInfo(?,?)',
                     [req.body.username,req.body.password],
                    function(error,results,fields){
        
        if(error){
            
            res.send(500,{status:error.message});
        }else{
            
            res.send(200,{status:'Ok'});
        }
    });
    
}

// 12.1.2016
exports.addNewFriend = function(req,res){
    
    connection.query('CALL addNewFriend(?,?,?,?)',
                    [req.body.name,req.body.address,req.body.age,req.session.user_id],
                    function(error,results,fields){
        
        if(error){
                //500 = Internal Server Error
                res.status(500).json({message:'Fail'});
        }else{
                //200 = ok
                res.status(200).json({data:results});
        }
        
    });
}

// 12.1.2016
exports.updateFriend = function(req,res){
    
    connection.query('CALL updateFriend(?,?,?,?)',
                    [req.body.id,req.body.name,req.body.address,req.body.age],
                    function(error,results,fields){
        
        if(error){
            //500 = Internal Server Error
            res.status(500).json({message:error.message});
        }else{
            //200 = ok
            res.status(200).json({message:"Data updated"});
        }
    });
}
