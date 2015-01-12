Template.left_side_menu.events({
	"click": function(event){
		//console.log("click.event: "+event.target);
		var target = String(event.target).split("\/")[3]
		//console.log("click: "+target);
		//
		/*
		//if (target === 'ovpnDropdown'){
			if ( $("#ovpnDropdown").hasClass("open") ) $("#ovpnDropdown").removeClass( "open" )
			else $("#ovpnDropdown").addClass( "open" );
		//};
		*/
		//
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