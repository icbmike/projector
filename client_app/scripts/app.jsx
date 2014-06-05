/** @jsx React.DOM */

var React = require('react');

//Components
var LoginComponent = require('./components/login.jsx');
var MainWindow = require('./components/mainWindow.jsx');

//Services
var ApiService = require('./services/apiService.js');

var AppComponent = React.createClass({

	//propTypes
	propTypes: {
		apiService: React.PropTypes.instanceOf(ApiService).isRequired
	},

	loginHandler: function(){
		this.forceUpdate();
	},

	//Render method
	render: function () {
		return (
			<main>
				{
					this.props.apiService.isAuthenticated()
					? <MainWindow apiService={this.props.apiService} />
					: <LoginComponent loginSuccessHandler={this.loginHandler} apiService={this.props.apiService} ref="loginComponent" />
				}
				<div id="modalAnchor"></div>
			</main>
		);
	}
});

var apiService = new ApiService();

//We'll use the main element as our root container
React.renderComponent(
	<AppComponent apiService={apiService}/>,
	document.getElementsByTagName("body")[0]
);
