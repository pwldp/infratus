/*
Collection: check_res
*/

collCheckRes = new Mongo.Collection("check_res");
//
if (Meteor.isServer){
	
	console.log("collCheckRes count=" + collCheckRes.find().count());
	
	Meteor.publish("check_res"), function(){
		return collCheckRes.find({});
	};
};
//
if (Meteor.isClient){
	Meteor.subscribe('check_res');
};
/*
EOF
*/