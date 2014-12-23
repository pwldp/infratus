/*
Collection: nodes
*/
collNodes = new Mongo.Collection("nodes");
//
var fixture_nodes = [
{
	"name": "www_onet_pl",
	"title": "ONET",
	"descr": "",
	"type": "www",
	"host": "www.onet.pl",
	"check_type": "",
	"last_check_dt": "",
	"last_check_res": "",
	"parents": [
		"internet_poland"
	],
	"services": [
		{
		"enable": 1,
		"type": "http",
		"params": [
			
		],
		"last_check_dt": "",
		"last_check_res": ""
		}
	]
},
{
	"name": "www_wp_pl",
	"title": "Wirtualna Polska",
	"descr": "",
	"type": "www",
	"host": "www.wp.pl",
	"check_type": "",
	"last_check_dt": "",
	"last_check_res": "",
	"parents": [
		"internet_poland"
	],
	"services": [
		{
		"enable": 1,
		"type": "http",
		"params": [
			
		],
		"last_check_dt": "",
		"last_check_res": ""
		}
	]
},
{
	"name": "www_google_com",
	"title": "Google",
	"descr": "",
	"type": "www",
	"host": "www.google.com",
	"check_type": "",
	"last_check_dt": "",
	"last_check_res": "",
	"parents": [
		"internet_global"
	],
	"services": [
		{
		"enable": 1,
		"type": "http",
		"params": [
			
		],
		"last_check_dt": "",
		"last_check_res": ""
		}
	]
},
{
	"name": "www_facebook_com",
	"title": "Facebook",
	"descr": "",
	"type": "www",
	"host": "www.facebook.com",
	"check_type": "",
	"last_check_dt": "",
	"last_check_res": "",
	"parents": [
		"internet_global"
	],
	"services": [
		{
		"enable": 1,
		"type": "http",
		"params": [
			
		],
		"last_check_dt": "",
		"last_check_res": ""
		}
	]
},
]
//
if (Meteor.isServer){
	
	Meteor.startup(function () {
		
		if (collNodes.find().count() !== fixture_nodes.length ) {
			collNodes.remove({});
			console.log("INSERT TO nodes...");
			fixture_nodes.forEach(function(fixture){
				collNodes.insert( fixture );
			})
		};
		
		Meteor.publish("nodes", function(){
			return collNodes.find({});
		});
		
		console.log("collNodes.count=",+collNodes.find().count());
	});

};
//
if (Meteor.isClient){
	Meteor.subscribe('nodes');
};
/*
EOF
*/