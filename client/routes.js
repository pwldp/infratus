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

Router.route('/openvpn', function () {
  this.render('openvpn');
});
