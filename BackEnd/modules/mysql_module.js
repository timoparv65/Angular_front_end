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
                //Create a token
                var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
                res.send(200,{status:'Ok',secret:token});
            }else{
                res.send(401,{status:'Wrong username or password'});
            }
        }
       
    });
}