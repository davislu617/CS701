var MongoClient = require('mongodb').MongoClient;
var credentials = require("../credentials.js");

var dbUrl = 'mongodb://' + credentials.host + ':' + credentials.mongoDbPort +'/' + credentials.mongoDbDatabase;

module.exports = 
	function (req , res , next){
        // normalize the inputs from the user
        var id = req.query.id;

        var newData = { userID: id };
        console.log("GetPlan request received!")

        MongoClient.connect(dbUrl, function(err,db){
            if (err) throw err;
            
            var collection = db.collection('plan');
            collection.find(newData).toArray(
                function(err, docs){
                    console.log("GetPlan request received!")
                    if (docs[0]){
                        console.log(docs)
                        res.jsonp(docs);
                    }else{
                        res.jsonp(false);
                    }
                    
                }
            );
        });
    }