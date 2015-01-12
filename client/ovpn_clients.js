/*
 Infratus: openvpn status window
*/

Template.ovpn_clients.helpers({
	
	clientsList: function(){
		return collOvpnClients.find({});
	},
	
});