/*
Collection: services_defs
*/
collServicesDefs = new Mongo.Collection("services_defs");
//
var fixtures_services = [
	{
		"name": "http",
		"title": "Service HTTP",
		"params":{
			"port": 80,
			"user": "",
			"password": ""
		}
	}
	,{
		"name": "https",
		"title": "Service HTTPS",
		"params":{
			"port": 443,
			"user": "",
			"password": ""
		}
	}
	/*
	,{
		"name": "ftp",
		"title": "Servcie FTP",
		"params":{
			"port": 21,
			"user": "",
			"password": ""
		}
	}
	*/
]
//
if (Meteor.isServer){
	Meteor.startup(function () {
		//
		if (collServicesDefs.find().count() !== fixtures_services.length) {
			console.log("REMOVE all data from collServicesDefs...");
			collServicesDefs.remove({});
			console.log("INSERT TO collServicesDefs...");
			fixtures_services.forEach(function(item){
				Meteor._debug("Add service definition: "+item.name);
				collServicesDefs.insert( item );
			});
		}
		//
		Meteor.publish("services_defs", function(){
			return collServicesDefs.find({});
		});
		//
		console.log("collServicesDefs.count=",+collServicesDefs.find().count());
	});
};
//
if (Meteor.isClient){
	Meteor.subscribe('services_defs');
};
/*
EOF
*/