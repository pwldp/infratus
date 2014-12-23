/*
Collection: nodes_groups
*/
collNodesGroups = new Mongo.Collection("nodes_groups");
//
var fixture_nodes_groups = [
	{
		"name": "internet",
		"title": "Internet",
		"childs": [],
		"parents": []
	},
	{
		"name": "internet_global",
		"title": "Global Internet",
		"childs": [],
		"parents": ["internet"]
	},
	{
		"name": "internet_poland",
		"title": "Poland",
		"childs": [],
		"parents": ["internet"]
	}
];
//
if (Meteor.isServer){
Meteor.startup(function () {

    if (collNodesGroups.find().count() !== fixture_nodes_groups.length ) {
		collNodesGroups.remove({});
		console.log("INSERT TO nodes groups...");
		fixture_nodes_groups.forEach(function(fixture){
			collNodesGroups.insert( fixture );
		})
		
    }

    Meteor.publish("nodes_groups", function(){
		return collNodesGroups.find({});
	});
	
	console.log("collNodesGroups.count=",+collNodesGroups.find().count());
});

};
//
if (Meteor.isClient){
	Meteor.subscribe('nodes_groups');
};
/*
EOF
*/