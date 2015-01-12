/*
Collection: ovpn_clients_history
*/
collOvpnClientsHistory = new Mongo.Collection("ovpn_clients_history");
//
if (Meteor.isServer){
	Meteor.startup(function () {
		//
		Meteor.publish("ovpn_clients_history", function(){
			return collOvpnClientsHistory.find({});
		});
		//
		console.log("collOvpnClientsHistory.count=",+collOvpnClientsHistory.find().count());
	});
};
//
if (Meteor.isClient){
	Meteor.subscribe('ovpn_clients_history');
};
/*
EOF
*/