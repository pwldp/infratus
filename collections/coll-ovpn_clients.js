/*
Collection: ovpn_clients
*/
collOvpnClients = new Mongo.Collection("ovpn_clients");
//
if (Meteor.isServer){
	Meteor.startup(function () {
		//
		Meteor.publish("ovpn_clients", function(){
			return collOvpnClients.find({});
		});
		//
		console.log("collOvpnClients.count=",+collOvpnClients.find().count());
	});
};
//
if (Meteor.isClient){
	Meteor.subscribe('ovpn_clients');
};
/*
EOF
*/