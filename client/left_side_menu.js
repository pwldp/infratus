Template.left_side_menu.events({
	"click": function(event){
		
		var target = String(event.target).split("\/")[3]
		//console.log("click: "+target);
		
		$( "ul.nav-stacked > li" ).each(function( index ) {
			//console.log( index + ": " + $( this ).text() );
			if ( ! $(this).hasClass("disabled") ){
				$(this).removeClass( "active" );
				var href = $(this).find("a").attr("href").replace("/","");
				//console.log( "href:"+href );
				if (href===target){
					$(this).addClass( "active" );
				};
			//} else {
			//	event.preventDefault();
			};
		});
		/*
		event.preventDefault();
		if ( ! $(this).hasClass("disabled") ){
			Router.go(target);
		};
		*/
		/*
		if ( $(this).hasClass("disabled") ){
			event.preventDefault();
		};
		*/
	}
});