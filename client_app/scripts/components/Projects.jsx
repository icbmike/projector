/** @jsx React.DOM */

var React = require('react');

//Components
var Modal = require('./Modal.jsx');
var Newproject = require('./Newproject.jsx');
//Services
var ApiService = require('../services/apiService.js');


module.exports = React.createClass({
	
	//propTypes
	propTypes: {
		apiService: React.PropTypes.instanceOf(ApiService).isRequired
	},

	createNewproject: function(name, url){

	},

	handleAddClick: function(){

		var modal = (
			<Modal>
				<NewProject saveCallback={this.createNewProject} />
			</Modal>
		);

		//Render the modal over everything else so that it intercepts events
		React.renderComponent(
			modal,
			document.getElementById("modalAnchor")
		);
	},
	componentWillMount: function(){

	},

	getInitialState: function(){
		return {
			projects:[]
		};
	},

	render: function(){

		var projects = this.state.projects.map(function(project) {
			return (<project
						key={project.id}
						name={project.name} 
						url={project.url}
						/>
					);
		}.bind(this));

		return (
			<div className="projectsComponent">
				<h2>Current Projects</h2>
				<table className="projects">
					<tr>
						<th>Name</th>
						<th>URL</th>
					</tr>
					{projects}
				</table>
				
				<button className="newProjectButton" onClick={this.handleAddClick}><i className="fa fa-plus-circle"></i></button>
			</div>
		);
	}
});

