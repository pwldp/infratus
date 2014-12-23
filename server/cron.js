/*
Obsluga cron

https://atmospherejs.com/percolatestudio/synced-cron
http://bunkat.github.io/later/parsers.html#overview
*/


//appEE = new (Npm.require('events').EventEmitter);

//var ping = Npm.require('net-ping');
//var session = ping.createSession();
//
/*
SyncedCron.add({
	name: 'Run ICMP ping',
	schedule: function(parser) {
		//return parser.text('every 15 seconds');
		return parser.text('every 5 minutes');
	}, 
	job: function() {
		console.log("ICMP ping job")
		//
		//var ipList = ['10.89.4.194','10.89.1.52','10.89.17.50'];
		var ipList = [];
		// przygotowuje liste IP do skanowania
		var hostList = collToCheck.find();
		hostList.forEach(function(host){
			console.log("==>> ",host.title, host.group);
			host.scans.forEach(function(scan){
				console.log("  scan:", scan.host, scan.scan.type);
				ipList.push({
					host: scan.host,
					type: scan.scan.type
				});
			});
		});
		// wysylam do skanowania
		ipList.forEach(function(ip){
			console.log("Send IP to check:"+ip);
			appEE.emit('checkHost', {"host":ip.host, "type": ip.type})
		});
		return "OK";
	}
});
*/
function getIP(){
	//var url = "http://www.telize.com/geoip";
	var url = 'http://api.ipify.org?format=json';
	ret = HTTP.get(url);
	console.log('IP:'+JSON.stringify(JSON.parse(ret.content)));
};
getIP();

/*
if (Meteor.isServer) {
	Meteor.startup(function () {
		
		
		
		SyncedCron.start();
		
		appEE.emit('checkHost', {"host":"10.89.1.52", "type":"ICMP"})
		
	});
}
*/


function checkHost_HTTP(ip){
	
};

/*
appEE.on('checkHost', Meteor.bindEnvironment(function(e){

			var toSave = {
			"dt": moment().format('YYYY-MM-DD HH:mm:ss'),
			"host": e.host,
			"type": e.type,
			"res": "unknown",
		};
		console.log(JSON.stringify(toSave))
		
	session.pingHost (e.host, function (error, target) {

		if (error) {
			toSave.res = 'ERROR';
			console.log (e.host + ": " + error.toString ());
		} else {
			toSave.res = 'OK';
			Meteor._debug("__checkHost:" +e.host + ": Alive");
		};
		//console.log(JSON.stringify(toSave))
		appEE.emit("hostStatus", toSave)
	});
}, function(e) {
	Meteor._debug("Exception from checkHost:", e);
}));
*/
//
// appEE.on("updateGlobalStats", 
// 	Meteor.bindEnvironment(function(e) {
// 		Meteor._debug("updateGlobalStats:", e);
// 		/*
// 		collCheckRes.insert(e, function(err,res){
// 			if (err){
// 				Meteor._debug("__saveStatus ERROR:", err);	
// 			} else {
// 				Meteor._debug("__saveStatus OK:", res);	
// 			};
// 		});
// 		*/
// 		//
// 		var incOk = 0;
// 		var incError = 0;
// 		if (e.res=="OK") incOk = 1;
// 		if (e.res=="ERROR") incError = 1;
// 		collGlobalStats.update(
// 			{},
// 			{
// 				$set:{"run_last_dt": moment().format('YYYY-MM-DD HH:mm:ss'), "run_last_ts":moment().valueOf() },
// 				$inc:{"tests.total":1, "tests.ok":incOk, "tests.error":incError}
// 			}
// 		);
// 		//
// 	}, function(exc){
// 		Meteor._debug("Exception from hostStatus:", exc);
// 	})
// );

//
/*
appEE.on("hostStatus", 
	Meteor.bindEnvironment(function(e) {
		Meteor._debug("hostStatus:", e);
		collCheckRes.insert(e, function(err,res){
			if (err){
				Meteor._debug("__saveStatus ERROR:", err);	
			} else {
				Meteor._debug("__saveStatus OK:", res);	
			};
		});
		//
		
		collNodes.update(
			{host:"10.89.17.52","services.type":"icmp"},
			{$set:{"services.$.last_check_dt": moment().format('YYYY-MM-DD HH:mm:ss') }}
		);
	}, function(exc){
		Meteor._debug("Exception from hostStatus:", exc);
	})
);
*/
/*
EOF
*/
