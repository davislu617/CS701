var MongoClient = require('mongodb').MongoClient;
var credentials = require("../credentials.js");
var {ObjectId} = require('mongodb'); 

var dbUrl = 'mongodb://' + credentials.host + ':' + credentials.mongoDbPort +'/' + credentials.mongoDbDatabase;

module.exports = 
	function (req , res , next){
        // normalize the inputs from the user
        var id = req.query.id;
        var plan = req.query.plan;
        var action = req.query.action;
        var newData = { userID: id, plan: plan};

        MongoClient.connect(dbUrl, function(err,db){
            if (err) throw err;
            
            var collection = db.collection('plan');

            if(action == 'update'){
                console.log('Update request received!');
                console.log({_id:ObjectId(id)}, action);
                console.log({plan: plan});
                collection.update({_id:ObjectId(id)}, {$set: {plan: plan}}, 
                                        function(err, docs){
                    if(err){
                        console.error(err);
                    }else{
                        res.jsonp(docs.result);
                        console.log(docs.result);
                    }
                })
            }else{
                console.log('Store request received!');
                collection.insert(newData, function(err, docs){
                    if(err){
                        console.error(err);
                    }else{
                        res.jsonp(docs);
                        console.log(docs);
                    }
                })
            }
            
        });
    }