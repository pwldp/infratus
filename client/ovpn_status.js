/*
 Infratus: openvpn status window
*/

Template.ovpn_status.helpers({
	
	lastUpdate: function(){
		
		res = collOvpnCurrentStatus.findOne({});
		//console.log(EJSON.stringify(res));
		
		if (res) return res.last_updated
		else return null;
	},
	
	clientList: function(){
		res = collOvpnCurrentStatus.findOne({});
		if (res) return res.client_list;
		else return null;
	},
	
});