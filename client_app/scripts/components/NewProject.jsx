/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
	
	//propTypes
	propTypes: {
		saveCallback: React.PropTypes.func.isRequired
	},

	getInitialState: function(){
		return {
			name: '',
			url: ''
		};
	},

	handleChange: function(){
		this.setState({
			name: this.refs.name.getDOMNode().value, 
			url: this.refs.url.getDOMNode().value
		});
	},

	handleClick: function (e) {
		this.props.saveCallback(this.state.name, this.state.url);
	},

	render: function(){
		return (
			<div className="newProject">
				<h2>New Download</h2>
				<div>
					<label for="name">Name</label>
					<input onChange={this.handleChange} name="name" ref="name" value={this.name} />
				</div>
				<div>
					<label for="url">URL</label>
					<input onChange={this.handleChange} name="url" ref="url" value={this.url} />
				</div>
				<button onClick={this.handleClick}>Save</button>
			</div>
		);
	}
});