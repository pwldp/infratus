//console.log("process.env.MONGO_URL="+process.env.MONGO_URL);

//console.log("DEMOuser: "+ Meteor.users.findOne({"username":"demo"}) );

if (Meteor.isServer){
	
	if ( ! Meteor.users.findOne({"username":"demo"}) ){
		console.log("Add demo user...");
		Accounts.createUser({username:"demo",password:"demo",email:"demo@domain.tld"});
	};

};