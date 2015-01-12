/*
 Infratus: openvpn status window
*/

Template.ovpn_client_hist.helpers({
	
	ovpn_common_name: function(){
		return Session.get("ovpn_common_name");
	},
		
	clientsHist: function(){
		return collOvpnClientsHistory.find( {common_name:Session.get("ovpn_common_name")});
	},
	
	totalBytes: function(){
		return collOvpnClients.findOne({common_name: Session.get("ovpn_common_name") }, {fields: {bytes_sent:1, bytes_received:1}} );
	},

});