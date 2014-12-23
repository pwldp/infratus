/*
host_checker.js

https://atmospherejs.com/particle4dev/meteor-cron2

*/
//
appEE = new (Npm.require('events').EventEmitter);
//
var checkHost = function( args ){
	
};
//
var i = 0;
var c = CRON.createNewCronJob('5 * * * * *', function () {
//     i++;
//     console.log('You will see this message ' + i + ' second');
	appEE.emit('checkCronEvent', {"dt": moment().format('YYYY-MM-DD HH:mm:ss') });
	//
	collNodes.find({}).forEach(function(host){
		Meteor._debug("Sending "+host.host+" to check:");
		host.services.forEach(function(service){
			if (service.enable && service .type!=='icmp' ){
				Meteor._debug("---> service type: "+service.type);
				appEE.emit("checkHostService", {"host":host.host, "type":service.type});
			};
		});
	});
	//
}, 'America/Los_Angeles');
// on stop
c.onStop(function () {
    console.log('stop');
});
c.run();


//
appEE.on("checkCronEvent", function(event){
	Meteor._debug("checkCronEvent received at "+event.dt);
});
//
appEE.on("checkHostService", 
	Meteor.bindEnvironment(function(event) {
		Meteor._debug("checkHostService received "+EJSON.stringify(event) );
		var url;
		var res = {statusCode: 666};
		var ret = 'unknown';
		//
		if (event.type === 'http'){
			url = "http://"+event.host;
			try {
				res = HTTP.get(url);
			} catch (exc){
				Meteor._debug("checkHostService HTTP exception: "+exc);
			};
		} else if (event.type === 'https'){
			url = "https://"+event.host;
			try {
				res = HTTP.get(url);
			} catch (exc){
				Meteor._debug("checkHostService HTTPS exception: "+exc);
			};
		} else {
			res.statusCode = 666;
		};
		//
		
		//
		Meteor._debug("checkHostService res:", res.statusCode);
		//
		if (res.statusCode === 200 ){
			ret = 'OK';
		} else {
			ret = 'ERROR';
		};
		Meteor._debug("checkHostService ret:", ret);
		//
		appEE.emit("updateHostService", {host: event.host, type:event.type, res: ret});
		//
	}, function(exc){
		Meteor._debug("Exception from checkHostService:", exc);
	})
);
//
appEE.on("updateHostService", 
	Meteor.bindEnvironment(function(event) {
		Meteor._debug("updateHostService received "+EJSON.stringify(event) );
		collNodes.update(
			{host: event.host, "services.type": event.type},
			{$set:{
				"services.$.last_check_dt": moment().format('YYYY-MM-DD HH:mm:ss'),
				"services.$.last_check_res": event.res
			}}
		);
		//
		appEE.emit("updateGlobalStats", {"host":event.host, "res":event.res});
		//
	}, function(exc){
		Meteor._debug("Exception from checkHostUpdate:", exc);
	})
);
//
appEE.on("updateGlobalStats", 
	Meteor.bindEnvironment(function(event) {
		Meteor._debug("updateGlobalStats:", event);
		//
		var incOk = 0;
		var incError = 0;
		if (event.res=="OK") incOk = 1;
		if (event.res=="ERROR") incError = 1;
						   //
		collGlobalStats.update(
			{},
			{
				$set:{"run_last_dt": moment().format('YYYY-MM-DD HH:mm:ss'), "run_last_ts":moment().valueOf() },
				$inc:{"tests.total":1, "tests.ok":incOk, "tests.error":incError}
			}
		);
		//
	}, function(exc){
		Meteor._debug("Exception from updateGlobalStats: ", exc);
	})
);
//