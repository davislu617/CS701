var MongoClient = require('mongodb').MongoClient;
var credentials = require("../credentials.js");

var dbUrl = 'mongodb://' + credentials.host + ':' + credentials.mongoDbPort +'/' + credentials.mongoDbDatabase;

module.exports = 
	function (req , res , next){
        // normalize the inputs from the user
        var username = req.query.username;
        var password = req.query.password;
        var email = req.query.email;

        var newData = { username: username, password: password, email: email};
        console.log(newData);

        MongoClient.connect(dbUrl, function(err,db){
            if (err) throw err;
            
            var collection = db.collection('account');
            collection.insert(newData, function(err, docs){
                if(err){
                    console.error(err);
                }else{
                    res.jsonp(docs);
                    console.log(docs);
                }
            })
        });
    }