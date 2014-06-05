/** @jsx React.DOM */

var React = require('react');

var TabbedContainer = require('./TabbedContainer.jsx');

var Projects = require('./Projects.jsx');
var ScratchPad = require('./ScratchPad.jsx');
var Settings = require('./Settings.jsx');

//Services
var ApiService = require('../services/apiService.js');

module.exports = React.createClass({
	
	//propTypes
	propTypes: {
		apiService: React.PropTypes.instanceOf(ApiService).isRequired
	},

	render: function(){
		return(
			<div className="mainWindow">
				<h1>Projector</h1>
				<TabbedContainer orientation="vertical">
					<Projects apiService={this.props.apiService} tabTitle="Projects" />
					<ScratchPad apiService={this.props.apiService} tabTitle="Scratch Pad" />
					<Settings tabTitle="Settings"/>
				</TabbedContainer>
			</div>
		);
	}
});