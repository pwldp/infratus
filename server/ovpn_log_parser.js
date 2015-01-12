/*
Parse OpenVPN's server log file: openvpnserver.log
*/

fs = Npm.require('fs');
ovpnLogParser = Npm.require("ovpn-log-parser").parseOvpnLog;
appEE = new (Npm.require('events').EventEmitter);

var ovpnLogPath = "/home/appuser/infratus/ovpnupload/openvpnserver.log";

fs.watchFile(ovpnLogPath, 
	
	Meteor.bindEnvironment(function(curr, prev) {
		
		//console.log('WATCH the current mtime is: ' + curr.size);
		//console.log('WATCH the previous mtime was: ' + prev.size);
		
		Meteor._debug("update OVPN current status ");
		//
		var idList = [];
		collOvpnCurrentStatus.find({}).fetch().forEach(function(item){
			idList.push(item._id);
		});
		
		// insert new status
		var ovpnStatus = ovpnLogParser(ovpnLogPath);
		//console.log('ovpnStatus: '+EJSON.stringify(ovpnStatus));
		collOvpnCurrentStatus.insert( ovpnStatus );
		// remove old current statuses
		collOvpnCurrentStatus.remove( {_id: {$in: idList} } );
		//
		appEE.emit("ovpnCurrentStatusUpdated", {"status": ovpnStatus});
		//
	}, function(exc){
		Meteor._debug("Exception from update OVPN status:", exc);
	})
	
);
//
appEE.on("ovpnCurrentStatusUpdated", 
	Meteor.bindEnvironment(function(event) {
		Meteor._debug("ovpnCurrentStatusUpdated:", event);
		//
		var clu = {};
		event.status.client_list.forEach(function(client){
			console.log("UPDATE CLIENT: "+client.common_name);
			clu.common_name = client.common_name;
			clu.connected_since = client.connected_since;
			clu.connected_until = moment().format('YYYY-MM-DD HH:mm:ss');
			clu.bytes_sent = parseInt(client.bytes_sent, 10);
			clu.bytes_received = parseInt(client.bytes_received, 10);
			clu.real_address = client.real_address;
			Meteor._debug("CLU: "+ EJSON.stringify(clu) );
			//
			collOvpnClientsHistory.upsert(
				{
					common_name: client.common_name,
					connected_since: client.connected_since,
					real_address: client.real_address
				},
				{$set: clu}
			);
			//
			appEE.emit("ovpnClientUpdate", {"client": clu});
		});
		//
	}, function(exc){
		Meteor._debug("Exception from ovpnCurrentStatusUpdated: ", exc);
	})
);
//
appEE.on("ovpnClientUpdate", 
	Meteor.bindEnvironment(function(event) {
		Meteor._debug("ovpnClientUpdate:", event);
		//
		var pipeline = [
			{$match:{common_name: event.client.common_name }},
			{$group: {_id:"$common_name", bytes_sent: {$sum:"$bytes_sent"}, bytes_received: {$sum:"$bytes_received"}}}
		];
		var res = collOvpnClientsHistory.aggregate(pipeline);
		console.log("OVPN_CLIENT UPDATE: "+EJSON.stringify(res));
		//var bytes_sent = parseInt(res.bytes_sent, 10);
		//var bytes_received = parseInt(res.bytes_received, 10);
		//
		var cup = {
			bytes_sent: res[0].bytes_sent,
			bytes_received: res[0].bytes_received,
			common_name: event.client.common_name,
			last_seen: event.client.connected_until,
			last_real_address: event.client.real_address,
		};
		console.log("OVPN_CLIENT UPDATE: "+EJSON.stringify(cup));
		//
		collOvpnClients.upsert(
			{common_name: event.client.common_name},
			{$set: cup}
		);
		//
	}, function(exc){
		Meteor._debug("Exception from ovpnCurrentStatusUpdated: ", exc);
	})
);
/*
EOF
*/

