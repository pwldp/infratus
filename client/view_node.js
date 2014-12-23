Template.view_node.helpers({
	allNodesList: function(){
		return collNodes.find( {} );
	},
	nodeInfo: function(){
		/*
		var ret = collNodes.find();
		//Meteor._debug("Node:"+ret.host)
		
		*/
		var ret = collNodes.findOne( {"host":"10.89.17.52"} );
		//var ret = collNodes.find( {} );
		//console.log("Node:"+EJSON.stringify(ret));
		return ret;
		/*
		ret = "Node info"
		return ret;
		*/
	},
	
	toCheck: function(){
		//console.log("ToCheck:"+EJSON.stringify( collToCheck.find({}) ));
		return collToCheck.find({});
	}
});
	
	
	