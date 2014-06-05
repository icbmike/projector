/** @jsx React.DOM */

var React = require('react');
var ApiService = require('../services/apiService.js');

module.exports = React.createClass({
	
	//propTypes
	propTypes: {
		loginSuccessHandler : React.PropTypes.func,
		apiService: React.PropTypes.instanceOf(ApiService).isRequired
	},

	//Setup
	getInitialState: function (){

		return {
			username: "",
			password: "",
			error: null
		}
	},

	componentDidMount: function(){
		this.refs.username.getDOMNode().focus();
	},

	_toggleButtons: function(enabled){
		if(enabled){
			//enable the buttons
			this.refs.loginButton.getDOMNode().removeAttribute("disabled");
			this.refs.registerButton.getDOMNode().removeAttribute("disabled");
		}else{
			//disable the button to prevent subsequent requests while waiting for a response
			this.refs.loginButton.getDOMNode().setAttribute("disabled", true);
			this.refs.registerButton.getDOMNode().setAttribute("disabled", true);
		}

	},

	//Click handlers
	handleLoginClick: function(e){
		this._toggleButtons(false);

		//ApiService returns a Promise
		var promise = this.props.apiService.login(this.state.username, this.state.password);

		//success
		promise.then(
			function(){
				this.props.loginSuccessHandler();
			}.bind(this),

			//failure
			function(){
				//set the failure message
				this.setState({
					error: "Failed to login"
				});
				
				//renable the buttons
				this._toggleButtons(true);

			}.bind(this));
	},

	handleRegisterClick: function(e){
		this._toggleButtons(false);

		this.props.apiService.register(this.state.username, this.state.password, function(success){
			if(!success){
				//set the failure message
				this.setState({
					error: "Failed to register"
				});
			}
			this._toggleButtons(true);
		}.bind(this));
	},

	handleChange: function(e){

		this.setState({
			username: this.refs.username.getDOMNode().value, 
			password: this.refs.password.getDOMNode().value
		});
	},

	//THE Render method
	render : function(){
		return (
			<div className="loginComponent">
				<h2>Login</h2>
				
				{this.state.error === null
					? '' 
					: <span className="error">{this.state.error}</span>
				}
				
				<input type="text" ref="username" value={this.state.username} onChange={this.handleChange} />
				<input type="password" ref="password" value={this.state.password} onChange={this.handleChange} />
				
				<button onClick={this.handleRegisterClick} ref="registerButton">Register</button>
				<button onClick={this.handleLoginClick} ref="loginButton">Login</button>
			</div>
		);
	}
});
