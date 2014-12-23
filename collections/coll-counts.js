/*
Collection: nodes
*/

if (Meteor.isServer){
	Meteor.startup(function () {
	
		Meteor.publish('publication', function() {
			Counts.publish(this, 'counter_nodes', collNodes.find() );
		});

	});

};
//
if (Meteor.isClient){
	
	Meteor.startup(function () {
		
		Meteor.subscribe('publication');
	
		
		//console.log("counter_nodes: "+Counts.get('counter_nodes') );
	});
	
	
	
};




/*
EOF
*/