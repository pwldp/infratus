/*
EOF
*/
Meteor.startup(function () {
	console.log("serverUptime...");
	Session.set("serverUptime", 0);
});
//
//check server uptime every 1 second
Meteor.setInterval(function(){
	var ret = collGlobalStats.findOne();
	var duration = moment.duration( (moment().valueOf() - ret.run_first_ts) / 1000, "seconds").format("d[d] h:mm:ss");
	Session.set("serverUptime", duration);
}, 999);
/*
EOF
*/