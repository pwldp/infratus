Template.global_stats_bar.helpers({
	globalStats: function(){
		return collGlobalStats.findOne({});
	},
	nodesStats: function(){
		return collNodes.find();
	},
	serverUptime: function(){
		return Session.get("serverUptime");
	}
});

// https://10.89.0.11/wsdl?wsdl