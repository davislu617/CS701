var MongoClient = require('mongodb').MongoClient;
var credentials = require("../credentials.js");

var dbUrl = 'mongodb://' + credentials.host + ':' + credentials.mongoDbPort +'/' + credentials.mongoDbDatabase;

module.exports = 
	function (req , res , next){
        // normalize the inputs from the user
        var qusername = req.query.username;
        var qpassword = req.query.password;

        var newData = { username: qusername, password: qpassword};
        console.log(newData);

        MongoClient.connect(dbUrl, function(err,db){
            if (err) throw err;
            
            var collection = db.collection('account');
            collection.find(newData).toArray(
                function(err, docs){
                    console.log("Login request received!")
                    if (docs[0]){
                        console.log(docs[0]._id)
                        res.jsonp({"isValid":true, "ID":docs[0]._id});
                    }else{
                        res.jsonp(false);
                    }
                    
                }
            );
        });
    }