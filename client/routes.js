Blaze._allowJavascriptUrls();
 
Router.configure({
  layoutTemplate: 'application_layout',
  trackPageView: true
});


Router.route('/', function () {
  this.render('overview');
});

Router.route('/overview', function () {
  this.render('overview');
});

Router.route('/nodes', function () {
  this.render('nodes');
});

Router.route('/map', function () {
  this.render('map');
});

Router.route('/wifi', function () {
  this.render('wifi');
});

Router.route('/ovpnCurrentStatus', function () {
  this.render('ovpn_status');
});

Router.route('/ovpnClients', function () {
  this.render('ovpn_clients');
});

Router.route('/ovpnDropdown', function () {
  this.render('ovpn_status');
});
//
ctrl_ovpnClientHist = RouteController.extend({
	//Session.set("ovpn_common_name", cn);
	onBeforeAction: function() {
		console.log('app before hook!');
		this.next();
	},
	action: function(){
		this.render('ovpn_client_hist');
	}
});

Router.route('/ovpnClientHist/:cn', function(){
	//path: "/ovpnClientHist/:cn"//,
	//controller: 'ctrl_ovpnClientHist'
	Session.set("ovpn_common_name", this.params.cn);
	this.render('ovpn_client_hist', {cn: this.params.cn});
});
