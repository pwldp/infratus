/*
Collection: ovpn_current_status
*/
collOvpnCurrentStatus = new Mongo.Collection("ovpn_current_status");
//
if (Meteor.isServer){
	Meteor.startup(function () {
		
		//console.log("RESET data in collGlobalStats...");
		//collGlobalStats.remove({});
		//
		/*
		if (collGlobalStats.find().count() === 0) {
			console.log("INSERT TO collGlobalStats...");
			collGlobalStats.insert({
				"run_first_dt": moment().format('YYYY-MM-DD HH:mm:ss'),
				"run_first_ts": moment().valueOf(),
				"run_last_dt": moment().format('YYYY-MM-DD HH:mm:ss'),
				"run_last_ts": moment().valueOf(),
				"tests": {
					"total":0,
					"ok":0,
					"error":0,
					"warning":0
				}
			});
		}
		*/
		//
		Meteor.publish("ovpn_current_status", function(){
			return collOvpnCurrentStatus.find({});
		});
		//
		console.log("collOvpnCurrentStatus.count=",+collOvpnCurrentStatus.find().count());
	});
};
//
if (Meteor.isClient){
	Meteor.subscribe('ovpn_current_status');
};
/*
EOF
*/