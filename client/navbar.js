Template.navbar.events({
	"click": function(event){
		event.preventDefault();
		//event.stopPropagation();
		var target = String(event.target).split("#")[1]
		//console.log("click: "+target);
		if (target==="login"){
			Meteor.loginWithPassword("demo","demo");
		} else if (target==="logout"){
			Meteor.logout()
		};
	}
});